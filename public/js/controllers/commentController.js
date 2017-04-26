app.controller('CommentController', function($scope, $stateParams, cookFactory) {

  $scope.addComment = function() {
    cookFactory.addComment($stateParams.id ,$scope.body)
      .then(function(newPost) {
        $scope.post = newPost;
      })
      //this is new
      .catch(function(err) {
        alert(err.data)
      });
  }    
  

$scope.upvote = function(comment) {
// console.log($stateParams.id);
 cookFactory.voteComment($stateParams.id, comment._id, true).then(function(response){
   comment.upvotes++;
 });
     };

 $scope.downvote = function(comment) {
  cookFactory.voteComment($stateParams.id, comment._id, false).then(function(response){
    comment.upvotes--;
  });
      };

  $scope.deleteComment = function(commentid) {
    var self = this;
    cookFactory.deleteComment(this.post._id, commentid)
      .then(function(response) {
        $scope.post.comments.splice(self.$index, 1);
      })
      //this is new
      .catch(function(err) {
        console.log(err);
      });
  }

    cookFactory.getComments($stateParams.id).then(function(comments) {
    $scope.post = comments;
  });


});
