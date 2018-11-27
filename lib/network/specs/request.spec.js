"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Request = __importStar(require("../request"));
const types_1 = require("../../types");
const events_1 = require("events");
describe('#Request.exec', () => {
    test('should format request text correct', done => {
        const stream = new class extends events_1.EventEmitter {
            constructor() {
                super(...arguments);
                this.inspectedBuffer = '';
            }
            write(data) {
                this.inspectedBuffer += data;
            }
        }();
        const identity = (a) => a;
        const requestBuilder = jest.fn().mockReturnValue({
            method: "HEADERS",
            headers: [[types_1.Header.ContentLength, 20]],
            body: 'hey its test body :)',
        });
        Request.exec(requestBuilder, identity)(stream)
            .then(() => {
            expect(stream.inspectedBuffer).toEqual('HEADERS SPAMC/1.5\r\n' +
                'Content-length: 20\r\n' +
                '\r\n' +
                'hey its test body :)');
            done();
        })
            .catch(done);
        stream.emit('end');
    });
    test('should pass concatenated response to parser', done => {
        const stream = new class extends events_1.EventEmitter {
            write() { }
        }();
        const identity = (a) => a;
        const requestBuilder = identity;
        const responseParser = jest.fn(identity);
        Request.exec(requestBuilder, responseParser)(stream)
            .then(response => {
            expect(response).toEqual('the data was split to chunks');
            expect(responseParser).toBeCalledWith(response);
            done();
        })
            .catch(done);
        stream.emit('data', 'the data ');
        stream.emit('data', 'was split ');
        stream.emit('data', 'to chunks');
        stream.emit('end');
    });
    test('should remove listeners when end emitted', done => {
        const removeListener = jest.fn();
        const removeAllListeners = jest.fn();
        const stream = new class extends events_1.EventEmitter {
            write() { }
            removeAllListeners(...args) {
                removeAllListeners(...args);
                return this;
            }
            removeListener(...args) {
                removeListener(...[args[0]]);
                return this;
            }
        }();
        const identity = (a) => a;
        Request.exec(identity, identity)(stream)
            .then(response => {
            expect(response).toEqual('');
            expect(removeAllListeners).toBeCalledWith('data');
            expect(removeAllListeners).toBeCalledWith('end');
            expect(removeListener).toBeCalledWith('error');
            done();
        })
            .catch(done);
        stream.emit('end');
    });
    test('should reject when parse error', done => {
        const stream = new class extends events_1.EventEmitter {
            write() { }
        }();
        const identity = (a) => a;
        const requestBuilder = identity;
        const responseParser = jest.fn(() => {
            throw new Error('#Parse_Error');
        });
        Request.exec(requestBuilder, responseParser)(stream)
            .then(() => {
            done(new Error('Should never call'));
            return null;
        })
            .catch(err => {
            expect(err.message).toEqual('#Parse_Error');
            done();
        });
        stream.emit('end');
    });
    test('should reject when stream error', done => {
        const stream = new class extends events_1.EventEmitter {
            write() { }
        }();
        const identity = (a) => a;
        Request.exec(identity, identity)(stream)
            .then(() => {
            done(new Error('Should never call'));
            return null;
        })
            .catch(err => {
            expect(err.message).toEqual('#Stream_Error');
            done();
        });
        stream.emit('error', new Error('#Stream_Error'));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25ldHdvcmsvc3BlY3MvcmVxdWVzdC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG9EQUFxQztBQUNyQyx1Q0FBNEM7QUFFNUMsbUNBQXFDO0FBRXJDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO0lBQzdCLElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxJQUFJLENBQUMsRUFBRTtRQUVoRCxNQUFNLE1BQU0sR0FBRyxJQUFJLEtBQU0sU0FBUSxxQkFBWTtZQUExQjs7Z0JBQ2pCLG9CQUFlLEdBQUcsRUFBRSxDQUFBO1lBSXRCLENBQUM7WUFIQyxLQUFLLENBQUMsSUFBWTtnQkFDaEIsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUE7WUFDOUIsQ0FBQztTQUNGLEVBQUUsQ0FBQTtRQUVILE1BQU0sUUFBUSxHQUFHLENBQUksQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDL0IsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQztZQUMvQyxNQUFNLFdBQWdCO1lBQ3RCLE9BQU8sRUFBRSxDQUFDLENBQUMsY0FBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNyQyxJQUFJLEVBQUUsc0JBQXNCO1NBQzdCLENBQUMsQ0FBQTtRQUdGLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFPLE1BQWlCLENBQUM7YUFDNUQsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNULE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUNwQyx1QkFBdUI7Z0JBQ3JCLHdCQUF3QjtnQkFDeEIsTUFBTTtnQkFDTixzQkFBc0IsQ0FDekIsQ0FBQTtZQUNELElBQUksRUFBRSxDQUFBO1FBQ1IsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxD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