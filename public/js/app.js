var app = angular.module('homecook', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'PostController'
    })
    .state('comment', {
      url: '/post/:id',
      templateUrl: '/templates/comments.html',
      controller: 'CommentController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'authController'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'authController'
    })   
    .state('cookprofile', {
      url: '/cookProfile',
      templateUrl: '/templates/cookprofile.html',
      controller: 'authController'
    })
    .state('userprofile', {
      url: '/userProfile',
      templateUrl: '/templates/userprofile.html',
      controller: 'authController'
    })
    .state('list', {
      url: '/list',
      templateUrl: '/templates/list.html',
      controller: 'authController'
    })
    .state('order', {
      url: '/order',
      templateUrl: '/templates/order.html',
      controller: 'authController'
    })
    .state('auth', {
      url: '/authorization?token&name',
      controller: function($rootScope, $stateParams, $state, $http) {
        if ($stateParams.token) {
          var user = {
            name: $stateParams.name,
            token: $stateParams.token
          }
          localStorage.setItem("user", JSON.stringify(user));
          $rootScope.currentUser = user.name;
          //set the header for all requests
          $http.defaults.headers.common.Authorization = 'Bearer ' + user.token;
          $state.go('home');
        }
      }
    })
  $urlRouterProvider.otherwise('home');
});

app.run(function($rootScope) {
  var user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    $rootScope.currentUser = user.name;
  }
});