const jwt = require("jsonwebtoken")
require("dotenv").config();


const generateToken = (user, res, message, status=200) => {

    const token = jwt.sign({_id: user._id}, process.env.jwtToken)

    res.status(status).cookie("token", token, { 
        httpOnly : true,
        maxAge : 15*60*1000, 
        SameSite: process.env.node_env==="development"? "Lex": "None",
        secure : process.env.node_env==="development"? false: true
    }).json({
        status : true,
        message : message
    })
}

module.exports = generateToken