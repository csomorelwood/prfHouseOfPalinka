const router = require('express').Router();
const passport = require('passport');
const fs = require('fs');
const mongoose = require('mongoose');
const userModel = mongoose.model('user');
const palinkaModel = mongoose.model('palinka');
const palinkaTipusModel = mongoose.model('palinkatipusok');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const key = 'eznembiztonsagos'

/******************************************************************************************************************************
 * 
 * Userhez tartozó route-ok
 * 
 * ***************************************************************************************************************************/

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
                        username: user.username,
                        role: user.role
                    }
                    jwt.sign(payload,key,{ 
                        expiresIn: 604800 
                    }, (err, token) => {
                        res.status(200).json({
                            msg: "Sikeres bejelentkezés",
                            token: `Bearer ${token}`,
                            id: user._id,
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
        _id=new mongoose.Types.ObjectId(),
        username,
        password,
        role
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
        _id,
        username,
        password,
        role
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

router.get('/listusers', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let hehearr = []
    userModel.find({}, (err, memes) => {
        memes.forEach((meme) => {
          hehearr.push(meme);
        });
      }).then( () => {
        return res.json({
            users: hehearr
        })
      });
})
/*
router.post('/deleteusers', (req,res) => {
    userModel.deleteMany({},function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
})*/

/******************************************************************************************************************************
 * 
 * Pálinkákhoz tartozó route-ok
 * 
 * ***************************************************************************************************************************/

router.post('/addpalinka',(req, res) => {
    let {
        _id=new mongoose.Types.ObjectId(),
        owner,
        startBrew,
        endBrew,
        name,
        type,
        ingredients,
        quantity
    } = req.body
    let newPalinka = new palinkaModel({
        _id,
        owner,
        startBrew,
        endBrew,
        name,
        type,
        ingredients,
        quantity
    })
    newPalinka.save().then(palinka => {
        return res.status(201).json({
            msg: "Pálinka létrehozva",
            success: true
        })
    })
});

router.get('/listpalinka', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let hehearr = []
    palinkaModel.find({}, (err, memes) => {
        memes.forEach((meme) => {
          hehearr.push(meme);
        });
      }).then( () => {
        return res.json({
            palinkak: hehearr
        })
      });
})

router.get('/brewing', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let hehearr = [];
    let date = new Date();
    palinkaModel.find({startBrew: {$lte: date.getDate()}, endBrew: {$gte: date.getDate()}}, (err, memes) => {
        memes.forEach((meme) => {
          hehearr.push(meme);
        });
      }).then( () => {
        return res.json({
            palinkak: hehearr
        })
      });
})

/******************************************************************************************************************************
 * 
 * Pálinkatípusokhoz tartozó route-ok
 * 
 * ***************************************************************************************************************************/

router.post('/addpalinkatipus',(req, res) => {
    let {
        _id=new mongoose.Types.ObjectId(),
        tipus
    } = req.body
    let newPalinkaT = new palinkaTipusModel({
        _id,
        tipus
    })
    newPalinkaT.save().then(palinka => {
        return res.status(201).json({
            msg: "Pálinkatípus létrehozva",
            success: true
        })
    })
});

router.get('/listpalinkatipus', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let hehearr = []
    palinkaTipusModel.find({}, (err, memes) => {
        memes.forEach((meme) => {
          hehearr.push(meme);
        });
      }).then( () => {
        return res.json({
            palinkatipusok: hehearr
        })
      });
})

module.exports = router;