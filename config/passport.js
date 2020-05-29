const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const key = 'eznembiztonsagos'
const mongoose = require("mongoose")
const userModel = mongoose.model("user")

const opts={}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      userModel.findOne({
        username: jwt_payload.username
      }).then(user => {
        if(user) return done(null, user);
        else return done(null, false);
      }).catch(err => {
        return done(err, false);
      })
    })
  )
};