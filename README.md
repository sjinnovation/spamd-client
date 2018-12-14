# SpamD Network Client
This library is NodeJS driver for Spamassassin spamd protocol built over TCP.
Allow check emails via Spamassassin from NodeJS.

## Implemented protocol methods
* [X] CHECK
* [X] HEADERS
* [X] PROCESS
* [X] REPORT
* [X] REPORT_IFSPAM
* [X] SYMBOLS
* [ ] TELL
* [ ] PING

## API Documentation
Api built for convenient usage in point-free style. Using native Promises.

## TOC
 [Connection](#connection)
  + [`Connection.of()`](#connectionof)

 [Actions](#actions)
  + [`Action.check()`](#actioncheck)
  + [`Action.headers()`](#actionheaders)
  + [`Action.process()`](#actionprocess)
  + [`Action.report()`](#actionreport)
  + [`Action.reportIfSpam()`](#actionreportifspam)
  + [`Action.symbols()`](#actionsymbols)

### Connection

#### `Connection.of`
#### `Function` Connection.**of**(options: *[SpamdClientOptions](#SpamdClientOptions)*): `() => Promise<Connection>`
Factory for creating connection by given schema.
 
**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [SpamdClientOptions](#SpamdClientOptions) |

#### SpamdClientOptions
```typescript
{
    host: string
    port: number
}
```

**Returns:** `() => Promise<Connection>`

**Example:**
```typescript
import { Connection, Action } from 'spamd-client'

const connect = Connection.of({ host: 'example.com', port: 2233 })

connect()
  .then(Action.check('<your_email_body>'))
  .then(console.log) // EX: { isSpam: true, score: -0.8, threshold: 5 }
  .then(console.error) // EX: Error: Cannot connect
```


### Actions

#### `Action.check`
#### `Function` Action.**check**(email: *`string`*): `(connection: Connection) => Promise<`[CheckResult](#CheckResult)`>`

Instruct SpamAssassin to process the included message.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| email | `string` |  An email based on the RFC 5322 standard. |

**Returns:** `(connection: Connection) => Promise<`[CheckResult](#CheckResult)`>`

#### CheckResult
```typescript
{
  isSpam: boolean
  score: number
  threshold: number
}
```
___


#### `Action.headers`
#### `Function` Action.**headers**(email: *`string`*): `(connection: Connection) => Promise<`[HeadersResult](#HeadersResult)`>`

Instruct SpamAssassin to process the included message.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| email | `string` |  An email based on the RFC 5322 standard. |

**Returns:** `(connection: Connection) => Promise<`[HeadersResult](#HeadersResult)`>`

#### HeadersResult
```typescript
{
  spamReport: {
    isSpam: boolean
    score: number
    threshold: number
  },
  body: string
}
```

*Example*
```typescript
{
  spamReport: {
    isSpam: true,
    score: -0.9,
    threshold: 5,
  },
  body: `
    Received: from localhost by debian
        with SpamAssassin (version 3.4.0);
        Tue, 10 Jan 2017 11:09:26 -0500
    From: Sender <sender@example.net>
    To: Recipient <recipient@example.net>
    Subject: Test spam mail (GTUBE)
    Date: Wed, 23 Jul 2003 23:30:00 +0200
    Message-Id: <GTUBE1.1010101@example.net>
    X-Spam-Checker-Version: SpamAssassin 3.4.0 (2014-02-07) on debian
    X-Spam-Flag: YES
    X-Spam-Level: **************************************************
    X-Spam-Status: Yes, score=1000.0 required=5.0 tests=GTUBE,NO_RECEIVED,
        NO_RELAYS autolearn=no autolearn_force=no version=3.4.0
    MIME-Version: 1.0Content-Type: multipart/mixed; boundary="----------=_58750736.8D9F70BC"
  `
}
```
___


#### `Action.process`
#### `Function` Action.**process**(email: *`string`*): `(connection: Connection) => Promise<`[ProcessResult](#ProcessResult)`>`

Instruct SpamAssassin to process the message and return the modified message.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| email | `string` |  An email based on the RFC 5322 standard. |

**Returns:** `(connection: Connection) => Promise<`[ProcessReport](#ProcessResult)`>`

#### ProcessResult
```typescript
{
  spamReport: {
    isSpam: boolean
    score: number
    threshold: number
  },
  body: string
}
```

*Example*
```typescript
{
  spamReport: {
    isSpam: true,
    score: -0.9,
    threshold: 5,
  },
  body: `
    Received: from localhost by debian
    with SpamAssassin (version 3.4.0);
    Tue, 10 Jan 2017 10:57:02 -0500
    From: Sender <sender@example.net>
    To: Recipient <recipient@example.net>
    Subject: Test spam mail (GTUBE)
    Date: Wed, 23 Jul 2003 23:30:00 +0200
    Message-Id: <GTUBE1.1010101@example.net>
    X-Spam-Checker-Version: SpamAssassin 3.4.0 (2014-02-07) on debian
    X-Spam-Flag: YES
    X-Spam-Level: **************************************************
    X-Spam-Status: Yes, score=1000.0 required=5.0 tests=GTUBE,NO_RECEIVED,
        NO_RELAYS autolearn=no autolearn_force=no version=3.4.0
    MIME-Version: 1.0
    Content-Type: multipart/mixed; boundary="----------=_5875044E.D4EFFFD7"

    This is a multi-part message in MIME format.

    ------------=_5875044E.D4EFFFD7
    Content-Type: text/plain; charset=iso-8859-1
    Content-Disposition: inline
    Content-Transfer-Encoding: 8bit

    Spam detection software, running on the system "debian",
    has identified this incoming email as possible spam.  The original
    message has been attached to this so you can view it or label
    similar future email.  If you have any questions, see
    @@CONTACT_ADDRESS@@ for details.

    Content preview:  This is the GTUBE, the Generic Test for Unsolicited Bulk Email
    If your spam filter supports it, the GTUBE provides a test by which you can
    verify that the filter is installed correctly and is detecting incoming spam.
    You can send yourself a test mail containing the following string of characters
    (in upper case and with no white spaces and line breaks): [...]

    Content analysis details:   (1000.0 points, 5.0 required)

    pts rule name              description
    ---- ---------------------- --------------------------------------------------
    1000 GTUBE                  BODY: Generic Test for Unsolicited Bulk Email
    -0.0 NO_RELAYS              Informational: message was not relayed via SMTP
    -0.0 NO_RECEIVED            Informational: message has no Received headers



    ------------=_5875044E.D4EFFFD7
    Content-Type: message/rfc822; x-spam-type=original
    Content-Description: original message before SpamAssassin
    Content-Disposition: inline
    Content-Transfer-Encoding: 8bit

    Subject: Test spam mail (GTUBE)
    Message-ID: <GTUBE1.1010101@example.net>
    Date: Wed, 23 Jul 2003 23:30:00 +0200
    From: Sender <sender@example.net>
    To: Recipient <recipient@example.net>
    Precedence: junk
    MIME-Version: 1.0
    Content-Type: text/plain; charset=us-ascii
    Content-Transfer-Encoding: 7bit

    This is the GTUBE, the
        Generic
        Test for
        Unsolicited
        Bulk
        Email

    If your spam filter supports it, the GTUBE provides a test by which you
    can verify that the filter is installed correctly and is detecting incoming
    spam. You can send yourself a test mail containing the following string of
    characters (in upper case and with no white spaces and line breaks):

    XJS*C4JDBQADN1.NSBN3*2IDNEN*GTUBE-STANDARD-ANTI-UBE-TEST-EMAIL*C.34X

    You should send this test mail from an account outside of your network.


    ------------=_5875044E.D4EFFFD7--
  `
}
```
___


#### Action.report
#### `Function` Action.**report**(email: *`string`*): `(connection: Connection) => Promise<`[ReportResult](#ReportResult)`>`

Send a request to process a message and return a report.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| email | `string` |  An email based on the RFC 5322 standard. |

**Returns:** `(connection: Connection) => Promise<`[ReportResult](#ReportResult)`>`

#### ReportResult
```typescript
{
  spamReport: {
    isSpam: boolean
    score: number
    threshold: number
  },
  body: string
}
```

*Example*
```typescript
{
  spamReport: {
    isSpam: true,
    score: -0.9,
    threshold: 5,
  },
  body: `
    Spam detection software, running on the system "debian",
    has identified this incoming email as possible spam.  The original
    message has been attached to this so you can view it or label
    similar future email.  If you have any questions, see
    @@CONTACT_ADDRESS@@ for details.

    Content preview:  This is the GTUBE, the Generic Test for Unsolicited Bulk Email
      If your spam filter supports it, the GTUBE provides a test by which you can
      verify that the filter is installed correctly and is detecting incoming spam.
      You can send yourself a test mail containing the following string of characters
      (in upper case and with no white spaces and line breaks): [...]

    Content analysis details:   (1000.0 points, 5.0 required)

    pts rule name              description
    ---- ---------------------- --------------------------------------------------
    1000 GTUBE                  BODY: Generic Test for Unsolicited Bulk Email
    -0.0 NO_RELAYS              Informational: message was not relayed via SMTP
    -0.0 NO_RECEIVED            Informational: message has no Received headers
  `
}
```
___


#### Action.reportIfSpam
#### `Function` Action.**reportIfSpam**(email: *`string`*): `(connection: Connection) => Promise<`[ReportIfSpamResult](#ReportIfSpamResult)`>`

Send a request to process a message and return a report only if spam detected.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| email | `string` |  An email based on the RFC 5322 standard. |

**Returns:** `(connection: Connection) => Promise<`[ReportIfSpamResult](#ReportIfSpamResult)`>`

#### ReportIfSpamResult
```typescript
{
  spamReport: {
    isSpam: boolean
    score: number
    threshold: number
  },
  body: string
}
```

*Example*

Produce the same that `report` action described above.
___


#### Action.symbols
#### `Function` Action.**symbols**(email: *`string`*): `(connection: Connection) => Promise<`[SymbolsResult](#SymbolsResult)`>`

Send a request to process a message and return a report.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| email | `string` |  An email based on the RFC 5322 standard. |

**Returns:** `(connection: Connection) => Promise<`[SymbolsResult](#SymbolsResult)`>`

#### SymbolsResult
```typescript
{
  spamReport: {
    isSpam: boolean
    score: number
    threshold: number
  },
  body: string
}
```

*Example*
```typescript
{
  spamReport: {
    isSpam: true,
    score: -0.9,
    threshold: 5,
  },
  body: `
    GTUBE,NO_RECEIVED,NO_RELAYS
  `
}
```


 
## License
 
The MIT License (MIT)

Copyright (c) 2018

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

