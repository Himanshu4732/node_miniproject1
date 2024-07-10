const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));


app.get('/',function(req,res){
    fs.readdir(`./files`, function(err,files){
        if(err) console.log(err);
        res.render("index", {files: files});
})
})
app.get('/files/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8" , function(err,fileData){
        res.render("show",{fileData:fileData ,filename:req.params.filename});
    })
})
app.get('/update/:filename',function(req,res){
    
})


app.post('/create',function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.detail, function(err){
        res.redirect('/');
    })

    })

app.listen(3000)