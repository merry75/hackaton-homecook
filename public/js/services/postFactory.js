app.factory('cookFactory', function($http, $rootScope) {

  var cook = {
  }



  cook.getUsers = function() {
    return $http.get('/userprofiles')
      .then(function(response) {
        //if wanted/needed you can do data manipulation and parsing here

        //our returned data is wrapped in a pre-resolved promise
        //we can access that data in our controller using '.then' 
        return response.data
      }, function(err) {
        //console.error(err)
      });
  };

  cook.getPosts = function() {
    return $http.get('/posts')
      .then(function(response) {
        //if wanted/needed you can do data manipulation and parsing here

        //our returned data is wrapped in a pre-resolved promise
        //we can access that data in our controller using '.then' 
        return response.data
      }, function(err) {
        //console.error(err)
      });
  };

cook.addPost = function(newPost) {
    return $http.post('/posts', {author: $rootScope.currentUser, text: newPost, upvotes: 0})

      .then(function(response) {
        return response.data
      });
  };

  cook.deletePost = function(post) {
    return $http.delete('/posts/' + post._id)
      .then(function(response) {
        return response.data;
      });
  };
  
    cook.addComment = function(id, newComment) {
    return $http.post('/posts/' + id + '/comments', {body: newComment, upvotes: 0})
      .then(function(response) {
        return response.data
      }, function(err) {
        console.error(err)
      });
  };
  
  //removed the error handler
  cook.deleteComment = function(postId, commentId) {
    return $http.delete('/posts/' + postId + '/comments/' + commentId)
      .then(function(response) {
        return response.data
      });
  };

  cook.getComments = function(id) {
    return $http.get('/posts/' + id + '/comments')
      .then(function(response) {
        //if wanted/needed you can do data manipulation and parsing here

        //our returned data is wrapped in a pre-resolved promise
        //we can access that data in our controller using '.then' 
        return response.data
      }, function(err) {
        //console.error(err)
      });
  };

    cook.addDownvotesToPost = function (post) {
    let vote = {
      vote: -1
    }
    return $http.put('/posts/' + post._id, vote)
      .then(function(response) {
        //if wanted/needed you can do data manipulation and parsing here
        post.upvotes--;
        //our returned data is wrapped in a pre-resolved promise
        //we can access that data in our controller using '.then' 
        return response.data
      }, function(err) {
        //console.error(err)
      });
  };


  cook.addUpvotesToPost = function (post) {
    let vote = {
      vote: 1
    }
    return $http.put('/posts/' + post._id, vote)
      .then(function(response) {
        //if wanted/needed you can do data manipulation and parsing here
        post.upvotes++;
        //our returned data is wrapped in a pre-resolved promise
        //we can access that data in our controller using '.then' 
        return response.data
      }, function(err) {
        //console.error(err)
      });
  };

cook.voteComment = function (postid, commentid, upvote) {
  var comment = {};
  if (upvote) {
  comment.vote = true;
}
  else {
   comment.vote = false;
    }
    //req.body is equal to comment, comment has to be an object
    //after the http request
return $http.put('/posts/' + postid + '/comments/' + commentid, comment)
  .then(function(response){
    console.log(response.data);
     return response.data;
  });
}




  return cook;
});
