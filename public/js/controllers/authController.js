// app.controller('authController', function($scope, $rootScope, $http, cookFactory) {
//   $scope.logout = function() {
//     localStorage.removeItem("user");
//     $rootScope.currentUser = null;
//     delete $http.defaults.headers.common.Authorization;
//   }

// }) 


app.controller('authController', function($scope, authfactory, $state, $rootScope, $http) {
  $scope.register = function() {
    authfactory.register($scope.user)
      .then(function() {
        $state.go('home');
      }, function(err) {
        alert(err.data.message);
      });
  }

  $scope.login = function() {
    authfactory.login($scope.user)
      .then(function() {
        $rootScope.currentUser = authfactory.currentUser;
        $state.go('home');
      }, function(err) {
        alert(err.data);
      });
  }

  $scope.logout = function() {
    localStorage.removeItem("user");
    $rootScope.currentUser = null;
    delete $http.defaults.headers.common.Authorization;
  }

});