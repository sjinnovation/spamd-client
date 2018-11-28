"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
describe('#Response.parse', () => {
    test('should parse headers and body separate', () => {
        const response = 'SPAMD/1.1 0 EX_OK\r\n' +
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
            'MIME-Version: 1.0Content-Type: multipart/mixed; boundary="----------=_58750736.8D9F70BC"';
        const result = __1.Response.parse(response);
        expect(result).toEqual({
            body: 'Received: from localhost by debian\n' +
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
        });
    });
    test('should throw error for invalid metadata', () => {
        const response = 'Spam: True ; 1000.0 / 5.0\r\n';
        try {
            __1.Response.parse(response);
            throw new Error('Should never call');
        }
        catch (e) {
            expect(e.message).toEqual('Cannot parse response metadata');
        }
    });
    test('should throw error for missing headers', () => {
        const response = 'SPAMD/1.1 0 EX_OK\r\n';
        try {
            __1.Response.parse(response);
            throw new Error('Should never call');
        }
        catch (e) {
            expect(e.message).toEqual('Headers not found');
        }
    });
    test('should throw error for invalid headers', () => {
        const response = 'SPAMD/1.1 0 EX_OK\r\n' + 'invalid_header =(';
        try {
            __1.Response.parse(response);
            throw new Error('Should never call');
        }
        catch (e) {
            expect(e.message).toEqual('Cannot parse response headers: invalid_header =(');
        }
    });
    test('should throw error for unknown header', () => {
        const response = 'SPAMD/1.1 0 EX_OK\r\n' + 'CUSTOM-HEADER: value';
        try {
            __1.Response.parse(response);
            throw new Error('Should never call');
        }
        catch (e) {
            expect(e.message).toEqual('Obtain wrong header "CUSTOM-HEADER"');
        }
    });
    test('should throw error for wrong spam header', () => {
        const response = 'SPAMD/1.1 0 EX_OK\r\n' + 'Spam: oops_spam';
        try {
            __1.Response.parse(response);
            throw new Error('Should never call');
        }
        catch (e) {
            expect(e.message).toEqual('Cannot parse Spam header "oops_spam"');
        }
    });
    test('should throw error for wrong did-set header', () => {
        const response = 'SPAMD/1.1 0 EX_OK\r\n' + 'DidSet: cloud';
        try {
            __1.Response.parse(response);
            throw new Error('Should never call');
        }
        catch (e) {
            expect(e.message).toEqual('Wrong value "cloud" for header "DidSet"');
        }
    });
    test('should throw error for wrong did-remove header', () => {
        const response = 'SPAMD/1.1 0 EX_OK\r\n' + 'DidRemove: remove';
        try {
            __1.Response.parse(response);
            throw new Error('Should never call');
        }
        catch (e) {
            expect(e.message).toEqual('Wrong value "remove" for header "DidRemove"');
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2Uuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9uZXR3b3JrL3NwZWNzL3Jlc3BvbnNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBOEI7QUFFOUIsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtJQUMvQixJQUFJLENBQUMsd0NBQXdDLEVBQUUsR0FBRyxFQUFFO1FBRWxELE1BQU0sUUFBUSxHQUNaLHVCQUF1QjtZQUN2QiwrQkFBK0I7WUFDL0Isc0JBQXNCO1lBQ3RCLDBCQUEwQjtZQUMxQix5QkFBeUI7WUFDekIsTUFBTTtZQUNOLHdDQUF3QztZQUN4Qyw0Q0FBNEM7WUFDNUMseUNBQXlDO1lBQ3pDLHVDQUF1QztZQUN2QywyQ0FBMkM7WUFDM0MsVUFBVTtZQUNWLHFDQUFxQztZQUNyQywyQ0FBMkM7WUFDM0MsOENBQThDO1lBQzlDLHVFQUF1RTtZQUN2RSxzQkFBc0I7WUFDdEIsc0VBQXNFO1lBQ3RFLDRFQUE0RTtZQUM1RSxpRUFBaUU7WUFDakUsMEZBQTBGLENBQUE7UUFHNUYsTUFBTSxNQUFNLEdBQUcsWUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUd2QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3JCLElBQUksRUFDRixzQ0FBc0M7Z0JBQ3RDLDBDQUEwQztnQkFDMUMsdUNBQXVDO2dCQUN2QyxxQ0FBcUM7Z0JBQ3JDLHlDQUF5QztnQkFDekMsTUFBTTtnQkFDTixtQ0FBbUM7Z0JBQ25DLHlDQUF5QztnQkFDekMsNENBQTRDO2dCQUM1QyxxRUFBcUU7Z0JBQ3JFLG9CQUFvQjtnQkFDcEIsb0VBQW9FO2dCQUNwRSwwRUFBMEU7Z0JBQzFFLCtEQUErRDtnQkFDL0QsMEZBQTBGO1lBQzVGLE9BQU8sRUFBRTtnQkFDUCxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElB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