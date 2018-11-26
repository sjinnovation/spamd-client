"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network_1 = require("../network");
const common_helpers_1 = require("../helpers/common.helpers");
const response_helpers_1 = require("../helpers/response.helpers");
exports.spamHeaderResponse = common_helpers_1.pipe(network_1.Response.parse, response_helpers_1.checkError, response_helpers_1.getSpamHeader);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhbS1yZXBvcnQucGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BhcnNlcnMvc3BhbS1yZXBvcnQucGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXFDO0FBQ3JDLDhEQUFnRDtBQUNoRCxrRUFHb0M7QUFFdkIsUUFBQSxrQkFBa0IsR0FBRyxxQkFBSSxDQUNwQyxrQkFBUSxDQUFDLEtBQUssRUFDZCw2QkFBVSxFQUNWLGdDQUFhLENBQ2QsQ0FBQSJ9