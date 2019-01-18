const mongoose = require('mongoose')
const fs = require('fs')
const Router = require('koa-router')
let router = new Router()

/**
 * 插入所有商品信息
 *  */
router.get('/insertAllGoodsInfo',async(ctx)=>{

    fs.readFile('./data_json/newGoods.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0;
        const Goods = mongoose.model('Goods');
        data.map((value,index)=>{
            console.log(value);
            let newGoods = Goods(value);
            newGoods.save().then(()=>{
                saveCount++;
                console.log('成功'+saveCount);
            }).catch(error=>{
                console.log('失败'+saveCount);
            })
        });
        ctx.body='开始导入数据';
    })

})

/**
 * 插入所有商品分类信息
 *  */
router.get('/insertAllCategoriesInfo',async(ctx)=>{

    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0;
        const Category = mongoose.model('Category');
        data.RECORDS.map((value,index)=>{
            console.log(value);
            let newCategory = Category(value);
            newCategory.save().then(()=>{
                saveCount++;
                console.log('成功'+saveCount);
            }).catch(error=>{
                console.log('失败'+saveCount);
            })
        });
        ctx.body='开始导入数据';
    })

})

/**
 * 插入所有商品子类信息
 *  */
router.get('/insertAllCategorySubInfo',async(ctx)=>{
    
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0;
        const CategorySub = mongoose.model('CategorySub');
        data.RECORDS.map((value,index)=>{
            console.log(value);
            let newCategorySub = CategorySub(value);
            newCategorySub.save().then(()=>{
                saveCount++;
                console.log('成功'+saveCount);
            }).catch(error=>{
                console.log('失败'+saveCount);
            })
        });
        ctx.body='开始导入数据';
    })

})

/**
 * 获取商品详情接口
 *  */
router.post('/getGoodsDetailInfo',async(ctx)=>{

    try{
        let goodsId = ctx.request.body.goodsId;
        const Goods = mongoose.model('Goods');
        let result = await Goods.findOne({ID:goodsId}).exec();
        ctx.body={
            code:200,
            status:true,
            data:result
        }
    }catch(error){
        ctx.body={
            code:500,
            status:false,
            data:err
        }
    }

})

/**
 * 获取商品大类接口
 */
router.get('/getCategoryList',async(ctx)=>{
    try {
        const Category = mongoose.model('Category');
        let result = await Category.find().exec();
        ctx.body = {
            code:200,
            data:result
        }
    } catch (error) {
        ctx.body = {
            code:500,
            data:error
        }
    }
    
})

/**
 * 跟商品大类ID，获取商品子类接口
 */
router.post('/getCategorySubList',async(ctx)=>{
    try {
        let categoryId = ctx.request.body.categoryId;
        const CategorySub = mongoose.model('CategorySub');
        let result = await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec();
        ctx.body = {
            code:200,
            data:result
        }
    } catch (error) {
        ctx.body = {
            code:500,
            data:error
        }
    }
    
})

/**
 * 跟商品子类ID，获取商品接口
 */
router.post('/getGoodsBySubId',async(ctx)=>{
    try {
        let categorySubId = ctx.request.body.categorySubId;//子类别id
        let page = ctx.request.body.page;//页数
        let num = 10;//每页显示数量
        let start = (page-1)*num;//跳过的数量
        const Goods = mongoose.model('Goods');
        let result = await Goods.find({SUB_ID: categorySubId}).skip(start).limit(num).exec();
        ctx.body = {
            code:200,
            data:result
        }
    } catch (error) {
        ctx.body = {
            code:500,
            data:error
        }
    }
    
})

module.exports=router
