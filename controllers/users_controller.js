 module.exports.profile = function(request,response){
   //  response.end("<h1>User Profile</h1>")
   return response.render('users',{
      title:"Ayush"
  });
 }


//render the sign in page 
module.exports.signUp = function(request,response){
    return response.render('user_sign_up',{
      title:"Codeial | Sign Up"
    })
};

//render the sign up page
module.exports.signIn = function(request,response){
  return response.render('user_sign_in',{
    title:"Codeial | Sign In"
  })
};


//get the sign up date
module.exports.create = function(request,response){
  //tdo later
}

//get the sign in and create a session for the user
module.exports.createSession = function(request,response){
  //tdo later
}