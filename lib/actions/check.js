"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network_1 = require("../network");
const builders_1 = require("../builders");
const parsers_1 = require("../parsers");
exports.check = (email) => network_1.Request.exec(builders_1.emailSpamCheckRequest("CHECK", email), parsers_1.spamHeaderResponse);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWN0aW9ucy9jaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHdDQUFvQztBQUNwQywwQ0FBbUQ7QUFDbkQsd0NBQStDO0FBUWxDLFFBQUEsS0FBSyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FDckMsaUJBQU8sQ0FBQyxJQUFJLENBQ1YsZ0NBQXFCLFVBQWUsS0FBSyxDQUFDLEVBQzFDLDRCQUFrQixDQUNuQixDQUFBIn0=