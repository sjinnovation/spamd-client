"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network_1 = require("../network");
const builders_1 = require("../builders");
const parsers_1 = require("../parsers");
exports.process = (email) => network_1.Request.exec(builders_1.emailSpamCheckRequest("SYMBOLS", email), parsers_1.spamHeaderAndBodyResponse);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9scy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL3N5bWJvbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3Q0FBb0M7QUFDcEMsMENBQW1EO0FBQ25ELHdDQUFzRDtBQVF6QyxRQUFBLE9BQU8sR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQ3ZDLGlCQUFPLENBQUMsSUFBSSxDQUNWLGdDQUFxQixZQUFpQixLQUFLLENBQUMsRUFDNUMsbUNBQXlCLENBQzFCLENBQUEifQ==