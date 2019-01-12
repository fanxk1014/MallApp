const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

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
},{
    collection:'user'
})

userSchema.pre('save', function(next){
    //密码bcrypt加盐加密
    bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt, (err,hash)=>{
            if(err) return next(err)
            this.password = hash;
            next();
        }) 
    })
})

//在实例方法里，增加密码比对方法
userSchema.methods = {
    /**
     * 登录密码比对
     * _password:前端输入的密码
     * password:数据库查出的密码
     *  */
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            //bcrypt提供了比对方法
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}

//发布模型
mongoose.model('User',userSchema)