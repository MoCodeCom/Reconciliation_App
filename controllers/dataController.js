const items = require('../models/db');

/*--------------------------------------------*/

exports.getDataController = (req, res, next)=>{
    items.fetchAll().then(([rows, filedData])=>{
        res.render('data',{
            title:'Data',
            prods:rows,
            path:'/data'
        });
    })
    .catch(err => console.log(err));
    /*
    items.fetchAllNoMatch()
    .then(([rows, filedData])=>{
        res.render('data',{
            title:'Data',
            prods:rows,
            path:'/data'
        });
    })
    .catch(err => console.log(err));*/
}