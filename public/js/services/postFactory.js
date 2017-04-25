app.factory('postFactory', function($http, $rootScope) {

  var posts = {
    //todo
    //add post
    //up/down vote post
    //add comment (to post)
    //up/down vote comment (belonging to post)
    //extension: admin can delete post
    //extension: admin can delete comment (from post)
  }

  posts.getPosts = function() {
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

posts.addPost = function(newPost) {
    return $http.post('/posts', {author: $rootScope.currentUser, text: newPost, upvotes: 0})

      .then(function(response) {
        return response.data
      });
  };

  posts.deletePost = function(post) {
    return $http.delete('/posts/' + post._id)
      .then(function(response) {
        return response.data;
      });
  };
  
    posts.addComment = function(id, newComment) {
    return $http.post('/posts/' + id + '/comments', {body: newComment, upvotes: 0})
      .then(function(response) {
        return response.data
      }, function(err) {
        console.error(err)
      });
  };
  
  //removed the error handler
  posts.deleteComment = function(postId, commentId) {
    return $http.delete('/posts/' + postId + '/comments/' + commentId)
      .then(function(response) {
        return response.data
      });
  };

  posts.getComments = function(id) {
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

    posts.addDownvotesToPost = function (post) {
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


  posts.addUpvotesToPost = function (post) {
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

posts.voteComment = function (postid, commentid, upvote) {
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




  return posts;
});
