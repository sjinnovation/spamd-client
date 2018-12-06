"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network_1 = require("../network");
const builders_1 = require("../builders");
const parsers_1 = require("../parsers");
const common_helpers_1 = require("../helpers/common.helpers");
exports.symbols = (email) => network_1.Request.exec(builders_1.emailSpamCheckRequest("SYMBOLS", email), common_helpers_1.pipe(parsers_1.spamHeaderAndBodyResponse, symbolsResponse => (Object.assign({}, symbolsResponse, { body: symbolsResponse.body.split(',') }))));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9scy5hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWN0aW9ucy9zeW1ib2xzLmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHdDQUFvQztBQUNwQywwQ0FBbUQ7QUFDbkQsd0NBQXNEO0FBQ3RELDhEQUFnRDtBQVFuQyxRQUFBLE9BQU8sR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQ3ZDLGlCQUFPLENBQUMsSUFBSSxDQUNWLGdDQUFxQixZQUFpQixLQUFLLENBQUMsRUFDNUMscUJBQUksQ0FBQyxtQ0FBeUIsRUFBRSxlQUFlLENBQUMsRUFBRSxDQUFDLG1CQUM5QyxlQUFlLElBQ2xCLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFDckMsQ0FBQyxDQUNKLENBQUEifQ==