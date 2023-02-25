const Post = require('../models/post')
const Comment = require('../models/comment');
const { request } = require('http');


module.exports.create = async function(req, res)
{
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr)
        {
            // request.flash("success", "Post Published!");
            // post = await post.populate("user", "name").execPopulate();
            return res.status(200).json({
                data: {
                    post:post
                },
                message:"post created"
            })
            
        }

        request.flash('success', 'Post Published!');
        return res.redirect('back');
    } catch (err) {
        req.flash("error", err);
        return res.redirect("back");
    }
}

module.exports.destroy = async function(request,response){
    
    try{
        let post = await Post.findById(request.params.id);
        if(post.user == request.user.id)
        {

            if (request.xhr) {
                return response.status(200).json({
                    data: {
                        post_id: request.params.id
                    },
                    message: "Post deleted"
                });
            }


                post.remove();
                await Comment.deleteMany({post:request.params.id});
                request.flash("success", "Post Deleted!");
                return response.redirect('back');
        }
        else {
            request.flash("error", "You can not delete this Post!");
            return response.redirect('back');
        }
    }catch(err){
        request.flash("error", err);
        return res.redirect("back");
    }
}




