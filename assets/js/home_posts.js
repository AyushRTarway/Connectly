{
    // method to submit the form data for new post using AJAX
    let createpost = function () {
        let newPostform = $("#new-post-form");

        newPostform.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostform.serialize(),
                success: function (data)
                {
                    let newpost = newPostDom(data.data.post)
                    $('#posts-list-container>ul').prepend(newpost)
                    deletepost($(' .delete-post-button', newpost))
                    
                    new PostComments(data.data.post._id);
                     new Noty({
                       theme: "relax",
                       text: "Post Published!",
                       type: "success",
                       layout: "topRight",
                       timeout: 1500,
                     }).show();
                },


                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
                        </small>
                       
                        ${ post.content }
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`);
    }


    //method to delete a post from dom 
    let deletepost = function (deletelink)
    {
        $(deletelink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deletelink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                       theme: "relax",
                       text: "Post Deleted!",
                       type: "success",
                       layout: "topRight",
                       timeout: 1500,
                    }).show();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }


    let convertPostsToAjax = function () {
      $("#posts-list-container>ul>li").each(function () {
        let self = $(this);
        let deleteButton = $(" .delete-post-button", self);
        deletepost(deleteButton);

        // get the post's id by splitting the id attribute
        let postId = self.prop("id").split("-")[1];
        new PostComments(postId);
      });
    };
    
    createpost();
    convertPostsToAjax();
}