import { splitListByElement } from '../helpers'
import { Header, ParserResultT, StatusCode } from '../types'

const tokenize = (source: string) => {
  const [status, ...headersAndBody] = source.split('\r\n')
  const metadata = status.match(/([A-Z_]+)|([0-9\.\-]{1,3})/g)

  if (!metadata) {
    throw new Error('Cannot parse response metadata')
  }

  const [protocol, version, statusCode, message] = [...metadata]

  const [rawHeaders, bodyList] = splitListByElement('', headersAndBody)
  const headers= rawHeaders.map(header => {
    const parsedHeader = /([A-z\-]+)\s*:\s*(.*)/.exec(header)

    if (!parsedHeader) {
      throw new Error('Cannot parse response headers')
    }

    const [_, name, value] = [...parsedHeader]

    return [name, value] as [string, string]
  })

  return {
    protocol,
    version,
    statusCode,
    message,
    headers,
    body: bodyList[0],
  }
}

export const parse = (source: string): ParserResultT => {
  const tokens = tokenize(source)

  const fixedTypeHeaders = tokens.headers.map(([name, value]) => {
    switch (name) {
      case Header.Spam: {
        const parsedSpamHeader = /(True|False)\s*;\s*([0-9.\-]+)\s*\/\s*([0-9.]+)\s*/.exec(
          value,
        )

        if (!parsedSpamHeader) {
          throw new Error(`Cannot parse Spam header "${value}"`)
        }

        const [_, isSpam, score, threshold] = parsedSpamHeader

        return [
          name,
          {
            isSpam: isSpam === 'True',
            score: Number(score),
            threshold: Number(threshold),
          },
        ]
      }

      case Header.ContentLength: {
        return [name, Number(value)]
      }

      case Header.DidSet:
      case Header.DidRemove: {
        if (['local', 'remote', 'local,remote', 'remote,local'].indexOf(value) === -1) {
          throw new Error(`Wrong value "${value}" for header "${name}"`)
        }
        return <any>[name, value]
      }

      default:
        throw new Error(`Obtain wrong header "${name}"`)
    }
  })

  return {
    ...tokens,
    statusCode: Number(tokens.statusCode) as StatusCode,
    headers: fixedTypeHeaders
  }
}
