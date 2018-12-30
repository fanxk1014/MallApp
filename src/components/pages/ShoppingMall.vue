<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" alt="" class="location-icon"/>
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini" class="search-button">查找</van-button>
                </van-col>
            </van-row>
        </div>

        <div class="swipe-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(item, index) in bannerArr" :key="index">
                    <img v-lazy="item.bannerUrl" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            locationIcon: require('../../assets/icon/location.png'),
            bannerArr: [
                {bannerUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546186074581&di=2c45e29d5389a3f136a0e6c011ada1dc&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c350598440cc000000212954941d.jpg%401280w_1l_2o_100sh.png'},
                {bannerUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546185939244&di=b64bf39c0f1851577af7f7c9500dddc8&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0183145a0165e4a801216a4b97a488.jpg%402o.jpg'},
                {bannerUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546186005716&di=3d52b0e0a93861fac736dd26af502dcd&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0154345a0165eca801202b0cfd379e.jpg%402o.jpg'}
            ]
        }
    },
}
</script>

<style scoped>
    .search-bar{
        height: 2.2rem;
        line-height: 2.2rem;
        background: #4291ab;
        overflow: hidden;
    }
    .location-icon{
        width: 50%;
        padding-top: 0.5rem;
        padding-left: 0.6rem;
    }
    .search-input{
        width: 100%;
        height: 1.3rem;
        background: #4291ab;
        border: 0;
        border-bottom: 1px solid #fff;
    }
    .search-button{
        margin-left: 1rem;
    }
    .swipe-area{
        clear: both;
        max-height: 15rem;
        overflow: hidden;
    }
</style>