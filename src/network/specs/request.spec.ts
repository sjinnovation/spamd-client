import * as Request from '../request'
import { Method, Header } from '../../types'
import { Socket } from 'net'
import { EventEmitter } from 'events'

describe('#Request.exec', () => {
  test('should format request text correct', done => {
    // given
    const stream = new class extends EventEmitter {
      inspectedBuffer = ''
      write(data: string) {
        this.inspectedBuffer += data
      }
    }()

    const identity = <T>(a: T) => a
    const requestBuilder = jest.fn().mockReturnValue({
      method: Method.HEADERS,
      headers: [[Header.ContentLength, 20]],
      body: 'hey its test body :)',
    })

    // when
    Request.exec(requestBuilder, identity)((<any>stream) as Socket)
      .then(() => {
        expect(stream.inspectedBuffer).toEqual(
          'HEADERS SPAMC/1.5\r\n' +
            'Content-length: 20\r\n' +
            '\r\n' +
            'hey its test body :)'
        )
        done()
      })
      .catch(done)

    // side effects
    stream.emit('end')
  })

  test('should pass concatenated response to parser', done => {
    // given
    const stream = new class extends EventEmitter {
      write() {}
    }()
    const identity = <T>(a: T) => a
    const requestBuilder = identity
    const responseParser = jest.fn(identity)

    // when
    Request.exec(requestBuilder, responseParser)(
      (<any>stream) as Socket
    )
      .then(response => {
        expect(response).toEqual('the data was split to chunks')
        expect(responseParser).toBeCalledWith(response)

        done()
      })
      .catch(done)

    // side effects
    stream.emit('data', 'the data ')
    stream.emit('data', 'was split ')
    stream.emit('data', 'to chunks')
    stream.emit('end')
  })

  test('should remove listeners when end emitted', done => {
    // given
    const removeListener = jest.fn()
    const removeAllListeners = jest.fn()
    const stream = new class extends EventEmitter {
      write() {}
      removeAllListeners(...args: any[]) {
        removeAllListeners(...args)
        return this
      }

      removeListener(...args: any[]) {
        removeListener(...[args[0]])
        return this
      }
    }()
    const identity = <T>(a: T) => a

    // when
    Request.exec(identity, identity)((<any>stream) as Socket)
      .then(response => {
        expect(response).toEqual('')
        expect(removeAllListeners).toBeCalledWith('data')
        expect(removeAllListeners).toBeCalledWith('end')
        expect(removeListener).toBeCalledWith('error')
        done()
      })
      .catch(done)

    // side effects
    stream.emit('end')
  })

  test('should reject when parse error', done => {
    // given
    const stream = new class extends EventEmitter {
      write() {}
    }()
    const identity = <T>(a: T) => a
    const requestBuilder = identity
    const responseParser = jest.fn(() => {
      throw new Error('#Parse_Error')
    })

    // when
    Request.exec(requestBuilder, responseParser)(
      (<any>stream) as Socket
    )
      .then(() => {
        done(new Error('Should never call'))
        return null
      })
      .catch(err => {
        expect(err.message).toEqual('#Parse_Error')
        done()
      })

    // side effects
    stream.emit('end')
  })

  test('should reject when stream error', done => {
    // given
    const stream = new class extends EventEmitter {
      write() {}
    }()
    const identity = <T>(a: T) => a

    // when
    Request.exec(identity, identity)((<any>stream) as Socket)
      .then(() => {
        done(new Error('Should never call'))
        return null
      })
      .catch(err => {
        expect(err.message).toEqual('#Stream_Error')
        done()
      })

    // side effects
    stream.emit('error', new Error('#Stream_Error'))
  })
})
