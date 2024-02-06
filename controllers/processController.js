
const fs = require("fs");
const path = require("path");
const pathSample_1 = path.join(__dirname,'..','storage','sample1.csv');
const pathSample_2 = path.join(__dirname,'..','storage','sample2.csv');

exports.getProcessController = async (req, res, next)=>{
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

   

    //console.log(s1 +'...'+ s2);

    res.render('process',{
        title:'process', 
        sample1:s1, 
        sample2:s2});





}