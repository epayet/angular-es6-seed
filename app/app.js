import config from './app.config.js';
import appComponents from './components/app/app.components.js';
import constants from './app.constants.js';

export default angular.module('app', [
        'ngRoute',
        appComponents.name
    ])
    .config(config)
    .constant('Constants', constants)
    .controller('DefaultController', function ($scope, $routeParams) {
        //console.log($routeParams);
        $scope.$routeParams = $routeParams;
    })
;