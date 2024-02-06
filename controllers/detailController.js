const item = require('../models/db');

exports.getDetailController = (req, res, next)=>{
    const id = req.params.id;
   
    item.fetchById(id)
    .then((result)=>{

        res.render('detail',{
            item:result[0],
            title:'detail'
        });
    })
    .catch(err => console.log(err));
    
}