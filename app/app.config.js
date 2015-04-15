var config = function ($routeProvider) {
    $routeProvider.when('/main', {templateUrl: 'views/main.html', controller: 'DefaultController'});
    $routeProvider.otherwise({redirectTo: '/main'});
};

config.$inject = ['$routeProvider'];

export default config;