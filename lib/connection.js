"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
exports.Connection = {
    of: (options) => () => {
        const conn = net_1.createConnection({
            host: options.host,
            port: options.port,
        });
        return new Promise((resolve, reject) => {
            conn.on('connect', () => {
                conn.removeListener('error', reject);
                return resolve(conn);
            });
            conn.on('error', reject);
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQThDO0FBT2pDLFFBQUEsVUFBVSxHQUFHO0lBQ3hCLEVBQUUsRUFBRSxDQUFDLE9BQTBCLEVBQUUsRUFBRSxDQUFDLEdBQW9CLEVBQUU7UUFDeEQsTUFBTSxJQUFJLEdBQUcsc0JBQWdCLENBQUM7WUFDNUIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtTQUNuQixDQUFDLENBQUE7UUFFRixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7Z0JBQ3BDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQSJ9