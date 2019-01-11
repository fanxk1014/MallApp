const BASEURL = "https://easy-mock.com/mock/5c28cf159dc44f3d782e5864/mallApp/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo:BASEURL+'home',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',//用户注册接口
}
module.exports = URL