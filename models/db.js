const db = require('../util/database');

module.exports = class DB{
    constructor(ref, amount, ref3, amount3){
        
        this.ref = ref;
        this.amount = parseFloat(amount);
        this.ref3 = ref3;
        this.amount3 = parseFloat(amount3);

        //this.dropTbl();
    }

    dropTbl(){
        return db.query("DROP TABLE tbl_appdb");
    }

    //add and save data
    save(){
        
        
        //db.query("CREATE TABLE sample (ref CHAR(50), amount VARCHAR(11), ref3 CHAR(50), amount3 VARCHAR(11))");
        return db.execute(`INSERT INTO tbl_appdb (ref, amount, ref3, amount3) VALUES ('${this.ref}', '${this.amount}', '${this.ref3}', '${this.amount3}')`
        /*,[this.ref, this.amount, this.ref3, this.amount3]*/
        );
    }

    //delete data by id
    static deleteById(id){}

    //get all data
    static fetchAll(){
        return db.execute('SELECT * FROM sample');
    }

    //get all data no match
    static fetchAllNoMatch(){
        return db.execute('SELECT * FROM sample WHERE deference = "NO"');
    }

    //get data by id
    static fetchById(id){
        return db.execute('SELECT * FROM sample WHERE sample.id = ?',[id]);
    }

}