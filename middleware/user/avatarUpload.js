// internal imports
const uploader = require("../../utils/singleUpload");

function avatarUpload(req, res, next) {
  let upload = uploader("avatars", 10000, [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ]);

  // call middle ware function
  upload.single("avatar")(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = { avatarUpload };
