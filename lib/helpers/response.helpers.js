"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
exports.checkError = (result) => {
    if (result.statusCode !== types_1.StatusCode.EX_OK) {
        throw new Error(`${types_1.StatusCode[result.statusCode]}: ${types_1.ErrorMessage[result.statusCode]}`);
    }
    return result;
};
exports.getSpamHeader = (result) => {
    const report = result.headers.find(([name]) => name === types_1.Header.Spam);
    if (!report) {
        throw new Error('Spam header not found in response');
    }
    const [_, spamReport] = report;
    return spamReport;
};
exports.getBody = (result) => result.body || '';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3Jlc3BvbnNlLmhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FLaUI7QUFFSixRQUFBLFVBQVUsR0FBRyxDQUFDLE1BQXFCLEVBQUUsRUFBRTtJQUNsRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssa0JBQVUsQ0FBQyxLQUFLLEVBQUU7UUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FDYixHQUFHLGtCQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUM5QixvQkFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQ2hDLEVBQUUsQ0FDSCxDQUFBO0tBQ0Y7SUFDRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQUVZLFFBQUEsYUFBYSxHQUFHLENBQUMsTUFBcUIsRUFBRSxFQUFFO0lBQ3JELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLGNBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwRSxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFBO0tBQ3JEO0lBRUQsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUE7SUFDOUIsT0FBYSxVQUlaLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFWSxRQUFBLE9BQU8sR0FBRyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFBIn0=