const Koa = require('koa')
const app = new Koa()
const { connect } = require('./database/init.js')

;(async ()=>{
    await connect()
})()

app.use(async(ctx)=>{
    ctx.body='<h3>koa2.</h3>'
})

app.listen(3000,()=>{
    console.log('[Server] is starting at port 3000.');
})
