const Post = require('../models/post')
const Comment = require('../models/comment')


module.exports.create = function(req, res)
{
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    });
}

module.exports.destroy = function(request,response){
    Post.findById(request.params.id,function(err,post)
    {
        // .id means converting the object id into string
        if(post.user == request.user.id){
            post.remove();

            Comment.deleteMany({post:request.params.id},function(err){
                return response.redirect('back');
            })
        }else{
            return response.redirect('back');
        }
    })
}



