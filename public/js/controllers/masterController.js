app.controller('masterController', function($scope, authfactory, $rootScope) {
	$rootScope.currentUser = authfactory.currentUser;
	$scope.logout = authfactory.logout;
	authfactory.getCurrentUser();

});