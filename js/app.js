angular.module('angular-rnd', []).
    config(function($routeProvider) {
        $routeProvider.
            when('/about', {templateUrl:'partials/basic-template.html', controller:AboutCtrl}).
            when('/experiments', {templateUrl:'partials/basic-template.html', controller:ExperimentsCtrl   }).
            when('/', {templateUrl:'partials/basic-template.html', controller:HomeCtrl   }).
            otherwise({redirectTo:'/'});
    });
