"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network_1 = require("../network");
const common_helpers_1 = require("../helpers/common.helpers");
const response_helpers_1 = require("../helpers/response.helpers");
exports.spamHeaderAndBodyResponse = common_helpers_1.pipe(network_1.Response.parse, response_helpers_1.checkError, common_helpers_1.ap(response_helpers_1.getSpamHeader, response_helpers_1.getBody), ([spamReport, body]) => ({ spamReport, body }));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhbS1yZXBvcnQtYW5kLWJvZHkucGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BhcnNlcnMvc3BhbS1yZXBvcnQtYW5kLWJvZHkucGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXFDO0FBQ3JDLDhEQUFvRDtBQUNwRCxrRUFJb0M7QUFFdkIsUUFBQSx5QkFBeUIsR0FBRyxxQkFBSSxDQUMzQyxrQkFBUSxDQUFDLEtBQUssRUFDZCw2QkFBVSxFQUNWLG1CQUFFLENBQUMsZ0NBQWEsRUFBRSwwQkFBTyxDQUFDLEVBQzFCLENBQUMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDL0MsQ0FBQSJ9