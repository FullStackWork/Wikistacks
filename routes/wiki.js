const express = require('express');
const wikiRouter = express.Router();

const { Page, User } = require('/Users/rohan/WikiStack/models');

const addPage = require('/Users/rohan/WikiStack/views/addPage.js');

wikiRouter
    .get('/', function(req, res){
        res.send('Hello from wikiRouter GET')
    }).post('/', async function(req, res){
        const name  = req.body.authorName;
        const email = req.body.authorEmail;
        const title = req.body.title;
        const content = req.body.pageContent;
        const status = req.body.statusInput;

        try{
            const page = await Page.create({
                title: title,
                content: content,
                status: status
            });

            const user = await User.create({
                name: name,
                email: email
            });
            res.send('Form submitted');
        }catch(error){
            console.log(error)
        }

        res.send('Form submitted');
    
    
    
    })

wikiRouter.get('/add', function(req, res){
    res.send(addPage());
})


module.exports = wikiRouter;