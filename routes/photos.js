const express             = require('express');
const route               = express.Router();
const mongoose            = require("mongoose");
const multer              = require("multer");
const crypto              = require("crypto");
const GridFsStorage       = require("multer-gridfs-storage");
const Grid                = require('gridfs-stream');
const path                = require("path");

const conn = mongoose.connection;

// ========== GRID FS ===================//

let gfs;
conn.once('open', function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    // all set!
  })

//   multer storage engine

const storage = new GridFsStorage({
    url: 'mongodb://localhost:27017/Traveller',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

// ============ My photos ===============//

route.get('/photos',isLoggedIn,(req,res)=>{
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
          res.render('photos', { files: false });
        } else {
          files.map(file => {
            if (
              file.contentType === 'image/jpeg' ||
              file.contentType === 'image/png'
            ) {
              file.isImage = true;
            } else {
              file.isImage = false;
            }
          });
          res.render('photos', { files: files });
        }
      });
});

route.post('/upload',upload.single('file'),(req,res)=>{
    res.redirect('/photos');
});


// @route GET /image/:filename
// @desc Display Image
route.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  });


// --------------middleware--------------//

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    else
    {
        req.flash("error","Please Login First");
        res.redirect("/login");
    }
}


module.exports = route;