const mongoose = require('mongoose')

const connectMongoDB = (url)=>{
    return mongoose.connect(url,{
        dbName : 'backendapi'
        
    });
}

module.exports = connectMongoDB;