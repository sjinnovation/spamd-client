"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network_1 = require("../network");
const builders_1 = require("../builders");
const parsers_1 = require("../parsers");
exports.process = (email) => network_1.Request.exec(builders_1.emailSpamCheckRequest("REPORT_IFSPAM", email), parsers_1.spamHeaderAndBodyResponse);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0X2lmc3BhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL3JlcG9ydF9pZnNwYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3Q0FBb0M7QUFDcEMsMENBQW1EO0FBQ25ELHdDQUFzRDtBQVF6QyxRQUFBLE9BQU8sR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQ3ZDLGlCQUFPLENBQUMsSUFBSSxDQUNWLGdDQUFxQixrQkFBdUIsS0FBSyxDQUFDLEVBQ2xELG1DQUF5QixDQUMxQixDQUFBIn0=