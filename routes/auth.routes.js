"use strict";
const {Router} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

// register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password, min symbols 6').isLength({min: 6})
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect email or password'});
        }

        const {email, password, nick} = req.body
        
        const auther = await User.findOne({email});
        
        if (auther) {
            return res.status(400).json({message: 'user already exist'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({email, password: hashedPassword, nick});

        await user.save();

        res.status(201).json({message: "User created"});
        res.redirect('/auth');

    }  catch(e) {
        res.status(500).json({ message: "Что-то пошло не так"});
    }  
});

router.post(
    '/login',
    [
        check('password', 'Incorrect password').exists()
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect email or password'});
        }

        const {email, password} = req.body;
        
        let user = await User.findOne({email});
        
        if (!user) {
            const nick = req.body.email;
            user = await User.findOne({nick});

            if (!user) {
                return res.status(500).json({message: 'User not finded'});
            }
        }

        const isCorrectPass = await bcrypt.compare(password, user.password);

        if (!isCorrectPass) {
            return res.status(400).json({message: "Wrong password"});
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get("jwtKutak"),
            { expiresIn: "1h"}
        )

        res.json({ token, userId: user.id});

    }  catch(e) {
        res.status(500).json({ message: "Что-то пошло не так"});
    }  
});

module.exports = router;