import { createConnection, Socket } from 'net'

export type SpamdClientOptions = {
  host: string
  port: number
}

export const Connection = {
  of: (options: SpamdClientOptions) => (): Promise<Socket> => {
    const conn = createConnection(options)

    return new Promise((resolve, reject) => {
      conn.on('connect', () => {
        conn.removeListener('error', reject)
        return resolve(conn)
      })
      conn.on('error', reject)
    })
  },
}
