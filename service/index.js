const Koa = require('koa')
const mongoose = require('mongoose')
const Router = require('koa-router')
const bodyParse = require('koa-bodyparser')
const { connect, initSchemas } = require('./database/init.js')
const cors = require('koa2-cors')
const app = new Koa()

//用于接收前端请求
app.use(bodyParse())

//用于跨域
app.use(cors())

let user = require('./controller/user.js')
let router = new Router()

//装在user下所有子路由
router.use('/user',user.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

//自执行函数
;(async ()=>{

    await connect();
    initSchemas();

    // const User = mongoose.model('User');
    // let oneUser = new User({
    //     userName:'xiaokun',
    //     password:'123456'
    // })

    // //插入数据
    // oneUser.save().then(()=>{
    //     console.log('---------------数据插入成功---------------');
    // })

    //查询
    // let  users = await  User.findOne({}).exec()
    // console.log('------------------')
    // console.log(users)
    // console.log('------------------')

})()

app.use(async(ctx)=>{
    ctx.body='<h3>koa2.</h3>'
})

app.listen(3000,()=>{
    console.log('[Server] is starting at port 3000.');
})
