"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Network = __importStar(require("net"));
const connection_1 = require("../connection");
const events_1 = require("events");
afterEach(() => jest.clearAllMocks());
jest.mock('net', () => ({
    createConnection: jest.fn(),
}));
describe('#Connection.of', () => {
    test('should resolve promise with socket when connection established', done => {
        const eventBus = new events_1.EventEmitter();
        const connectionOpts = { host: 'test.example.com', port: 8888 };
        const connect = connection_1.Connection.of(connectionOpts);
        const createConnectionMock = Network.createConnection.mockReturnValue(eventBus);
        connect()
            .then(socket => {
            expect(createConnectionMock).toBeCalledWith(connectionOpts);
            expect(socket).toBe(eventBus);
            done();
        })
            .catch(err => {
            expect(err).toBeFalsy();
            done(new Error('Should never call'));
        });
        eventBus.emit('connect');
    });
    test('should reject promise with socket connection error', done => {
        const eventBus = new events_1.EventEmitter();
        const connectionOpts = { host: 'test.example.com', port: 8888 };
        const connect = connection_1.Connection.of(connectionOpts);
        const createConnectionMock = Network.createConnection.mockReturnValue(eventBus);
        connect()
            .then(socket => {
            done(new Error('Should never call'));
        })
            .catch(err => {
            expect(err.message).toEqual('#1_Connection_error');
            done();
        });
        eventBus.emit('error', new Error('#1_Connection_error'));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25ldHdvcmsvc3BlY3MvY29ubmVjdGlvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDZDQUE4QjtBQUM5Qiw4Q0FBMEM7QUFDMUMsbUNBQXFDO0FBRXJDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQTtBQUVyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7Q0FDNUIsQ0FBQyxDQUFDLENBQUE7QUFFSCxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO0lBQzlCLElBQUksQ0FBQyxnRUFBZ0UsRUFBRSxJQUFJLENBQUMsRUFBRTtRQUU1RSxNQUFNLFFBQVEsR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQTtRQUNuQyxNQUFNLGNBQWMsR0FBRyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFDL0QsTUFBTSxPQUFPLEdBQUcsdUJBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUE7UUFHN0MsTUFBTSxvQkFBb0IsR0FBSSxPQUFPLENBQUMsZ0JBQXdCLENBQUMsZUFBZSxDQUM1RSxRQUFRLENBQ1QsQ0FBQTtRQUdELE9BQU8sRUFBRTthQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNiLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUMzRCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQzdCLElBQUksRUFBRSxDQUFBO1FBQ1IsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFBO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUE7UUFDdEMsQ0FBQyxDQUFDLENBQUE7UUFHSixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzFCLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxDQUFDLG9EQUFvRCxFQUFFLElBQUksQ0FBQyxFQUFFO1FBRWhFLE1BQU0sUUFBUSxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFBO1FBQ25DLE1BQU0sY0FBYyxHQUFHLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQTtRQUMvRCxNQUFNLE9BQU8sR0FBRyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUc3QyxNQUFNLG9CQUFvQixHQUFJLE9BQU8sQ0FBQyxnQkFBd0IsQ0FBQyxlQUFlLENBQzVFLFFBQVEsQ0FDVCxDQUFBO1FBR0QsT0FBTyxFQUFFO2FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQTtRQUN0QyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDWCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1lBQ2xELElBQUksRUFBRSxDQUFBO1FBQ1IsQ0FBQyxDQUFDLENBQUE7UUFHSixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUE7SUFDMUQsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSJ9