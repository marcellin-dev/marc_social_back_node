const userModel = require('../models/user.model');

const multer = require('multer');

   const path = require('path');
  

  let img = [];
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  'client/public/uploads/profil') // uploads/cni
    },
    filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])

            
            let name = file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0] ;
            img.push(name)
            
            // console.log(img)
            // req.locals.user = img
    }
});


const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
         
      } else {
          cb(null, false);
          const err = new Error('Only .png, .jpg and .jpeg format allowed!')
          err.name = 'ExtensionError'
          return cb(err);
      }
  },
})
.array('file', 1)
module.exports = upload ;
