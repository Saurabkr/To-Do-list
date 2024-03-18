const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true,
        select : false
    },

    createdAt : {
        type : 'Date',
        default : new Date()
    }
})

module.exports = mongoose.model("User", collectionSchema)