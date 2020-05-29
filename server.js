const express = require("express")
const passport = require("passport")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require('path')

const app = express()

const mongoURL = 'mongodb://localhost:27017'

require("./user.model")
require("./palinka.model")
require("./palinkatipusok.model")

app.use(bodyparser.urlencoded({extended:false}))

app.use(bodyparser.json())

app.use(cors())

app.use(express.static(path.join(__dirname,'public')))

app.use(passport.initialize());

require('./config/passport')(passport);

mongoose.connect(mongoURL,{
  useNewUrlParser:true
}).then(()=>{
  console.log("Sikeres db connect")
}).catch(err => {
  console.log("Sikertelen db connect")
});

app.use('/', require('./routes'));

app.listen(3000, () => {
  console.log('the server is running');
});

// node server.js runs the project