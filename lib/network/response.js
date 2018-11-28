"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const takeUntilDelimiter = (delimiter, source) => {
    const position = source.indexOf(delimiter) + 1;
    return position
        ? [
            source.substr(0, position),
            source.substr(position + delimiter.length - 1),
        ]
        : [source, undefined];
};
const tokenize = (source) => {
    const [status, headersAndBody] = takeUntilDelimiter('\r\n', source);
    const metadata = /(SPAMD)\/([0-9\.\-]+)\s+([0-9]{1,2})\s+([A-Z_]+).*/.exec(status);
    if (!metadata) {
        throw new Error('Cannot parse response metadata');
    }
    if (!headersAndBody) {
        throw new Error('Headers not found');
    }
    const [_, protocol, version, statusCode, message] = [...metadata];
    const [rawHeaders, body] = takeUntilDelimiter('\r\n\r\n', headersAndBody);
    const headers = rawHeaders.split('\r\n').map(header => {
        const parsedHeader = /([A-z\-]+)\s*:\s*(.*)/.exec(header);
        if (!parsedHeader) {
            throw new Error(`Cannot parse response headers: ${header}`);
        }
        const [_, name, value] = [...parsedHeader];
        return [name, value];
    });
    return {
        protocol,
        version,
        statusCode,
        message,
        headers,
        body: body && body.replace(/\r\n/g, '\n'),
    };
};
exports.parse = (source) => {
    const tokens = tokenize(source);
    const fixedTypeHeaders = tokens.headers.map(([name, value]) => {
        switch (name) {
            case types_1.Header.Spam: {
                const parsedSpamHeader = /(True|False)\s*;\s*([0-9.\-]+)\s*\/\s*([0-9.]+)\s*/.exec(value);
                if (!parsedSpamHeader) {
                    throw new Error(`Cannot parse Spam header "${value}"`);
                }
                const [_, isSpam, score, threshold] = parsedSpamHeader;
                return [
                    name,
                    {
                        isSpam: isSpam === 'True',
                        score: Number(score),
                        threshold: Number(threshold),
                    },
                ];
            }
            case types_1.Header.ContentLength: {
                return [name, Number(value)];
            }
            case types_1.Header.DidSet:
            case types_1.Header.DidRemove: {
                if (['local', 'remote', 'local,remote', 'remote,local'].indexOf(value) === -1) {
                    throw new Error(`Wrong value "${value}" for header "${name}"`);
                }
                return [name, value];
            }
            default:
                throw new Error(`Obtain wrong header "${name}"`);
        }
    });
    return Object.assign({}, tokens, { statusCode: Number(tokens.statusCode), headers: fixedTypeHeaders });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbmV0d29yay9yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9DQUE0RDtBQUU1RCxNQUFNLGtCQUFrQixHQUFHLENBQ3pCLFNBQWlCLEVBQ2pCLE1BQWMsRUFDZ0IsRUFBRTtJQUNoQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM5QyxPQUFPLFFBQVE7UUFDYixDQUFDLENBQUM7WUFDRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUM7WUFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDL0M7UUFDSCxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDekIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRTtJQUNsQyxNQUFNLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUVuRSxNQUFNLFFBQVEsR0FBRyxvREFBb0QsQ0FBQyxJQUFJLENBQ3hFLE1BQU0sQ0FDUCxDQUFBO0lBRUQsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtLQUNsRDtJQUVELElBQUksQ0FBQyxjQUFjLEVBQUU7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0tBQ3JDO0lBRUQsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUE7SUFFakUsTUFBTSxDQUFDLFVB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