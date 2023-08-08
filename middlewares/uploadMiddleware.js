const multer = require('multer');

// Configure storage and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Adjust the destination folder as needed
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg'); // Adjust the file naming convention
  },
});

// Apply the multer middleware
const upload = multer({ storage: storage });

module.exports = upload;
