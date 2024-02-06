const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//const uploadFromPc = require("./models/uploadFromPc");
const multer = require("multer"); // module to read uploaded file...

const fs = require('fs').promises;

//************************************************//

const homePg = require("./router/home");
const dataPg = require("./router/data");
const detailPg = require("./router/detail");
const filesPg = require("./router/files");
const processPg = require("./router/process");

//----------------- Database ----------------------//

const db = require('./util/database'); // Not use in [index.js] / used in [models/db.js]

//-------------------------------------------------//

var storage = multer.diskStorage({
    destination: function(requst, file, callback){
        callback(null, './storage/');
    },

    filename: function(requst, file, callback) {
        callback(null,file.originalname)
    }
    
});

var store = multer({storage:storage});;

//--------------------------------------------------//

const app = express();
app.set('view engine','ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(store.single('csvfile'));
/************************ Delete files in file page *********************/
app.delete('/files',(req,res)=>{
    const filepath_sample1 = path.join(__dirname,'.','storage','sample1.csv');
    const filepath_sample2 = path.join(__dirname,'.','storage','sample2.csv');

            fs.unlink(filepath_sample1, err =>{

                if(err){
                    console.log('file not exist');
                   // res.status(500).send('false');
                }else{
                    res.send({sample1:'Deleted'})
                    res.send('true');
                }
            }).then(()=>{
                fs.unlink(filepath_sample2, err=>{
        
                    if(err){
                        res.status(500).send('false');
                    }else{
                        res.send({sample2:'Deleted'});
                        res.send('true');
                    }
                })
            });
});




//--------------------------------------------------//

app.use(homePg);
app.use(dataPg);
app.use(detailPg);
app.use(filesPg);
app.use(processPg);

/*----------------------using db ----------------------*/
/*

//***************************************************/
app.listen(3000);

