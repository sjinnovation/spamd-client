"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
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
        __1.Request.exec(requestBuilder, identity)(stream)
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
        __1.Request.exec(requestBuilder, responseParser)(stream)
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
        __1.Request.exec(identity, identity)(stream)
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
        __1.Request.exec(requestBuilder, responseParser)(stream)
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
        __1.Request.exec(identity, identity)(stream)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25ldHdvcmsvc3BlY3MvcmVxdWVzdC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQTZCO0FBQzdCLHVDQUE0QztBQUU1QyxtQ0FBcUM7QUFFckMsUUFBUSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7SUFDN0IsSUFBSSxDQUFDLG9DQUFvQyxFQUFFLElBQUksQ0FBQyxFQUFFO1FBRWhELE1BQU0sTUFBTSxHQUFHLElBQUksS0FBTSxTQUFRLHFCQUFZO1lBQTFCOztnQkFDakIsb0JBQWUsR0FBRyxFQUFFLENBQUE7WUFJdEIsQ0FBQztZQUhDLEtBQUssQ0FBQyxJQUFZO2dCQUNoQixJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQTtZQUM5QixDQUFDO1NBQ0YsRUFBRSxDQUFBO1FBRUgsTUFBTSxRQUFRLEdBQUcsQ0FBSSxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMvQixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDO1lBQy9DLE1BQU0sV0FBZ0I7WUFDdEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxjQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksRUFBRSxzQkFBc0I7U0FDN0IsQ0FBQyxDQUFBO1FBR0YsV0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQU8sTUFBaUIsQ0FBQzthQUM1RCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQ3BDLHVCQUF1QjtnQkFDckIsd0JBQXdCO2dCQUN4QixNQUFNO2dCQUNOLHNCQUFzQixDQUN6QixDQUFBO1lBQ0QsSUFBSSxFQUFFLENBQUE7UUFDUixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsSUFB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