const router = require('express').Router();
const passport = require('passport');
const fs = require('fs');
const mongoose = require('mongoose');
const userModel = mongoose.model('user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const key = 'eznembiztonsagos'

router.post('/login', (req, res) => {
    if(req.body.username && req.body.password) {
        userModel.findOne({
            username: req.body.username
        }).then(user => {
            if(!user) {
                return res.status(404).json({
                    msg: "Felhasználónév hiányzik",
                    success: false
                })
            }
            bcrypt.compare(req.body.password, user.password).then(isMatch => {
                if(isMatch){
                    const payload = {
                        username: user.username
                    }
                    jwt.sign(payload,key,{ 
                        expiresIn: 604800 
                    }, (err, token) => {
                        res.status(200).json({
                            msg: "Sikeres bejelentkezés",
                            token: `Bearer ${token}`,
                            success: true
                        })
                    })
                } else {
                    return res.status(404).json({
                        msg: "Hibás jelszó",
                        success: false
                    })
                }
            })
        })
    } else {
        res.status(400).json({msg: "Hiányzó felhasználónév vagy jelszó"});
    }
});

router.post('/register',(req, res) => {
    let {
        username,
        password
    } = req.body
    userModel.findOne({
        username: username
    }).then(user => {
        if(user){
            return res.status(400).json({
                msg: "A felhasználónév már létezik"
            })
        }
    })
    let newUser = new userModel({
        username,
        password
    })
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) return res.status(500).json({msg: "Elsóztad...: ".error});
            newUser.password = hash
            newUser.save().then(user => {
                return res.status(201).json({
                    msg: "Felhasználó létrehozva",
                    success: true
                })
            })
        })
    })
});

router.get('/list', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    })
})

module.exports = router;