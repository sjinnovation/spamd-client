"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network_1 = require("../network");
const builders_1 = require("../builders");
const parsers_1 = require("../parsers");
exports.report = (email) => network_1.Request.exec(builders_1.emailSpamCheckRequest("REPORT", email), parsers_1.spamHeaderAndBodyResponse);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL3JlcG9ydC5hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3Q0FBb0M7QUFDcEMsMENBQW1EO0FBQ25ELHdDQUFzRDtBQVF6QyxRQUFBLE1BQU0sR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQ3RDLGlCQUFPLENBQUMsSUFBSSxDQUNWLGdDQUFxQixXQUFnQixLQUFLLENBQUMsRUFDM0MsbUNBQXlCLENBQzFCLENBQUEifQ==