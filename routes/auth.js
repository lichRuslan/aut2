// import { EHOSTUNREACH } from 'constants';
const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt-nodejs');
// const models = require('../models');

//POST auth
router.post('/register', (req,res)=>{
    console.log(req.body);
    res.json({
        ok: true

    });
});
module.exports = router;