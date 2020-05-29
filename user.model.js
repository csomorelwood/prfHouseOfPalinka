const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String}
});


mongoose.model('user', userSchema);