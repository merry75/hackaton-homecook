app.controller('PostController', function($scope, cookFactory) {

  $scope.addPost = function() {
    cookFactory.addPost($scope.newPost)
      .then(function(post) {
        $scope.posts.push(post);
      })
      //this is new
      .catch(function(err) {
        alert(err.data.message)
      });
  }
  $scope.upvote = function(post) {
    cookFactory.addUpvotesToPost(post);
  }

  $scope.downvote = function(post) {
    cookFactory.addDownvotesToPost(post);
  }

  $scope.deletePost = function() {
    var self = this;
    cookFactory.deletePost(this.post)
      .then(function(response) {
        $scope.posts.splice(self.$index, 1);
      })
      //this is new
      .catch(function(err) {
        alert(err.data.message)
      });
  }

    cookFactory.getPosts().then(function(posts) {
    $scope.posts = posts;
  });

  });