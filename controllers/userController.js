const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
    try {
        const foundUser = await User.findOne({username: req.body.username});
        console.log(foundUser, '<--found User');
        console.log(req.body.password, '<--req.body.password')
    
        if(foundUser){
            console.log('past foundUser')
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                console.log('past bcrypt')
                // req.session.userId = foundUser._id;
                // req.session.username = foundUser.username;
                // req.session.logged = true;
                
                // res.redirect('/users')
                res.json({
                    success: true,
                    user: foundUser
                })
            } else {
                console.log('else 1');
                req.session.message = "Username or Password incorrect, try again!"
                res.redirect('/');
            }
        } else {
            console.log('else 1');
            req.session.message = 'Username or Password incorrect, try again?';
            res.redirect('/')
        }
    } catch(err){
        res.send(err);
    }
}),

router.post ('/register', async (req, res) => {
    const password = req.body.password;
    console.log(password, "<--password before hash")
    
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    console.log(hashPassword, "<--password after hashing");
    req.body.password = hashPassword;
    try {
        const createUser = await User.create(req.body);
        console.log(createUser, '<--createUser');

        // req.session.userId = createUser._id;
        // req.session.username = createUser.username;
        // req.session.logged = true;

        res.json({
            success: true,
            user:createUser
        })
    }catch (err) {
        res.send(err)
    }
})

module.exports = router;