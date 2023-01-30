const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserDB = require("../models/user");
const dotenv = require("dotenv").config();

// set up options
let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
opts.issuer = "accounts.examplesoft.com";
opts.audience = "yoursite.net";

// authentication done here
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      //finding user
      let user = await UserDB.findById(jwt_payload.sub);
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (err) {
      console.log(err);
      return done(err);
    }
  })
);

module.exports = passport;
