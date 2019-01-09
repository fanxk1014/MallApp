const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
    UserId: ObjectId,
    userName: {
        unique:true,
        type:String
    },
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

//发布模型
mongoose.model('User',userSchema)