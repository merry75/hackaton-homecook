app.controller('CommentController', function($scope, $stateParams, postFactory) {

  $scope.addComment = function() {
    postFactory.addComment($stateParams.id ,$scope.body)
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
 postFactory.voteComment($stateParams.id, comment._id, true).then(function(response){
   comment.upvotes++;
 });
     };

 $scope.downvote = function(comment) {
  postFactory.voteComment($stateParams.id, comment._id, false).then(function(response){
    comment.upvotes--;
  });
      };

  $scope.deleteComment = function(commentid) {
    var self = this;
    postFactory.deleteComment(this.post._id, commentid)
      .then(function(response) {
        $scope.post.comments.splice(self.$index, 1);
      })
      //this is new
      .catch(function(err) {
        console.log(err);
      });
  }

    postFactory.getComments($stateParams.id).then(function(comments) {
    $scope.post = comments;
  });


});
