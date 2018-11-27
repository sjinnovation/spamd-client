"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_helpers_1 = require("../response.helpers");
const types_1 = require("../../types");
describe('#checkError', () => {
    test('should pass response throw when status code EX_OK', () => {
        const response = {
            statusCode: types_1.StatusCode.EX_OK,
        };
        let result;
        try {
            result = response_helpers_1.checkError(response);
        }
        catch (e) {
            expect(e).toBeFalsy();
        }
        expect(result).toEqual({ statusCode: types_1.StatusCode.EX_OK });
    });
    test('should throw error when status code is not EX_OK', () => {
        const response = {
            statusCode: types_1.StatusCode.EX_OSFILE,
        };
        let result;
        try {
            result = response_helpers_1.checkError(response);
        }
        catch (e) {
            return expect(e.message).toEqual('EX_OSFILE: Critical operating system file missing');
        }
        throw new Error('Should newer call');
    });
});
describe('#getSpamHeader', () => {
    test('should return spam header, when array contains this one', () => {
        const response = {
            headers: [
                [
                    types_1.Header.Spam,
                    {
                        isSpam: true,
                        score: 5,
                        threshold: 5,
                    },
                ],
            ],
        };
        let result;
        try {
            result = response_helpers_1.getSpamHeader(response);
        }
        catch (e) {
            console.log(e);
            return expect(e).toBeFalsy();
        }
        expect(result).toEqual({
            isSpam: true,
            score: 5,
            threshold: 5,
        });
    });
    test('should throw error when spam header missing', () => {
        const response = { headers: [] };
        let result;
        try {
            result = response_helpers_1.getSpamHeader(response);
        }
        catch (e) {
            return expect(e.message).toEqual('Spam header not found in response');
        }
        throw new Error('Should newer call');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuaGVscGVycy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvc3BlY3MvcmVzcG9uc2UuaGVscGVycy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMERBSTRCO0FBQzVCLHVDQUtvQjtBQUVwQixRQUFRLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtJQUMzQixJQUFJLENBQUMsbURBQW1ELEVBQUUsR0FBRyxFQUFFO1FBRTdELE1BQU0sUUFBUSxHQUFTO1lBQ3JCLFVBQVUsRUFBRSxrQkFBVSxDQUFDLEtBQUs7U0FDWCxDQUFBO1FBQ25CLElBQUksTUFBTSxDQUFBO1FBR1YsSUFBSTtZQUNGLE1BQU0sR0FBRyw2QkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQzlCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUE7U0FDdEI7UUFHRCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLGtCQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUMxRCxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyxrREFBa0QsRUFBRSxHQUFHLEVBQUU7UUFFNUQsTUFBTSxRQUFRLEdBQVM7WUFDckIsVUFBVSxFQUFFLGtCQUFVLENBQUMsU0FBUztTQUNmLENBQUE7UUFDbkIsSUFBSSxNQUFNLENBQUE7UUFHVixJQUFJO1lBQ0YsTUFBTSxHQUFHLDZCQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDOUI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQzlCLG1EQUFtRCxDQUNwRCxDQUFBO1NBQ0Y7UUFHRCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDdEMsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQTtBQUVGLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7SUFDOUIsSUFBSSxDQUFDLHlEQUF5RCxFQUFFLEdBQUcsRUFBRTtRQUVuRSxNQUFNLFFBQVEsR0FBUztZQUNyQixPQUFPLEVBQUU7Z0JBQ1A7b0JBQ0UsY0FBTSxDQUFDLElBQUk7b0JBQ1g7d0JBQ0UsTUFBTSxFQUFFLElBQUk7d0JBQ1osS0FBSyxFQUFFLENBQUM7d0JBQ1IsU0FBUyxFQUFFLENBQUM7cUJBQ2I7aUJBQ0Y7YUFDRjtTQUNnQixDQUFBO1FBRW5CLElBQUksTUFBTSxDQUFBO1FBR1YsSUFBSTtZQUNGLE1BQU0sR0FBRyxnQ0FBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQ2pDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2QsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUE7U0FDN0I7UUFHRCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3JCLE1BQU0sRUFBRSxJQUFJO1lBQ1osS0FBSyxFQUFFLENBQUM7WUFDUixTQUFTLEVBQUUsQ0FBQztTQUNiLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxDQUFDLDZDQUE2QyxFQUFFLEdBQUcsRUFBRTtRQUV2RCxNQUFNLFFBQVEsR0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQW9CLENBQUE7UUFFeEQsSUFBSSxNQUFNLENBQUE7UUFHVixJQUFJO1lBQ0YsTUFBTSxHQUFHLGdDQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDakM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQzlCLG1DQUFtQyxDQUNwQyxDQUFBO1NBQ0Y7UUFHRCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDdEMsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSJ9