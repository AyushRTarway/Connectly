const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res)
{
    try{
        let post = await Post.findById(req.body.post);
        if (post)
        {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
                // handle error
            post.comments.push(comment);
            post.save();
            console.log('done');
            res.redirect('/');
        }
    }catch(err){
        console.log("Error ",err);
        return;
    }
};


module.exports.destroy = async function(request,response)
{
    try{
        let comment = await Comment.findById(request.params.id);
        if(comment.user == request.user.id)
        {
            let  postid = comment.post;
            comment.remove();

            let post = await Post.findByIdAndUpdate(postid,{$pull:{comments:request.params.id}})
            return response.redirect('back');
        }else{
            return response.redirect('back');
        }
    }catch(err){
        console.log("Error ",err);
        return;
    }
}
