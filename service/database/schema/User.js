const mongoose = require('mongoose')
const Scheme = mongoose.Schema
let ObjectId = Scheme.Types.ObjectId

const userSchema = new Schema({
    UserId: ObjectId,
    userName: {unique:true,type:String},
    password: String,
    createAt: {
        type:Date,
        Default:Date.now()
    },
    lastLoginAt: {
        type:Date,
        Default:Date.now()
    }
})

mongoose.model('User',userSchema)