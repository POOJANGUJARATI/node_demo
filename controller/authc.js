const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Mongoose } = require('mongoose')

const register = (req, res) => {
     bcrypt.hash(req.body.password, 10, function (err, hashedpass) {
          if (err) {
               res.json({
                    error: err
               })
          }
          let user = new User({
               name: req.body.name,
               email: req.body.email,
               password: hashedpass,
               phone: req.body.phone
          })
          user.save().then(user => {
               res.json({
                    message: 'user added succesfully'
               })
          }).catch(error => {
               res.json({
                    message: 'Aww.. Somthing Goes Wrong'
               })
          })
     })
}

const login = (req, res) => {
     var username = req.body.username
     var password = req.body.password

     User.findOne({ $or: [{ email: username }, { phone: password }] }).then(user => {
          if (user) {
               bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                         res.json({
                              error: err,
                              // message :"password Does not match"
                         })
                    }
                    if (result) {
                         let token = jwt.sign({ name: user.name }, 'secret')
                         res.json({
                              message: "login Successfylly",
                              token
                         })
                    } else {
                         res.json({
                              message: "password does not match"
                         })
                    }
               })
          }
          else {
               res.json({
                    message: "invalid Credentials"
               })
          }
     })
}

module.exports = {
     register,
     login
}