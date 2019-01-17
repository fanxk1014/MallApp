<template>
    <div>
        <div class="navbar-div">
             <van-nav-bar title="类别列表" /> 
        </div>

        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li @click="clickCategory(index,item.ID)" :class="{categoryActice:categoryIndex==index}" v-for="(item , index) in category" :key="index">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
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
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById("leftNav").style.height= winHeight-46 +'px'
        },
        data() {
            return {
                category:[], 
                categoryIndex:0, 
            }
        },
        methods:{
            getCategory() {
                this.axios({
                    url:this.$url.getCategoryList,
                    method:'get',
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code == 200 && response.data.data ){
                        this.category=response.data.data;
                    }else{
                        Toast('服务器错误，数据取得失败');
                    }
                })
                .catch(error=>{
                    console.log(error)
                }) 
            },
            clickCategory(index){
                console.log(index)
                this.categoryIndex=index;
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
    .categoryActive{
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