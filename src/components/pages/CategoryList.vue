<template>
    <div>
        <div class="navbar-div">
             <van-nav-bar title="类别列表" /> 
        </div>

        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        左侧导航
                    </div>
                </van-col>
                <van-col span="18">右侧列表</van-col>
            </van-row>
        </div>
        

    </div>
</template>

<script>
    export default {
        created(){
            this.getCategory();
        },
        methods:{
            getCategory() {
                this.axios({
                    url:this.$url.getCategoryList,
                    method:'get',
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code == 200 && response.data.message ){
                    }else{
                        Toast('服务器错误，数据取得失败')
                    }
                })
                .catch(error=>{
                    console.log(error)
                }) 
            }
        }
    }
</script>

<style scoped>
    #leftNav{
        background-color: aliceblue;
    }
    #leftNav ul li {
        line-height: 2rem;
        border-bottom: 1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    }
    .categoryActice{
        background-color: #fff;
    }
    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>