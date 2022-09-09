// external imports
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal imports
const User = require("../models/userModel");

// control authentication
const authControl = {
  // register user
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;

      // username replace
      const newUsername = username.replace(/ /g, "");

      // check username in database
      const check_username = await User.findOne({ username: newUsername });
      if (check_username) {
        res.status(500).json({
          errors: {
            username: {
              msg: "This user name already exists.",
            },
          },
        });
      }

      // check email in database
      const check_email = await User.findOne({ email: email });
      if (check_email) {
        res.status(500).json({
          errors: {
            email: {
              msg: "This email already exists.",
            },
          },
        });
      }

      // salt password to hashed password
      const hashedPass = await bcrypt.hash(password, 12);

      // new user object
      const newUser = await User({
        fullname,
        username: newUsername,
        email,
        password: hashedPass,
        gender,
      });

      // create json web token using JWT
      const token = await jwt.sign(
        { username: newUser.username },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRY,
        }
      );

      // save token in browser cookie
      res.cookie(process.env.COOKIE_NAME, token, {
        maxAge: process.env.JWT_EXPIRY,
        httpOnly: true,
        signed: true,
      });

      // save user
      await newUser.save();

      res.json({
        msg: "register successful",
        token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  },


  // login user
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // check username
      const checked_user = await User.findOne({
        $or: [{ username: username }, { email: username }],
      }).populate(
        "followers following",
        "avatar username fullname followers following"
      );

      if (checked_user) {
        // check password
        const validPass = await bcrypt.compare(password, checked_user.password);

        if (validPass) {
          // create token
          const token = await jwt.sign(
            { username: checked_user.username },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.JWT_EXPIRY,
            }
          );

          // save token in cookie
          res.cookie(process.env.COOKIE_NAME, token, {
            maxAge: process.env.JWT_EXPIRY,
            httpOnly: true,
            signed: true,
          });

          // send success message
          res.json({
            msg: "Successfully login",
            token,
            user: {
              ...checked_user._doc,
              password: "",
            },
          });
        } else {
          res.status(500).json({
            errors: {
              password: {
                msg: "incorrect password",
              },
            },
          });
        }
      } else {
        res.status(500).json({
          errors: {
            username: {
              msg: "This username or email is not valid",
            },
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  },

  
  // logout user
  logout: (req, res) => {
    try {
      res.clearCookie(process.env.COOKIE_NAME);
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: "Logout failed please try again!",
          },
        },
      });
    }
  },
};

// export module
module.exports = authControl;
