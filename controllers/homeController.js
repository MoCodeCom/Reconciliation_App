
const items = require('../models/db');

/*---------------------------------------------*/

exports.getHomeController = (req, res, next)=>{
    //console.log(req.body.title);
    res.render('home',{title:'Home'});
}

exports.postData = (req, res, next)=>{

    
    const ref = req.body.refInput;
    const amount = req.body.amountInput;
    const ref3 = req.body.ref3Input;
    const amount3 = req.body.amount3Input;

    
    const saveDb = new items(ref, amount, ref3, amount3);
    saveDb.save()
    .then(()=>{
       res.redirect('/data');
       //res.render('/data',{title:'data'})
    })
    .catch(err => console.log(err));
}

