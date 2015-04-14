import HelloDirective from './hello.directive.js';
import HelloController from './hello.controller.js';
import HelloService from './hello.service.js';

export default angular.module('app.toto', [])
    .directive('toto', HelloDirective)
    .controller('HelloController', HelloController)
    .service('helloService', HelloService)
;