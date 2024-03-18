const collectionSchema = require("../model/collectionSchema")
const jwt = require("jsonwebtoken")

const isAuth = async(req, res, next)=>{

    const { token } = req.cookies;

    if(!token){
        return res.status(404).json({
            status: false,
            message: 'Login first.'
        }) 
    }
    
    const decoded = jwt.verify(token, process.env.jwtToken)

    req.user = await collectionSchema.findById(decoded._id)

    next();

}

module.exports = isAuth