import * as Network from 'net'
import { Connection } from '../connection'
import { EventEmitter } from 'events'
import { getMock } from 'test-helper'

afterEach(() => jest.clearAllMocks())

jest.mock('net', () => {
  const createConnection = jest.fn()
  const __MOCK__ = { createConnection }
  return { createConnection, __MOCK__ }
})

describe('#Connection.of', () => {
  test('should resolve promise with socket when connection established', (done) => {
    // given
    const eventBus = new EventEmitter()
    const connectionOpts = { host: 'test.example.com', port: 8888 }
    const connect = Connection.of(connectionOpts)

    // init mocks
    const createConnectionMock = getMock(Network, 'createConnection')
      .mockReturnValue(eventBus)

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

  test('should reject promise with socket connection error', (done) => {
    // given
    const eventBus = new EventEmitter()
    const connectionOpts = { host: 'test.example.com', port: 8888 }
    const connect = Connection.of(connectionOpts)

    // init mocks
    const createConnectionMock = getMock(Network, 'createConnection')
      .mockReturnValue(eventBus)

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
