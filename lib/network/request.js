"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = (requestBuilder, responseParser) => (connection) => {
    return new Promise((resolve, reject) => {
        let response = '';
        connection.on('data', responseChunk => {
            response += responseChunk.toString();
        });
        connection.on('end', () => {
            connection
                .removeAllListeners('data')
                .removeAllListeners('end')
                .removeListener('error', reject);
            try {
                return resolve(responseParser(response));
            }
            catch (e) {
                return reject(e);
            }
        });
        connection.on('error', reject);
        const builtRequest = requestBuilder({
            method: '',
            headers: [],
            body: '',
        });
        connection.write(`${builtRequest.method} SPAMC/1.5\r\n`);
        builtRequest.headers.forEach(header => {
            if (!header) {
                return;
            }
            const [name, value] = header;
            connection.write(`${name}: ${value}\r\n`);
        });
        connection.write('\r\n' + builtRequest.body);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXR3b3JrL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHYSxRQUFBLElBQUksR0FBRyxDQUNsQixjQUEyQyxFQUMzQyxjQUEyQyxFQUMzQyxFQUFFLENBQUMsQ0FBQyxVQUFrQixFQUFrQixFQUFFO0lBQzFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2pCLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxFQUFFO1lBQ3BDLFFBQVEsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDdEMsQ0FBQyxDQUFDLENBQUE7UUFFRixVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFHeEIsVUFBVTtpQkFDUCxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7aUJBQzFCLGtCQUFrQixDQUFDLEtBQUssQ0FBQztpQkFDekIsY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUVsQyxJQUFJO2dCQUNGLE9BQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO2FBQ3pDO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDakI7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUVGLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBRTlCLE1BQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQztZQUNsQyxNQUFNLEVBQVEsRUFBYTtZQUMzQixPQUFPLEVBQUUsRUFBb0I7WUFDN0IsSUFBSSxFQUFFLEVBQUU7U0FDVCxDQUFDLENBQUE7UUFFRixVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sZ0JBQWdCLENBQUMsQ0FBQTtRQUV4RCxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLE9BQU07YUFDUDtZQUVELE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFBO1lBRTVCLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQTtRQUMzQyxDQUFDLENBQUMsQ0FBQTtRQUVGLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM5QyxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQSJ9