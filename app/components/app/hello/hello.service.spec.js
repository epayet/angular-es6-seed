import HelloService from './hello.service.js';

describe('Toto', () => {
    describe('Service', () => {
        it('should say hello', () => {
            var totoService = new HelloService();
            var hello = totoService.sayHello();
            expect(hello).toBe('hello');
        });
    });
});