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

        <div class="type-bar">
            <div v-for="(item,index) in category" :key="index">
                <img :src="item.image" alt="">
                <span>{{item.mallCategoryName}}</span>
            </div>
        </div>

        <div>
            <img v-lazy="adPic" alt="" width="100%">
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            locationIcon: require('../../assets/icon/location.png'),
            bannerArr: [
                {bannerUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546201179313&di=0d66d92280a413cb0a99816149bac950&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01fc7b5a5eec8aa8012113c719df80.png%401280w_1l_2o_100sh.png'},
                {bannerUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546201179315&di=5039076727cc8897f51df7c4d7a372c4&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f18059b8c6f4a801212fb7626afe.png%401280w_1l_2o_100sh.png'},
                {bannerUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546201179308&di=3c0bbf37cc1fc2acb59935f0ad828f73&imgtype=0&src=http%3A%2F%2Fpic.iocode.cc%2F43139896_201706282240550939969457.jpg'}
            ],
            category: [],
            adPic: '',
        }
    },
    created() {
        this.axios({
            url:'https://easy-mock.com/mock/5c28cf159dc44f3d782e5864/mallApp/home',
            method:'get',
        }).then(response=>{
            console.log(response)
            if(response.status == 200){
                this.category = response.data.data.category;
                this.adPic = response.data.data.advertesPicture.PICTURE_ADDRESS;
            }
        }).catch(error=>{
            console.log(error)
        })
    }
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
    .type-bar{
        background-color: #fff;
        margin:0 .3rem .3rem .3rem;
        border-radius: .3rem;
        font-size:14px;
        display: flex;
        flex-direction:row;
        flex-wrap:nowrap;
    }
    .type-bar div{
        padding: .3rem;
        font-size: 12px;
        text-align: center;
    }
    .type-bar div img{
        width: 3rem;
    }
</style>