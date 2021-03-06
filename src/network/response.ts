import { Header, ParserResultT, StatusCode } from '../types'

const takeUntilDelimiter = (
  delimiter: string,
  source: string
): [string, string | undefined] => {
  const position = source.indexOf(delimiter) + 1
  return position
    ? [
        source.substr(0, position),
        source.substr(position + delimiter.length - 1),
      ]
    : [source, undefined]
}

const tokenize = (source: string) => {
  const [status, headersAndBody] = takeUntilDelimiter('\r\n', source)

  const metadata = /(SPAMD)\/([0-9\.\-]+)\s+([0-9]{1,2})\s+([A-Z_]+).*/.exec(
    status
  )

  if (!metadata) {
    throw new Error('Cannot parse response metadata')
  }

  if (!headersAndBody) {
    throw new Error('Headers not found')
  }

  const [_, protocol, version, statusCode, message] = [...metadata]

  const [rawHeaders, body] = takeUntilDelimiter(
    '\r\n\r\n',
    headersAndBody
  )

  const headers = rawHeaders.split('\r\n').map(header => {
    const parsedHeader = /([A-z\-]+)\s*:\s*(.*)/.exec(header)

    if (!parsedHeader) {
      throw new Error(`Cannot parse response headers: ${header}`)
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
    body: body && body.replace(/\r\n/g, '\n'),
  }
}

export const parse = (source: string): ParserResultT => {
  const tokens = tokenize(source)

  const fixedTypeHeaders = tokens.headers.map(([name, value]) => {
    switch (name) {
      case Header.Spam: {
        const parsedSpamHeader = /(True|False)\s*;\s*([0-9.\-]+)\s*\/\s*([0-9.]+)\s*/.exec(
          value
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
        if (
          ['local', 'remote', 'local,remote', 'remote,local'].indexOf(
            value
          ) === -1
        ) {
          throw new Error(
            `Wrong value "${value}" for header "${name}"`
          )
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
    headers: fixedTypeHeaders,
  }
}
