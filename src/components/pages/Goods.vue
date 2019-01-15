<template>
    <div>
        商品详情页面
    </div>
</template>
<script>
    export default {
        data() {
            return {
                goodsId: ''
            }
        },
        created(){
            this.goodsId= this.$route.query.goodsId;
            console.log(this.goodsId);
            this.getInfo();
        },
        methods: {
            getInfo() {
                this.axios({
                    url: this.$url.getGoodsDetailInfo,
                    method:'post',
                    data:{
                        goodsId:this.goodsId
                    }
                })
                .then(response=>{
                    console.log(response)
                })
                .catch(error=>{
                    console.log(error)
                })
            }
        },
    }
</script>
<style scoped>
</style>