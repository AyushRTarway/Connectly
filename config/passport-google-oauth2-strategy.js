const passport = require('passport');
const googlestrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(
  new googlestrategy({
        clientID:
        "827698444591-8i5toalfnf0sb9i9m02on1dja9rb5i2j.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
  },
      
      function (accessToken, refreshToken, profile, done) {
          User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
              if (err) {
                  console.log('Error in google strategy-passport', err);
                  return;
              }
              console.log(profile);

              if (user) {
                  return done(null, user);
              } else {
                  User.create({
                      name: profile.name,
                      email: profile.emails[0].value,
                      password: crypto.randomBytes(20).toString('hex')
                  }, function (err, user) {
                      if (err) {
                          console.log('Error in creating user google strategy-passport', err);
                          return;
                      }
                      return done(null, user);
                    })
              }
          });
      }
  )
);


module.exports = passport;