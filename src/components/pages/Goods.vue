<template>
    <div>
        商品详情页面
    </div>
</template>
<script>
    export default {
        data() {
            return {
                goodsId: '775e575ce28a4f89b1dfe2c99eb08ae7'
            }
        },
        created(){
            this.getInfo()
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