"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
exports.Connection = {
    of: (options) => () => {
        const conn = net_1.createConnection(options);
        return new Promise((resolve, reject) => {
            conn.on('connect', () => {
                conn.removeListener('error', reject);
                return resolve(conn);
            });
            conn.on('error', reject);
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXR3b3JrL2Nvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBOEM7QUFPakMsUUFBQSxVQUFVLEdBQUc7SUFDeEIsRUFBRSxFQUFFLENBQUMsT0FBNEIsRUFBRSxFQUFFLENBQUMsR0FBb0IsRUFBRTtRQUMxRCxNQUFNLElBQUksR0FBRyxzQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUV0QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7Z0JBQ3BDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQSJ9