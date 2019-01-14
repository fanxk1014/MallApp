const mongoose = require('mongoose')
const fs = require('fs')
const Router = require('koa-router')
let router = new Router()

router.get('/insertAllGoodsInfo',async(ctx)=>{

    fs.readFile('../data_json/newGoods.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods');
        data.map((value,index)=>{
            console.log(value);
            let newGoods = Goods(value);
            await newGoods.save().then(()=>{
                saveCount++;
                console.log('成功'+saveCount);
            }).catch(error=>{
                console.log('失败'+saveCount);
            })
        });
        ctx.body='开始导入数据';
    })

})

module.exports=router