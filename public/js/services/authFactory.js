app.factory('authfactory', function($http) {
  var auth = {};

  auth.currentUser = {};

  auth.register = function(user) {
    return $http.post('/auth/register', user)
      .then(function(response) {
        console.log(response.data.username);
        auth.currentUser.username = angular.copy(response.data.username)
      });;
  };

  auth.login = function(user) {
    return $http.post('/auth/login', user)
      .then(function(response) {
        auth.currentUser.username = angular.copy(response.data)
      });
  };

  auth.getCurrentUser = function() {
    return $http.get('/auth/currentUser')
      .then(function(response) {
        auth.currentUser.username = angular.copy(response.data)
      });
  }

  auth.logout = function(user) {
    return $http.get('/auth/logout')
      .then(function(response) {
        auth.currentUser.username = null;
      });
  };

  return auth;
});