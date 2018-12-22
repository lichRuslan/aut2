/* eslint-disable */
const express = require('express');
const router = express.Router();
const models = require('../models');
const TurndownService = require('turndown'); // нужен для формировки текого при записывании в базу (исключает теги)

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
// post add
router.post('/add', (req,res)=> {
    const title = req.body.title.trim().replace(/ +(?= )/g, '');
    const body = req.body.body;
    const turndownService = new TurndownService()
    if (!title || !body) {
        var fields = [];
        if (!title) fields.push('title');
        if (!body) fields.push('body');
     
        res.json({
          ok: false,
          error: 'Все поля должны быть заполнены!',
          fields: fields
        });
      } else if (title.length < 3 || title.length > 255) {
        res.json({
          ok: false,
          error: 'Длина заголовка должна быть от 3 до 255 символов!',
          fields: ['title']
        });
      } else if (body.length < 10) {
        res.json({
          ok: false,
          error: 'Длина текста должна быть от 10  символов!',
          fields: ['body']
        });
      } else{
        models.Post.create({
            title,
            body : turndownService.turndown(body)
        }).then(post => {
            console.log(post);
            res.json({
            ok: true
            });
        }).catch(err=> {
            console.log(err);
            res.json({
                ok: false 
            });
        });

           
      }
});



module.exports = router;