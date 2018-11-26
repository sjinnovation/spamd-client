"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_helpers_1 = require("../request.helpers");
const types_1 = require("../../types");
describe('#withMethod', () => {
    test('should add new method property to request if missing', () => {
        const request = { body: 'hello' };
        const result = request_helpers_1.withMethod("HEADERS")(request);
        expect(result).toEqual({ method: "HEADERS", body: 'hello' });
    });
    test('should replace existed method property', () => {
        const request = {
            method: "PROCESS",
            body: 'hello',
        };
        const result = request_helpers_1.withMethod("SYMBOLS")(request);
        expect(result).toEqual({ method: "SYMBOLS", body: 'hello' });
    });
});
describe('#withHeader', () => {
    test('should add new header to empty array correct', () => {
        const request = { headers: [], body: 'hello' };
        const result = request_helpers_1.withHeader([types_1.Header.User, 'john@example.com'])(request);
        expect(result).toEqual({
            headers: [[types_1.Header.User, 'john@example.com']],
            body: 'hello',
        });
    });
    test('should add new header to non empty array correct', () => {
        const request = {
            headers: [[types_1.Header.Compress, 'zlib']],
            body: 'hello',
        };
        const result = request_helpers_1.withHeader([types_1.Header.User, 'john@example.com'])(request);
        expect(result).toEqual({
            headers: [
                [types_1.Header.Compress, 'zlib'],
                [types_1.Header.User, 'john@example.com'],
            ],
            body: 'hello',
        });
    });
});
describe('#withContentLength', () => {
    test('should add new header to empty array correct', () => {
        const request = { headers: [], body: 'hello' };
        const result = request_helpers_1.withContentLength(request);
        expect(result).toEqual({
            headers: [[types_1.Header.ContentLength, 5]],
            body: 'hello',
        });
    });
    test('should add new header to non empty array correct', () => {
        const request = {
            headers: [[types_1.Header.Compress, 'zlib']],
            body: 'hello',
        };
        const result = request_helpers_1.withContentLength(request);
        expect(result).toEqual({
            headers: [[types_1.Header.Compress, 'zlib'], [types_1.Header.ContentLength, 5]],
            body: 'hello',
        });
    });
    test("shouldn't modify request object when body is missing", () => {
        const request = {
            headers: [[types_1.Header.Compress, 'zlib']],
        };
        const result = request_helpers_1.withContentLength(request);
        expect(result).toEqual(request);
    });
});
describe('#withBody', () => {
    test('should add new body property to request if missing', () => {
        const request = { method: "HEADERS" };
        const result = request_helpers_1.withBody('hello')(request);
        expect(result).toEqual({ method: "HEADERS", body: 'hello' });
    });
    test('should replace existed body property', () => {
        const request = {
            method: "PROCESS",
            body: 'hello',
        };
        const result = request_helpers_1.withBody('world')(request);
        expect(result).toEqual({ method: "PROCESS", body: 'world' });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5oZWxwZXJzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGVscGVycy9zcGVjcy9yZXF1ZXN0LmhlbHBlcnMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdEQUsyQjtBQUMzQix1Q0FBc0Q7QUFFdEQsUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7SUFDM0IsSUFBSSxDQUFDLHNEQUFzRCxFQUFFLEdBQUcsRUFBRTtRQUVoRSxNQUFNLE9BQU8sR0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQWUsQ0FBQTtRQUdwRCxNQUFNLE1BQU0sR0FBRyw0QkFBVSxXQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBR2xELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLFdBQWdCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFDbkUsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsd0NBQXdDLEVBQUUsR0FBRyxFQUFFO1FBRWxELE1BQU0sT0FBTyxHQUFTO1lBQ3BCLE1BQU0sV0FBZ0I7WUFDdEIsSUFBSSxFQUFFLE9BQU87U0FDRCxDQUFBO1FBR2QsTUFBTSxNQUFNLEdBQUcsNEJBQVUsV0FBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUdsRCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxXQUFnQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQ25FLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUE7QUFFRixRQUFRLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtJQUMzQixJQUFJLENBQUMsOENBQThDLEVBQUUsR0FBRyxFQUFFO1FBRXhELE1BQU0sT0FBTyxHQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFlLENB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