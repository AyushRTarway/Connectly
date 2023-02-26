const User = require('../models/user');
const fs = require('fs');
const path = require('path');
 
module.exports.profile = function(req, res){//without the async await
  User.findById(req.params.id, function(err, user){
      return res.render('users_profile', {
          title: 'User Profile',
          profile_user: user
      });
  });
}

module.exports.update = async function(request,response)
{
  // if(request.user.id == request.params.id)
  // {
  //   let user = await User.findByIdAndUpdate(request.params.id,request.body)
  //     return response.redirect('back');
  // }else
  // {
  //   request.flash('error','Uauthorized');
  //   return response.status(401).send('Unauthorized');
  // }

  if (request.user.id == request.params.id)
  {
    try {
      let user = await User.findById(request.params.id);
      User.uploadedavatar(request, response, function (err) {
        if (err) {
          console.log('Multer Error : ', err);
        }
        // console.log(request.file);
        user.name = request.body.name;
        user.email = request.body.email;

        if (request.file) { 

          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
          }
          //this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarpath + '/' + request.file.filename;
        }
        user.save();
        return response.redirect('back');
      })
      
    } catch (err) {
      request.flash('error', err);
      return response.redirect('back');
    }
    }
}


//render the sign in page 
module.exports.signUp = function(request,response){

  if(request.isAuthenticated())
  {
    return response.redirect('/users/profile')
  }
    return response.render('user_sign_up',{
      title:"Connectly | Sign Up"
    })
};

//render the sign up page
module.exports.signIn = function(request,response){

  if(request.isAuthenticated())
  {
    return response.redirect('/users/profile')
  }

  return response.render('user_sign_in',{
    title:"Connectly | Sign In"
  })
};


//get the sign up date
module.exports.create = function(request,response)
{
  if(request.body.password  != request.body.confirm_password)
  {
    return response.redirect('back');
  }
  User.findOne({email:request.body.email},function(err,user)
  {
    if(err)
    {
              console.log('error in finding user in signing up '); return; 
    }

    if(!user)
    {
      User.create(request.body,function(err,user)
      {
        if(err){
                  console.log('error in creating user while signing up '); return; 
               }

        return response.redirect('/users/sign-in');
      })
    }
    else
    {
      return response.redirect('back');
    }

  });
}

//get the sign in and create a session for the user
module.exports.createSession = function(request,response)
{
  request.flash('success', 'Logged-in Successfully!');
  return response.redirect('/');
}

module.exports.destroySession = function (request, response)
{
  request.logout(request.user, err => {
    if (err)
    {
    res.redirect("/");
    }
  });
  request.flash("success", "You have logged out!");
  return response.redirect('/');
};

