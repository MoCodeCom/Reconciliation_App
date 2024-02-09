const mysql = require('mysql2');
const csvtojson = require('csvtojson');
const path = require('path');
const fileName = path.join(__dirname,'..','storage','sample1.csv');


let con = mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3307,
    database:'appcompare',
    password:'198219'
});

// connection database mysql and greate table

con.connect((err)=>{
    if(err) return console.error(
        'error: ' + err.message
    );

    con.query("DROP TABLE sample", (err, drop)=>{
        var createStatement = "CREATE TABLE sample (Ref CHAR(50), Amount VARCHAR(11), ref3 CHAR(50), Amount3 VARCHAR(11))";

        con.query(createStatement, (err, drop)=>{
          
            if(err){
                console.log("ERROR: ",err);
            }else{
                con.destroy();
            }
        })


    })
});

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    port:3307,
    database:'appcompare',
    password:'MJm198219##'
});

csvtojson().fromFile(fileName).then(
    source =>{
        for(var i = 0; i < source.length; i++){
            var ref = source[i]["ref"],
                amount = source[i]["amount"],
                ref3 = source[i]["ref3"],
                amount3 = source[i]["amount3"];

            var insertStatement = `INSERT INTO sample (ref,amount,ref3,amount3) VALUES (?,?,?,?)`;
            var items = [ref, amount, ref3, amount3];
            /*
            con.query(insertStatement, items, (err,resulte, fields)=>{
                if(err){
                    console.log("Unable to insert item at row ", i + 1);
                    return console.log(err);
                }
            });*/

            pool.execute(insertStatement, items);
        }
        console.log("All items stored into database successfully ...");
    }
);



module.exports = pool; //call it in index
