"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
exports.withMethod = (method) => (req) => (Object.assign({}, req, { method }));
exports.withBody = (body) => (req) => (Object.assign({}, req, { body }));
exports.withHeader = (header) => (req) => (Object.assign({}, req, { headers: [...req.headers, header] }));
exports.withContentLength = (req) => {
    if (!req.body) {
        return req;
    }
    return Object.assign({}, req, { headers: [
            ...req.headers,
            [types_1.Header.ContentLength, req.body.length],
        ] });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvcmVxdWVzdC5oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQWtFO0FBRXJELFFBQUEsVUFBVSxHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxDQUM1QyxHQUFhLEVBQ0gsRUFBRSxDQUFDLG1CQUNWLEdBQUcsSUFDTixNQUFNLElBQ04sQ0FBQTtBQUVXLFFBQUEsUUFBUSxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUN4QyxHQUFhLEVBQ0gsRUFBRSxDQUFDLG1CQUNWLEdBQUcsSUFDTixJQUFJLElBQ0osQ0FBQTtBQUVXLFFBQUEsVUFBVSxHQUFHLENBQUMsTUFBcUIsRUFBRSxFQUFFLENBQUMsQ0FDbkQsR0FBYSxFQUNILEVBQUUsQ0FBQyxtQkFDVixHQUFHLElBQ04sT0FBTyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUNqQyxDQUFBO0FBRVcsUUFBQSxpQkFBaUIsR0FBRyxDQUFDLEdBQWEsRUFBWSxFQUFFO0lBQzNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO1FBQ2IsT0FBTyxHQUFHLENBQUE7S0FDWDtJQUVELHlCQUNLLEdBQUcsSUFDTixPQUFPLEVBQUU7WUFDUCxHQUFHLEdBQUcsQ0FBQyxPQUFPO1lBQ2QsQ0FBQyxjQUFNLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3hDLElBQ0Y7QUFDSCxDQUFDLENBQUEifQ==