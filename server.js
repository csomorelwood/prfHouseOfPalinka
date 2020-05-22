const express = require("express")
const passport = require("passport")
const expressSession = require("express-session")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const key = 'eznembiztonsagos'
const path = require('path')

const app = express()

const mongoURL = 'mongodb://localhost:27017'

require("./user.model")
const userModel = mongoose.model("user")

mongoose.connect(mongoURL)
mongoose.connection.on("connected",()=>{
  console.log("Sikeres db connect")
})
mongoose.connection.on("error",()=>{
  console.log("Sikertelen db connect")
})

app.use(bodyparser.json())

app.use(cors())

app.use(express.static(path.join(__dirname,'public')))

app.use(passport.initialize());

const opts={}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key

passport => passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    userModel.findById(jwt_payload._id).then(user => {
      if(user) return done(null, user)
      return done(null, false)
    }).catch(err => {
      console.log(err)
    })
  })
)

app.use(bodyparser.urlencoded({extended:false}))

app.use('/', require('./routes'));

app.listen(6666, () => {
  console.log('the server is running');
});

// node server.js runs the project