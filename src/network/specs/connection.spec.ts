import * as Network from 'net'
import { Connection } from '../'
import { EventEmitter } from 'events'

afterEach(() => jest.clearAllMocks())

jest.mock('net', () => ({
  createConnection: jest.fn(),
}))

describe('#Connection.of', () => {
  test('should resolve promise with socket when connection established', done => {
    // given
    const eventBus = new EventEmitter()
    const connectionOpts = { host: 'test.example.com', port: 8888 }
    const connect = Connection.of(connectionOpts)

    // init mocks
    const createConnectionMock = (Network.createConnection as any).mockReturnValue(
      eventBus
    )

    // when
    connect()
      .then(socket => {
        expect(createConnectionMock).toBeCalledWith(connectionOpts)
        expect(socket).toBe(eventBus)
        done()
      })
      .catch(err => {
        expect(err).toBeFalsy()
        done(new Error('Should never call'))
      })

    // side effects
    eventBus.emit('connect')
  })

  test('should reject promise with socket connection error', done => {
    // given
    const eventBus = new EventEmitter()
    const connectionOpts = { host: 'test.example.com', port: 8888 }
    const connect = Connection.of(connectionOpts)

    // init mocks
    const createConnectionMock = (Network.createConnection as any).mockReturnValue(
      eventBus
    )

    // when
    connect()
      .then(socket => {
        done(new Error('Should never call'))
      })
      .catch(err => {
        expect(err.message).toEqual('#1_Connection_error')
        done()
      })

    // side effects
    eventBus.emit('error', new Error('#1_Connection_error'))
  })
})
