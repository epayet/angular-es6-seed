import app from './app.js';

angular.element(document).ready(function () {
    angular.bootstrap(document, [app.name]);
});