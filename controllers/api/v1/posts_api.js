const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
 
    return res.json(200, {
        message: 'List of posts',
        posts:posts
    })
}

module.exports.destroy = async function (request, response) {
    try {
        let post = await Post.findById(request.params.id);
        // if (post.user == request.user.id) {
        post.remove();
        await Comment.deleteMany({ post: request.params.id });

        // if (request.xhr) {
        //   return response.status(200).json({
        //     data: {
        //       post_id: request.params.id,
        //     },
        //     message: "Post deleted",
        //   });
        // }
        // request.flash("success", "Post Deleted!");
        return response.json(200, {
            message:"post and associated comments deleted succesfully!"
        });
    //  else {
    //         request.flash("error", "You can not delete this Post!");
    //         return response.redirect("back");
    //     }
    } 
    catch (err) {
    // request.flash("error", err);
    // return res.redirect("back");
        return response.json(500, {
            message:"Internal server error"
        })
  }
}