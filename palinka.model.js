const mongoose = require('mongoose');

const palinkaSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  startBrew: {type:Date},
  endBrew: {type:Date},
  name: {type:String,required:true},
  type: {type: mongoose.Schema.Types.ObjectId, ref: 'palinkatipus'},
  ingredients: [{type:String,required:true}],
  quantity:{type:Number}
});


mongoose.model('palinka', palinkaSchema);