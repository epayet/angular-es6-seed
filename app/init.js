import app from './components/app/app.js';

angular.element(document).ready(function () {
    angular.bootstrap(document, [app.name]);
});