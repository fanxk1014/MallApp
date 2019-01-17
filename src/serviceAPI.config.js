const BASEURL = "https://easy-mock.com/mock/5c28cf159dc44f3d782e5864/mallApp/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo: BASEURL+'home',
    getGoodsInfo: BASEURL+'getGoodsInfo',
    registerUser: LOCALURL+'user/register',//用户注册接口
    loginUser: LOCALURL+'user/login',//用户注册接口
    getGoodsDetailInfo: LOCALURL+'goods/getGoodsDetailInfo',//获取商品详情接口
    getCategoryList:LOCALURL+'goods/getCategoryList',         //得到大类信息
    getCategorySubList:LOCALURL+'goods/getCategorySubList',   //得到小类信息
    getGoodsBySubId:LOCALURL+'goods/getGoodsBySubId',   //得到小类商品信息
}
module.exports = URL