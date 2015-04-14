import HelloController from './hello.controller.js';

describe('Toto', () => {
    describe('Controller', () => {
        it('should say hello', () => {
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