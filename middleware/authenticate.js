const jwt = require('jsonwebtoken')

const authenticate = (req,res,next) =>{
     try{
          const token = req.headers.authorization.split(' ')[0]
          const decode = jwt.verify(token,'secret')

          req.user = decode
          next()

     }catch(err){
          res.json({
               message : "Authentication Failed"
          })
     }
}

module.exports = authenticate