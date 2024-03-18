const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title : {
        type : 'String',
        required : true
    },

    description : {
        type : 'String',
        required : true
    },

    isCompleted : {
        type : 'Boolean',
        default : false
    },

    user : {
       type : mongoose.Schema.Types.ObjectId,
       ref : 'User',
       required : true
    },

    createdAt : {
        type : 'Date',
        default : new Date()
    }


})

module.exports = mongoose.model('Task', taskSchema)