"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network_1 = require("../network");
const builders_1 = require("../builders");
const parsers_1 = require("../parsers");
exports.process = (email) => network_1.Request.exec(builders_1.emailSpamCheckRequest("REPORT", email), parsers_1.spamHeaderAndBodyResponse);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvcmVwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esd0NBQW9DO0FBQ3BDLDBDQUFtRDtBQUNuRCx3Q0FBc0Q7QUFRekMsUUFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUN2QyxpQkFBTyxDQUFDLElBQUksQ0FDVixnQ0FBcUIsV0FBZ0IsS0FBSyxDQUFDLEVBQzNDLG1DQUF5QixDQUMxQixDQUFBIn0=