"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network_1 = require("../network");
const builders_1 = require("../builders");
const parsers_1 = require("../parsers");
exports.check = (email) => network_1.Request.exec(builders_1.emailSpamCheckRequest("CHECK", email), parsers_1.spamHeaderResponse);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2suYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvY2hlY2suYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esd0NBQW9DO0FBQ3BDLDBDQUFtRDtBQUNuRCx3Q0FBK0M7QUFRbEMsUUFBQSxLQUFLLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUNyQyxpQkFBTyxDQUFDLElBQUksQ0FDVixnQ0FBcUIsVUFBZSxLQUFLLENBQUMsRUFDMUMsNEJBQWtCLENBQ25CLENBQUEifQ==