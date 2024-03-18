const error = (err, req, res, next)=>{
    console.log(err.message)
    err.message = err.message || "Internal Server Error"

     return res.status(404).json({
        status: false,
        message: err.message
     })

}

module.exports = error