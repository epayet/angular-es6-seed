import HelloController from './hello.controller.js';

describe('Toto', function() {
    describe('Controller', function() {
        it('should say hello', function() {
            class HelloServiceMock {
                sayHello () {
                    return 'mockHello';
                }
            }

            let totoController = new HelloController(new HelloServiceMock());
            totoController.sayHello();
            expect(totoController.hello).toBe('mockHello');
        });
    });
});