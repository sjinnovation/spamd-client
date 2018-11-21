import { createConnection, Socket } from 'net'

type SpamdClientConfig = {
  host: string
  port?: number
  compression?: boolean
  poolSize?: number
  keepAlive?: boolean
}

export class SpamdConnect {
  private _poolSize: number
  private _keepAliveEnabled: boolean
  private _connectionsPool = [] as Socket[]
  private _connectOpts: {
    host: string
    port: number
  }

  private constructor(options: SpamdClientConfig) {
    this._poolSize = options.poolSize || 1
    this._keepAliveEnabled = options.keepAlive || true
    this._connectOpts = { host: options.host, port: options.port || 8 }

    this._initPool()

    this._handleClosing()
  }

  private _initPool() {
    this._connectionsPool = [...Array(this._poolSize).keys()].map(_ =>
      createConnection(this._connectOpts)
    )
  }

  private _handleClosing() {
    this._connectionsPool.map((conn, i) => {
      conn.on('close', () => {
        if (this._keepAliveEnabled) {
          this._connectionsPool[i] = createConnection(this._connectOpts)
        } else {
          this._connectionsPool.splice(i, 1)
        }
      })
    })
  }

  public static of(options: SpamdClientConfig) {
    return new SpamdConnect(options)
  }

  public use(fn: <T>(connect: Socket) => Promise<T>) {
    const connIndex = Math.floor(
      Math.random() * Math.floor(this._poolSize)
    )
    const connection = this._connectionsPool.splice(connIndex, 1)[0]
    return fn(connection).then(result => {
      this._connectionsPool.push(connection)
      return result
    })
  }
}
