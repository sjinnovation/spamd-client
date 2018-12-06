import {
  withMethod,
  withHeader,
  withContentLength,
  withBody,
} from '../request.helpers'
import { RequestT, Method, Header } from '../../types'

describe('#withMethod', () => {
  test('should add new method property to request if missing', () => {
    // given
    const request = (<any>{ body: 'hello' }) as RequestT

    // when
    const result = withMethod(Method.HEADERS)(request)

    // then
    expect(result).toEqual({ method: Method.HEADERS, body: 'hello' })
  })

  test('should replace existed method property', () => {
    // given
    const request = (<any>{
      method: Method.PROCESS,
      body: 'hello',
    }) as RequestT

    // when
    const result = withMethod(Method.SYMBOLS)(request)

    // then
    expect(result).toEqual({ method: Method.SYMBOLS, body: 'hello' })
  })
})

describe('#withHeader', () => {
  test('should add new header to empty array correct', () => {
    // given
    const request = (<any>{ headers: [], body: 'hello' }) as RequestT

    // when
    const result = withHeader([Header.User, 'john@example.com'])(
      request
    )

    // then
    expect(result).toEqual({
      headers: [[Header.User, 'john@example.com']],
      body: 'hello',
    })
  })

  test('should add new header to non empty array correct', () => {
    // given
    const request = (<any>{
      headers: [[Header.Compress, 'zlib']],
      body: 'hello',
    }) as RequestT

    // when
    const result = withHeader([Header.User, 'john@example.com'])(
      request
    )

    // then
    expect(result).toEqual({
      headers: [
        [Header.Compress, 'zlib'],
        [Header.User, 'john@example.com'],
      ],
      body: 'hello',
    })
  })
})

describe('#withContentLength', () => {
  test('should add new header to empty array correct', () => {
    // given
    const request = (<any>{ headers: [], body: 'hello' }) as RequestT

    // when
    const result = withContentLength(request)

    // then
    expect(result).toEqual({
      headers: [[Header.ContentLength, 5]],
      body: 'hello',
    })
  })

  test('should add new header to non empty array correct', () => {
    // given
    const request = (<any>{
      headers: [[Header.Compress, 'zlib']],
      body: 'hello',
    }) as RequestT

    // when
    const result = withContentLength(request)

    // then
    expect(result).toEqual({
      headers: [[Header.Compress, 'zlib'], [Header.ContentLength, 5]],
      body: 'hello',
    })
  })

  test("shouldn't modify request object when body is missing", () => {
    // given
    const request = (<any>{
      headers: [[Header.Compress, 'zlib']],
    }) as RequestT

    // when
    const result = withContentLength(request)

    // then
    expect(result).toEqual(request)
  })
})

describe('#withBody', () => {
  test('should add new body property to request if missing', () => {
    // given
    const request = (<any>{ method: Method.HEADERS }) as RequestT

    // when
    const result = withBody('hello')(request)

    // then
    expect(result).toEqual({
      method: Method.HEADERS,
      body: 'hello\r\n',
    })
  })

  test('should replace existed body property', () => {
    // given
    const request = (<any>{
      method: Method.PROCESS,
      body: 'hello',
    }) as RequestT

    // when
    const result = withBody('world')(request)

    // then
    expect(result).toEqual({
      method: Method.PROCESS,
      body: 'world\r\n',
    })
  })
})
