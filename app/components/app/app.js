import config from './app.config.js';
import appComponents from './app.components.js';

export default angular.module('app', [
        'ngRoute',
        appComponents.name
    ])
    .config(config)
    .controller('DefaultController', function ($scope, $routeParams) {
        //console.log($routeParams);
        $scope.$routeParams = $routeParams;
    })
;