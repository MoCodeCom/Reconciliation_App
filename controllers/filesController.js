const fs = require("fs");
const path = require("path");
const pathSample_1 = path.join(__dirname,'..','storage','sample1.csv');
const pathSample_2 = path.join(__dirname,'..','storage','sample2.csv');
//const con = require('../util/newrTable');
const dataCon = require('../models/upload');
const db = require('../models/db');
const { stat } = require("fs/promises");

exports.getFilesController = (req, res, next)=>{
    let f1=true;
    let f2=true;

    try{
        fs.accessSync(pathSample_1, fs.constants.F_OK);
        try{
            fs.accessSync(pathSample_2, fs.constants.F_OK);
           }catch(err){
            if(err.code === 'ENOENT'){
                f2 = false;
            }else{
                console.error('error occured !!');
            }
           }
       }catch(err){
        if(err.code === 'ENOENT'){
            f1 = false;
            try{
                fs.accessSync(pathSample_2, fs.constants.F_OK);
            }catch(err){
                if(err.code === 'ENOENT'){
                    s2 = false;
                }else{
                    console.error('error occured !!');
                }
               }
        }else{
            console.error('error occured !!');
        }
       }

       
    res.render('files',{title:'files', ExistFile1: f1, ExistFile2:f2});
}

exports.postFilesController = (req, res, next)=>{

    dataCon.dropTable()
    .then(()=>{
        dataCon.creatTable()
        .then(()=>{
            dataCon.uploadData()
            .then(()=>{
                dataCon.uploadData3();
                
            }).then(()=>{
                dataCon.uploadDataJust3();
                
              }).then(()=>{
                res.render('files',{
                    title:'files', 
                    db_process:true,
                    ExistFile1: true, 
                    ExistFile2:true});
            
    });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err)); 
}

exports.postCsvFile = (req, res, next)=>{
    
    let s1 = true;
    let s2 = true;

   try{
    fs.accessSync(pathSample_1, fs.constants.F_OK);
    try{
        fs.accessSync(pathSample_2, fs.constants.F_OK);
       }catch(err){
        if(err.code === 'ENOENT'){
            s2 = false;
        }else{
            console.error('error occured !!');
        }
       }
   }catch(err){
    if(err.code === 'ENOENT'){
        s1 = false;
        try{
            fs.accessSync(pathSample_2, fs.constants.F_OK);
        }catch(err){
            if(err.code === 'ENOENT'){
                s2 = false;
            }else{
                console.error('error occured !!');
            }
           }
    }else{
        console.error('error occured !!');
    }
   }

    res.render('process',{
        title:'process',
        sample1:s1,
        sample2:s2
    });

}

exports.postReco = (req, res, next)=>{
    dataCon.reco();
    db.fetchAllNoMatch()
    .then(([rows, filedData])=>{
        res.render('data',{
            title:'Data',
            prods:rows,
            path:'/data'
        });
    })
    .catch(err => console.log(err));
    
}

