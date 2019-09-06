const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
    try {
        const foundUser = await User.findOne({username: req.body.username});
        console.log(foundUser, '<--found User');
    
        if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.userId = foundUser._id;
                req.session.username = foundUser.username;
                req.session.logged = true;
                
                // res.redirect('/users')
                res.json({
                    success: true,
                    user: foundUser
                })
            } else {
                req.session.message = "Username or Password incorrect, try again!"
                res.redirect('/');
            }
        } else {
            req.session.message = 'Username or Password incorrect, try again?';
            res.redirect('/')
        }
    } catch(err){
        res.send(err);
    }
}),

router.post ('/register', async (req, res) => {
    const password = req.body.password;
    
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    req.body.password = hashPassword;
    try {
        const createUser = await User.create(req.body);
        console.log(createUser, '<--createUser');

        req.session.userId = createUser._id;
        req.session.username = createUser.username;
        req.session.logged = true;

        res.json({
            success: true,
            user:createUser
        })
    }catch (err) {
        res.send(err)
    }
}),

router.get('/logout', (req, res) => {
    
    req.session.destroy((err) => {
        if(err){
            res.send(err);
        } else {
            res.redirect('/');
        }
    })
}),

router.get('/', async (req, res) => {
    console.log(req.body, '<-Req.body in the get / route')
    try {
        const allUsers = await User.find();
        console.log(allUsers, "<--all users in get / route")
        res.json({
            status: {
                code: 200,
                message: "Success"
            },
            data: allUsers
        });
    } catch (err){
        res.send(err)
        console.log(err, "<-err in get route")
    }
})

module.exports = router;