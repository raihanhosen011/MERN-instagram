// external imports
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

// auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    // CHECK TOKEN
    if (!token) {
      res.status(500).json({
        errors: {
          common: {
            msg: "Invalid authentication",
          },
        },
      });
    }

    // VERIFY TOKEN WITH JWT
    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      res.status(500).json({
        errors: {
          common: {
            msg: "Invalid authentication",
          },
        },
      });
    }

    // FIND USER USING VERIFIED TOKEN
    const user = await User.findOne({ username: verified.username });

    // SAVE USER IN REQUEST
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

module.exports = { auth };
