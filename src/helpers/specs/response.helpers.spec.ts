import {
  checkError,
  getSpamHeader,
  getBody,
} from '../response.helpers'

import {
  ParserResultT,
  StatusCode,
  Header,
} from '../../types'

describe('#checkError', () => {
  test('should pass response throw when status code EX_OK', () => {
    // given
    const response = (<any>{
      statusCode: StatusCode.EX_OK,
    }) as ParserResultT
    let result

    // when
    try {
      result = checkError(response)
    } catch (e) {
      expect(e).toBeFalsy()
    }

    // then
    expect(result).toEqual({ statusCode: StatusCode.EX_OK })
  })

  test('should throw error when status code is not EX_OK', () => {
    // given
    const response = (<any>{
      statusCode: StatusCode.EX_OSFILE,
    }) as ParserResultT
    let result

    // when
    try {
      result = checkError(response)
    } catch (e) {
      return expect(e.message).toEqual(
        'EX_OSFILE: Critical operating system file missing'
      )
    }

    // then
    throw new Error('Should newer call')
  })
})

describe('#getSpamHeader', () => {
  test('should return spam header, when array contains this one', () => {
    // given
    const response = (<any>{
      headers: [
        [
          Header.Spam,
          {
            isSpam: true,
            score: 5,
            threshold: 5,
          },
        ],
      ],
    }) as ParserResultT

    let result

    // when
    try {
      result = getSpamHeader(response)
    } catch (e) {
      console.log(e)
      return expect(e).toBeFalsy()
    }

    // then
    expect(result).toEqual({
      isSpam: true,
      score: 5,
      threshold: 5,
    })
  })

  test('should throw error when spam header missing', () => {
    // given
    const response = (<any>{ headers: [] }) as ParserResultT

    let result

    // when
    try {
      result = getSpamHeader(response)
    } catch (e) {
      return expect(e.message).toEqual(
        'Spam header not found in response'
      )
    }

    // then
    throw new Error('Should newer call')
  })
})

describe('#getBody', () => {
  test('should return body content if exist', () => {
    // given
    const response = (<any>{
      body: 'hey I am your body',
    }) as ParserResultT

    // when
    const result = getBody(response)

    // then
    expect(result).toEqual('hey I am your body')
  })

  test('should return empty string if missing', () => {
    // given
    const response = (<any>{}) as ParserResultT

    const result = getBody(response)

    // then
    expect(result).toEqual('')
  })
})
