"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ap(...fns) {
    return (applicable) => fns.map(fn => fn(applicable));
}
exports.ap = ap;
function pipe(...fns) {
    return fns.reduce((prevFn, nextFn) => value => nextFn(prevFn(value)), value => value);
}
exports.pipe = pipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9jb21tb24uaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXNDQSxTQUFnQixFQUFFLENBQUMsR0FBRyxHQUEyQjtJQUMvQyxPQUFPLENBQUMsVUFBZSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7QUFDM0QsQ0FBQztBQUZELGdCQUVDO0FBMEJELFNBQWdCLElBQUksQ0FBQyxHQUFHLEdBQTJCO0lBQ2pELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FDZixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNsRCxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FDZixDQUFBO0FBQ0gsQ0FBQztBQUxELG9CQUtDIn0=