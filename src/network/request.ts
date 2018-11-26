import { Socket } from 'net'
import { HeaderRecordT, RequestT, Method } from '../types'

export const exec = <RES_T>(
  requestBuilder: (req: RequestT) => RequestT,
  responseParser: (response: string) => RES_T
) => (connection: Socket): Promise<RES_T> => {
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

    const builtRequest = requestBuilder({
      method: (<any>'') as Method,
      headers: [] as HeaderRecordT[],
    })

    connection.write(`${builtRequest.method} SPAMC/1.5\r\n`)

    builtRequest.headers.forEach(header => {
      if (!header) {
        return
      }

      const [name, value] = header

      connection.write(`${name}: ${value}\r\n`)
    })

    connection.write('\r\n' + builtRequest.body)
  })
}
