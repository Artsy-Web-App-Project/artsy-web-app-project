const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ['jpg', 'jpeg', 'png'],
    folder: 'atrsy-web-app-project' // The name of the folder in cloudinary
  }
});

function uploadFile(req, res, next) {
  const upload = multer({ storage }).single('art-image');

  upload(req, res, function (err) {
      if (err) {
          // An unknown error occurred when uploading.
          return res.status(400).render("arts/art-create", {
            errorMessage:  "An error occurred while uploading your image. Check your file format and size. Only jpeg, jpg and png formats allowed."
          });
      }
      // Everything went fine. 
      next()
  })
};

module.exports = uploadFile;
