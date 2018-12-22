/* eslint-disable */
const express = require('express');
const router = express.Router();
const models = require('../models');

/* */
router.get('/add', (req,res)=> {
    const id = req.session.userId;
    const login = req.session.userLogin;

    res.render('post/add', {
        user:{
        id,
        login
        }
    });

});



module.exports = router;