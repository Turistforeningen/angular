function findById(a, id) {
  for (var i=0; i<a.length; i++) {
    if (a[i].id == id) return a[i];
  }
}

angular.module('angular-rnd', ['ui.compat']).
  config(
    ['$stateProvider', '$routeProvider', '$urlRouterProvider',
    function($stateProvider, $routeProvider, $urlRouterProvider) {
      $urlRouterProvider.
        /*when('/e?id', '/experiment/:id').*/
        otherwise('/');

      $routeProvider.
        when('/', { templateUrl:'partials/basic-template.html', controller:HomeCtrl });

      $stateProvider.
        state('trips', {
          url: '/trips',
          abstract: true,
          templateUrl: 'partials/trips/main.html',

          /*resolve: {
            trips: ['$timeout', '$stateParams', '$http', function($timeout, $stateParams, $http) {
              $http.get('models/trips.json')
                .then(function(res) {
                  console.log('http', res);
                  $timeout(function() {
                    return res.data;
                  }, 10);
                  })
            }]
          },*/

          controller:
            ['$scope', '$state', '$http', function($scope, $state, $http) {
              $scope.title = 'My Trips';
              $scope.subTitle = 'Here are some of your trips';

              $http.get('models/trips.json')
                .then(function(res) {
                  $scope.trips = res.data;
                });

              /* $scope.$on('$viewContentLoaded', function(){
                console.log('state loaded');
              }); */
            }]
        }).

        state('trips.content', {
          url: '',
          views: {
            'filter': {
              templateUrl: 'partials/trips/filter.html',
              controller: ['$scope', function($scope) {
                console.log($scope);
              }]
            },
            'list': {
              templateUrl: 'partials/trips/list.html',
              controller: ['$scope', function($scope) {
                console.log($scope);
              }]
            }
          }
        }).

        state('experiment', {
          url: '/experiment',
          abstract: true,
          templateUrl: 'partials/experiment/main.html',
          controller:
            ['$scope', '$state', function($scope, $state) {
              console.log($scope, $state);
              $scope.title = 'Experiments';
              $scope.items = [{
                id: 0,
                name: 'Item 0'
              }, {
                id: 1,
                name: 'Item 1'
              }];

              // Some function
              $scope.myNewFunction = function(x, y) {
                return Math.pow(x, y)
              };

            }]
        }).

        state('experiment.empty', {
          parent: 'experiment',
          url: ''/*,
          templateUrl: 'contacts.list.html'*/
        }).

        state('experiment.details', {
          parent: 'experiment',
          url: '/{id:[0-9]+}',
          /*resolve: {
            something:
              ['$timeout', '$stateParams',
              function ($timeout, $stateParams) {
                return $timeout(function () { return "Asynchronously resolved data (" + $stateParams.id + ")" }, 10);
              }]
          },*/
          views: {
            'item': {
              templateUrl: 'partials/experiment/details.html',
              controller:
                ['$scope', '$stateParams'/*, 'something'*/,
                function($scope, $stateParams/*, something*/) {
                  /*$scope.something = something;*/
                  $scope.item = findById($scope.items, $stateParams.id);
                  console.log($scope, $stateParams);
                }]
            }
          }
        })
    }
 ]);
