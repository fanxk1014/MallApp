const mongoose = require('mongoose')
const Router = require ('koa-router')
let router = new Router()

router.get('/',async(ctx)=>{
    ctx.body="这是用户user操作首页"
})

//注册接口
router.post('/register',async(ctx)=>{
    //取得Model
    const User = mongoose.model('User')
    //把从前端接收的POST数据封装成一个新的user对象
    let newUser = new User(ctx.request.body)
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save().then(()=>{
        //成功返回code=200，并返回成功信息
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(error=>{
         //失败返回code=500，并返回错误信息
        ctx.body={
            code:500,
            message:error
        }
    })
})

//登陆接口
router.post('/login',async(ctx)=>{
    //得到前端传的数据
    let loginUser = ctx.request.body;
    console.log(loginUser);
    let userName = loginUser.userName;
    let password = loginUser.password;

    const User = mongoose.model('User');
    await User.findOne({userName:userName}).exec().then(async(result)=>{
        console.log(result);
        if(result){
            //当用户名存在时，开始比对密码
            let newUser = new User();
            await newUser.comparePassword(password,result.password).then((isMatch)=>{
                if(isMatch) ctx.body = {code:200,status:isMatch,message:'登陆成功'}
                else ctx.body = {code:200,status:false,message:'密码错误'}
            }).catch(error=>{
                console.log(error);
                ctx.body = {
                    code:500,
                    message:'密码错误'
                }
            })
        }else{
            ctx.body = {
                code:200,
                message:'用户名不存在'
            }
        }
    }).catch(error=>{
        console.log(error);
        ctx.body = {
            code:500,
            message:error
        }
    })
})

module.exports=router;