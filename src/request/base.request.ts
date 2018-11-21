import { Socket } from 'net'
import { Header } from '../header'

export enum StatusCode {
  EX_OK = 0,
  EX_USAGE = 64,
  EX_DATAERR = 65,
  EX_NOINPUT = 66,
  EX_NOUSER = 67,
  EX_NOHOST = 68,
  EX_UNAVAILABLE = 69,
  EX_SOFTWARE = 70,
  EX_OSERR = 71,
  EX_OSFILE = 72,
  EX_CANTCREAT = 73,
  EX_IOERR = 74,
  EX_TEMPFAIL = 75,
  EX_PROTOCOL = 76,
  EX_NOPERM = 77,
  EX_CONFIG = 78,
  EX_TIMEOUT = 79,
}

export const enum Method {
  CHECK = 'CHECK',
  HEADERS = 'HEADERS',
  PING = 'PING',
  PROCESS = 'PROCESS',
  REPORT = 'REPORT',
  REPORT_IFSPAM = 'REPORT_IFSPAM',
  SKIP = 'SKIP',
  SYMBOLS = 'SYMBOLS',
  TELL = 'TELL',
}

export type RequestToBuildT = RequestT<Method, Header.RequestHeaderT[], string>

export type RequestT<M, H, B> = {
  method: M
  headers: H
  body: B
}

export type ResponseT<H, B> = {
  headers: H
  body: B
  status: StatusCode
}

export type SpamCheckRequestHeadersT =
  | [Header.ContentLength]
  | [Header.User, Header.ContentLength]
  | [Header.Compress, Header.ContentLength]
  | [Header.Compress, Header.User, Header.ContentLength]

export type SpamCheckRequestT<M> = RequestT<
  M,
  SpamCheckRequestHeadersT,
  string
>
export type SpamCheckResponseT = ResponseT<
  [Header.Spam, Header.ContentLength],
  string
>

export const makeRequest = <RES_T>(
  requestBuilder: (req: RequestToBuildT) => RequestToBuildT,
  responseParser: (response: string) => RES_T
) => (req: RequestToBuildT) => (connection: Socket): Promise<RES_T> => {
  return new Promise((resolve, reject) => {
    let response = ''
    connection.on('data', responseChunk => {
      response += responseChunk.toString()
    })

    connection.on('end', () => {
      // !!DANGER!!: connection is mutable and reusing for different requests be attentive and careful
      // remove listeners to avoid memory leak
      connection
        .removeAllListeners('data') // should have one 'data' listener simultaneously (for one request)
        .removeAllListeners('end') // should have one 'end' listener simultaneously (for one request)
        .removeListener('error', reject) // we can have multiple error listeners, so remove only own listener

      try {
        return resolve(responseParser(response))
      } catch (e) {
        return reject(e)
      }
    })

    connection.on('error', reject)

    const builtRequest = requestBuilder(req)

    connection.write(`${builtRequest.method} SPAMC/1.5\r\n`)

    builtRequest.headers.forEach(([name, value]) =>
      connection.write(`${name}: ${value}\r\n`)
    )

    connection.write('\n\r' + builtRequest.body)
  })
}
