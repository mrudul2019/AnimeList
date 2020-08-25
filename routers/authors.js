const express=require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/',async(req,res)=>{
    let searchExp = {};
    try{
        if(req.query==null || req.query.name=='');
        else searchExp.name = new RegExp(req.query.name,'i');
        const authors= await Author.find(searchExp);
        res.render('authors/author',{authors : authors,search :req.query });
    }
    catch(err){
        console.log(err);
    }
    
    


});
router.get('/new',(req,res)=>{
    res.render('authors/new',{author: new Author() });
});
router.post('/',(req,res)=>{
    const author = new Author({
        name: req.body.name,
    });
    console.log('saving...');
    author.save((err,newAuthor)=>{
        console.log('saving...');
        if(err){

            res.render('authors/new',{
                author:author,
                errormsg:"Something went wrong :("
            })
        }else{
            // res.redirect(`authors/${newAuthor.id}`);
            res.redirect(`authors/`);
            // res.send('hi');
        }
    })
    // res.send(req.body.name);
})
module.exports = router; 