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

        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide class="swiper-slide" v-for="(item, index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price}}(￥{{item.mallPrice}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>

    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from '../component/floorComponent'
export default {
    components:{swiper,swiperSlide,floorComponent},
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
            recommendGoods: [],
            swiperOption:{
                slidesPerView: 3
            },
            floor1: [],
            floor2: [],
            floor3: [],
            floorName:{} 
        }
    },
    created() {
        this.axios({
            url:'https://easy-mock.com/mock/5c28cf159dc44f3d782e5864/mallApp/home',
            method:'get',
        }).then(response=>{
            console.log(response.data.data)
            if(response.status == 200){
                this.category = response.data.data.category;
                this.adPic = response.data.data.advertesPicture.PICTURE_ADDRESS;
                this.recommendGoods = response.data.data.recommend;
                this.floor1 = response.data.data.floor1;
                this.floor2 = response.data.data.floor2;
                this.floor3 = response.data.data.floor3;
                this.floorName = response.data.data.floorName;
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
    .recommend-area{
        background: #ffffff;
        margin-top: 0.3rem;
    }
    .recommend-title{
        border-bottom: 1px solid #eee;
        font-size: 14px;
        color: #4291ab;
        padding-left: 0.3rem;
    }
    .recommend-body{
        border-bottom: 1px solid #eee;
    }
    .recommend-item{
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
    }
    .floor-anomaly{
      display: flex;
      flex-direction:row;
      background-color: #fff;
      border-bottom:1px solid #ddd;
    }
    .floor-anomaly div{
        width:10rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .floor-one{
        border-right:1px solid #ddd;
    }
    .floor-two{
        border-bottom:1px solid #ddd;
    }
    .floor-rule{
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        background-color: #fff;
    }
    .floor-rule div{
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width:10rem;
        border-bottom:1px solid #ddd;
    }
    .floor-rule div:nth-child(odd){
        border-right: 1px solid #ddd;
    }
</style>