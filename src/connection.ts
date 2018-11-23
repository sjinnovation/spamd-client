import { createConnection, Socket } from 'net'

export namespace Connection {
  type SpamdClientConfig = {
    host: string
    port: number
  }

  export const of = (options: SpamdClientConfig) => (): Promise<
    Socket
  > => {
    const conn = createConnection({
      host: options.host,
      port: options.port,
    })

    return new Promise((resolve, reject) => {
      conn.on('connect', () => {
        conn.removeListener('error', reject)
        return resolve(conn)
      })
      conn.on('error', reject)
    })
  }
}
