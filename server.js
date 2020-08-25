if(process.env.NODE_ENV!='production'){
    require('dotenv').config();
} 

const express = require('express');
const mongoose = require('mongoose');
const app= express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routers/index');
const authorRouter = require('./routers/authors');
const bodyParser = require('body-parser');

app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');

app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({limit : "10mb" , extended: 'false'}));

mongoose.connect(process.env.connURL,{useNewUrlParser : true});
const db = mongoose.connection;
db.on('error',(error)=>console.log('couldnt connect with database'));
db.once('open',()=>console.log("connected to mongodb"))
 
app.use('/',indexRouter);
app.use('/authors',authorRouter);

app.listen(process.env.PORT || 3000);