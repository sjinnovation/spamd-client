"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_helpers_1 = require("../helpers/common.helpers");
const types_1 = require("../types");
const tokenize = (source) => {
    const [status, ...headersAndBody] = source.split('\r\n');
    const metadata = status.match(/([A-Z_]+)|([0-9\.\-]{1,3})/g);
    if (!metadata) {
        throw new Error('Cannot parse response metadata');
    }
    const [protocol, version, statusCode, message] = [...metadata];
    const [rawHeaders, bodyList] = common_helpers_1.splitListByElement('', headersAndBody);
    const headers = rawHeaders.map(header => {
        const parsedHeader = /([A-z\-]+)\s*:\s*(.*)/.exec(header);
        if (!parsedHeader) {
            throw new Error('Cannot parse response headers');
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
        body: bodyList[0],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbmV0d29yay9yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhEQUE4RDtBQUM5RCxvQ0FBNEQ7QUFFNUQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRTtJQUNsQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsY0FBYyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN4RCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUE7SUFFNUQsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtLQUNsRDtJQUVELE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUE7SUFFOUQsTUFBTSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxtQ0FBa0IsQ0FDL0MsRUFBRSxFQUNGLGNBQWMsQ0FDZixDQUFBO0lBQ0QsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN0QyxNQUFNLFlBQVksR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFekQsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUE7U0FDakQ7UUFFRCxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUE7UUFFMUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQXFCLENBQUE7SUFDMUMsQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPO1FBQ0wsUUFBUTtRQUNSLE9BQU87UUFDUCxVQUFVO1FBQ1YsT0FBTztRQUNQLE9BQU87UUFDUCxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUNsQixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRVksUUFBQSxLQUFLLEdBQUcsQ0FBQyxNQUFjLEVBQWlCLEVBQUU7SUFDckQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRS9CLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1FBQzVELFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxjQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sZ0JBQWdCLEdBQUcsb0RBQW9ELENBQUMsSUFBSSxDQUNoRixLQUFLLENBQ04sQ0FBQTtnQkFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLEtBQUssR0FBRyxDQUFDLENBQUE7aUJBQ3ZEO2dCQUVELE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQTtnQkFFdEQsT0FBTztvQkFDTCxJQUFJO29CQUNKO3dCQUNFLE1BQU0sRUFBRSxNQUFNLEtBQUssTUFBTTt3QkFDekIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUM7d0JBQ3BCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO3FCQUM3QjtpQkFDRixDQUFBO2FBQ0Y7WUFFRCxLQUFLLGNBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTthQUM3QjtZQUVELEtBQUssY0FBTSxDQUFDLE1BQU0sQ0FBQztZQUNuQixLQUFLLGNBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckIsSUFDRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FDekQsS0FBSyxDQUNOLEtBQUssQ0FBQyxDQUFDLEVBQ1I7b0JBQ0EsTUFBTSxJQUFJLEtBQUssQ0FDYixnQkFBZ0IsS0FBSyxpQkFBaUIsSUFBSSxHQUFHLENBQzlDLENBQUE7aUJBQ0Y7Z0JBQ0QsT0FBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTthQUMxQjtZQUVEO2dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLElBQUksR0FBRyxDQUFDLENBQUE7U0FDbkQ7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLHlCQUNLLE1BQU0sSUFDVCxVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQWUsRUFDbkQsT0FBTyxFQUFFLGdCQUFnQixJQUMxQjtBQUNILENBQUMsQ0FBQSJ9