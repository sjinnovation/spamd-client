"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network_1 = require("../network");
const builders_1 = require("../builders");
const parsers_1 = require("../parsers");
exports.symbols = (email) => network_1.Request.exec(builders_1.emailSpamCheckRequest("SYMBOLS", email), parsers_1.spamHeaderAndBodyResponse);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9scy5hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWN0aW9ucy9zeW1ib2xzLmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHdDQUFvQztBQUNwQywwQ0FBbUQ7QUFDbkQsd0NBQXNEO0FBUXpDLFFBQUEsT0FBTyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FDdkMsaUJBQU8sQ0FBQyxJQUFJLENBQ1YsZ0NBQXFCLFlBQWlCLEtBQUssQ0FBQyxFQUM1QyxtQ0FBeUIsQ0FDMUIsQ0FBQSJ9