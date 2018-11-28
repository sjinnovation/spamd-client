import { Response } from '../'

describe('#Response.parse', () => {
  test('should parse headers and body separate', () => {
    // given
    const response =
      'SPAMD/1.1 0 EX_OK\r\n' +
      'Spam: True ; 1000.0 / 5.0\r\n' +
      'DidRemove: local\r\n' +
      'DidSet: local,remote\r\n' +
      'Content-length: 654\r\n' +
      '\r\n' +
      'Received: from localhost by debian\r\n' +
      '    with SpamAssassin (version 3.4.0);\r\n' +
      '    Tue, 10 Jan 2017 11:09:26 -0500\r\n' +
      'From: Sender <sender@example.net>\r\n' +
      'To: Recipient <recipient@example.net>\r\n' +
      '\r\n\r\n' +
      'Subject: Test spam mail (GTUBE)\r\n' +
      'Date: Wed, 23 Jul 2003 23:30:00 +0200\r\n' +
      'Message-Id: <GTUBE1.1010101@example.net>\r\n' +
      'X-Spam-Checker-Version: SpamAssassin 3.4.0 (2014-02-07) on debian\r\n' +
      'X-Spam-Flag: YES\r\n' +
      'X-Spam-Level: **************************************************\r\n' +
      'X-Spam-Status: Yes, score=1000.0 required=5.0 tests=GTUBE,NO_RECEIVED,\r\n' +
      '    NO_RELAYS autolearn=no autolearn_force=no version=3.4.0\r\n' +
      'MIME-Version: 1.0Content-Type: multipart/mixed; boundary="----------=_58750736.8D9F70BC"'

    // when
    const result = Response.parse(response)

    // then
    expect(result).toEqual({
      body:
        'Received: from localhost by debian\n' +
        '    with SpamAssassin (version 3.4.0);\n' +
        '    Tue, 10 Jan 2017 11:09:26 -0500\n' +
        'From: Sender <sender@example.net>\n' +
        'To: Recipient <recipient@example.net>\n' +
        '\n\n' +
        'Subject: Test spam mail (GTUBE)\n' +
        'Date: Wed, 23 Jul 2003 23:30:00 +0200\n' +
        'Message-Id: <GTUBE1.1010101@example.net>\n' +
        'X-Spam-Checker-Version: SpamAssassin 3.4.0 (2014-02-07) on debian\n' +
        'X-Spam-Flag: YES\n' +
        'X-Spam-Level: **************************************************\n' +
        'X-Spam-Status: Yes, score=1000.0 required=5.0 tests=GTUBE,NO_RECEIVED,\n' +
        '    NO_RELAYS autolearn=no autolearn_force=no version=3.4.0\n' +
        'MIME-Version: 1.0Content-Type: multipart/mixed; boundary="----------=_58750736.8D9F70BC"',
      headers: [
        ['Spam', { isSpam: true, score: 1000, threshold: 5 }],
        ['DidRemove', 'local'],
        ['DidSet', 'local,remote'],
        ['Content-length', 654],
      ],
      message: 'EX_OK',
      protocol: 'SPAMD',
      statusCode: 0,
      version: '1.1',
    })
  })

  test('should throw error for invalid metadata', () => {
    // given
    const response = 'Spam: True ; 1000.0 / 5.0\r\n'

    // when
    try {
      Response.parse(response)
      throw new Error('Should never call')
    } catch (e) {
      // then
      expect(e.message).toEqual('Cannot parse response metadata')
    }
  })

  test('should throw error for missing headers', () => {
    // given
    const response = 'SPAMD/1.1 0 EX_OK\r\n'

    // when
    try {
      Response.parse(response)
      throw new Error('Should never call')
    } catch (e) {
      // then
      expect(e.message).toEqual('Headers not found')
    }
  })

  test('should throw error for invalid headers', () => {
    // given
    const response = 'SPAMD/1.1 0 EX_OK\r\n' + 'invalid_header =('

    // when
    try {
      Response.parse(response)
      throw new Error('Should never call')
    } catch (e) {
      // then
      expect(e.message).toEqual(
        'Cannot parse response headers: invalid_header =('
      )
    }
  })

  test('should throw error for unknown header', () => {
    // given
    const response = 'SPAMD/1.1 0 EX_OK\r\n' + 'CUSTOM-HEADER: value'

    // when
    try {
      Response.parse(response)
      throw new Error('Should never call')
    } catch (e) {
      // then
      expect(e.message).toEqual('Obtain wrong header "CUSTOM-HEADER"')
    }
  })

  test('should throw error for wrong spam header', () => {
    // given
    const response = 'SPAMD/1.1 0 EX_OK\r\n' + 'Spam: oops_spam'

    // when
    try {
      Response.parse(response)
      throw new Error('Should never call')
    } catch (e) {
      // then
      expect(e.message).toEqual(
        'Cannot parse Spam header "oops_spam"'
      )
    }
  })

  test('should throw error for wrong did-set header', () => {
    // given
    const response = 'SPAMD/1.1 0 EX_OK\r\n' + 'DidSet: cloud'

    // when
    try {
      Response.parse(response)
      throw new Error('Should never call')
    } catch (e) {
      // then
      expect(e.message).toEqual(
        'Wrong value "cloud" for header "DidSet"'
      )
    }
  })

  test('should throw error for wrong did-remove header', () => {
    // given
    const response = 'SPAMD/1.1 0 EX_OK\r\n' + 'DidRemove: remove'

    // when
    try {
      Response.parse(response)
      throw new Error('Should never call')
    } catch (e) {
      // then
      expect(e.message).toEqual(
        'Wrong value "remove" for header "DidRemove"'
      )
    }
  })
})
