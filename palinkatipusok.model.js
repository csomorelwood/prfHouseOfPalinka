const mongoose = require('mongoose');

const palinkaTSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tipus:{type:String, required:true, unique:true}
});


mongoose.model('palinkatipusok', palinkaTSchema);