import { createConnection, Socket } from 'net'

export type SpamdClientOptionsT = {
  host: string
  port: number
}

export const Connection = {
  of: (options: SpamdClientOptionsT) => (): Promise<Socket> => {
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
