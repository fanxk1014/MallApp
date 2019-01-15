<template>
    <div>
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="goBack"
            />
        
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%"/>
        </div>

        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE}}</div>
        <div>
            <van-tabs >
            <van-tab title="商品详情">
            <div class="detail" v-html="goodsInfo.DETAIL">
            </div>
            </van-tab>
            <van-tab title="评价">
                非常好吃
            </van-tab>
            </van-tabs>
        </div>

    </div>
</template>
<script>
    import { Toast } from 'vant'
    export default {
        data() {
            return {
                goodsId: '',
                goodsInfo: {}
            }
        },
        created(){
            this.goodsId= this.$route.query.goodsId;
            console.log(this.goodsId);
            this.getInfo();
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            getInfo() {
                this.axios({
                    url: this.$url.getGoodsDetailInfo,
                    method:'post',
                    data:{
                        goodsId:this.goodsId
                    }
                })
                .then(response=>{
                    console.log(response);
                    
                    if(response.data.code == 200 && response.data.data ){
                            this.goodsInfo = response.data.data;
                    }else{
                        Toast('服务器错误，数据取得失败');
                    }

                })
                .catch(error=>{
                    console.log(error)
                })
            }
        },
    }
</script>
<style scoped>
    .detail{
        font-size:0px;
    }
    .goods-name{
        background-color: #fff;
    }
    .goods-price{
        background-color: #fff;
    }
</style>