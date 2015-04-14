import HelloTemplate from './hello.html';

var HelloDirective = () => {
    return {
        restrict: 'E',
        template: HelloTemplate,
        controller: 'HelloController',
        controllerAs: 'component',
        bindToController: true,
        scope: {}
    };
};

export default HelloDirective;