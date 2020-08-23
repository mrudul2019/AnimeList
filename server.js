if(process.env.NODE_ENV!='production'){
    require('dotenv').config();
} 

const express = require('express');
const mongoose = require('mongoose');
const app= express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routers/index');

app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');

app.use(express.static('public'));
app.use(expressLayouts);

mongoose.connect(process.env.connURL);
const db = mongoose.connection;
db.on('error',(error)=>console.log('couldnt connect with database'),{useNewUrlParser : true});
db.once('open',()=>console.log("connected to mongodb"))
 
app.get('/',indexRouter);

app.listen(process.env.PORT || 3000);