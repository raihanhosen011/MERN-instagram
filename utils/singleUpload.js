// external imports
const multer = require("multer");
const path = require("path");

// set single uploader function
function singleUpload({ subFolderName, fileSize, allowed_file_types }) {
  // filename
  const filename = `./public/uploads/${subFolderName}`;

  // storage object
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, filename);
    },
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, "avatar" + "-" + uniqueSuffix + extname);
    },
  });

  // Prepare for final upload object
  const upload = multer({
    storage,
    limits: {
      fileSize: fileSize,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.include(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });

  return upload;
}

// export module
module.exports = singleUpload;
