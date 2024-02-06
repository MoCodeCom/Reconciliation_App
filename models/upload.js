const pool = require('../util/database');
const mysql = require('mysql2');
const csvtojson = require('csvtojson');
const path = require('path');
const fileName = path.join(__dirname,'..','storage','sample1.csv');
const fileName3 = path.join(__dirname,'..','storage','sample2.csv');

module.exports = class DB{

    static dropTable(){
        return pool.query("DROP TABLE sample");
    }

    static creatTable(){
        //return pool.query("CREATE TABLE sample (Ref CHAR(50), Amount VARCHAR(11), ref3 CHAR(50), Amount3 VARCHAR(11))");
        const q = "CREATE TABLE sample (id INT UNSIGNED NOT NULL AUTO_INCREMENT,ref VARCHAR(45) NULL, amount VARCHAR(45) NULL,ref3 VARCHAR(45) NULL,amount3 VARCHAR(45) NULL,deference VARCHAR(45) NULL,PRIMARY KEY (id), UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE)";
        //var q = "CREATE TABLE sample (id INT UNSIGNED NOT NULL AUTO_INCREMENT, ref VARCHAR(45) NULL, amount VARCHAR(45) NULL, ref3 VARCHAR(45) NULL, amount3 VARCHAR(45) NULL, deference VARCHAR(45) NULL, index VARCHAR(45) NULL, PRIMARY KEY (id), UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);"
        return pool.query(q);
    }

    static uploadData(){
        return csvtojson().fromFile(fileName).then(source=>{
            for(var i = 0; i < source.length; i++){
                var ref = source[i]["ref"],
                    amount = source[i]["amount"];
                    
    
                var insertStatement = `INSERT INTO sample (ref,amount) VALUES (?,?)`;
                var items = [ref, amount];

                pool.query(insertStatement, items);
            }
            console.log("All items stored into database successfully for sample 1...");
            
        });
    }



    static uploadData3(){
        return csvtojson().fromFile(fileName3).then(source=>{
            for(var i = 0; i < source.length; i++){
                var ref3 = source[i]["ref"],
                    amount3 = source[i]["amount"];
    
                var insertStatement = `UPDATE sample SET ref3 = "${ref3}", amount3 = "${amount3}" WHERE ref = "${ref3}"`;

                pool.query(insertStatement);
            }
            console.log("All items stored into database successfully for sample 2 ...");
            
        });
    }

    static reco(){
        //const q = "UPDATE sample SET deference = WHEN amount3 = amount THEN 'yes' ELSE 'no' END WEHRE deference IS NULL";
        //const q = "UPDATE sample SET deference = true WHEN amount = amount3"
        const q1 = "SET SQL_SAFE_UPDATES = 0";
        const q2 = "UPDATE appcompare.sample SET deference = CASE WHEN amount = amount3 THEN 'MATCH' ELSE 'NO' END WHERE deference IS NULL";
        const q3 = "SET SQL_SAFE_UPDATES = 1";

        pool.query(q1);
        pool.query(q2);
        return pool.query(q3);
    }


}




