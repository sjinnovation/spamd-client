"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_helpers_1 = require("../helpers/common.helpers");
const request_helpers_1 = require("../helpers/request.helpers");
exports.emailSpamCheckRequest = (method, email) => common_helpers_1.pipe(request_helpers_1.withMethod(method), request_helpers_1.withBody(email), request_helpers_1.withContentLength);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhbS1jaGVjay1yZXF1ZXN0LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYnVpbGRlcnMvc3BhbS1jaGVjay1yZXF1ZXN0LmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4REFBZ0Q7QUFDaEQsZ0VBSW1DO0FBRXRCLFFBQUEscUJBQXFCLEdBQUcsQ0FDbkMsTUFBYyxFQUNkLEtBQWEsRUFDYixFQUFFLENBQUMscUJBQUksQ0FBQyw0QkFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLDBCQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsbUNBQWlCLENBQUMsQ0FBQSJ9