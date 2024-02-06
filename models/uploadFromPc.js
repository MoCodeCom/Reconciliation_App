const multer = require("multer"); // module to read uploaded file...



module.exports = class upload{
    uploadFunction(){
        var storage = multer.diskStorage({
            destination: function(requst, file, callback){
                callback(null, '../storage');
            },
        
            filename: function(requst, file, callback) {
                callback(null,file.originalname)
            }
        });
        
        return multer({storage:storage});
    }
}

