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
                            <li @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}" v-for="(item , index) in category" :key="index">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
                        </van-tabs>
                    </div>
                  
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list v-model="loading" :finished="finished" @load="onLoad">
                                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodsList" :key="index">
                                    <div class="list-item-img">
                                        <img :src="item.IMAGE1" 
                                        width="100%"
                                        :onerror="errorImg"                                    
                                        />

                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>                                    
                                        <div>￥{{item.ORI_PRICE | moneyFilter}}</div>                                    
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
        

    </div>
</template>

<script>
    import { Toast } from 'vant'
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        created(){
            this.getCategory();
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight;
            document.getElementById("leftNav").style.height= winHeight-46 +'px';
            document.getElementById('list-div').style.height=winHeight-90 +'px';
        },
        data() {
            return {
                category:[],
                categoryIndex:0,
                active:0,//子类tab
                categorySub:[],
                list:[],
                loading:false,   //false:上拉加载允许使用
                finished:false,  //下拉加载是否没有数据了
                page:1,        //商品列表的页数
                goodsList:[],   //商品列表信息
                categorySubId:'', //商品子类ID
                isRefresh:false, //false:下拉刷新允许使用
                errorImg:'this.src="'+require('@/assets/images/error.png')+'"',
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        methods:{
            getCategory() {//获取大类信息
                this.axios({
                    url:this.$url.getCategoryList,
                    method:'get',
                })
                .then(response=>{
                    if(response.data.code == 200 && response.data.data ){
                        this.category=response.data.data;
                        this.getCategorySubList(this.category[0].ID);
                    }else{
                        Toast('服务器错误，数据取得失败');
                    }
                })
                .catch(error=>{
                    console.log(error);
                }) 
            },
            clickCategory(index,categoryId){//点击大类
                this.categoryIndex=index;
                this.goodsList=[];
                this.finished = false;
                this.page = 1;
                this.getCategorySubList(categoryId);
                this.onLoad();
            },
            getCategorySubList(categoryId){//根据大类ID读取小类类别列表
                this.axios({
                    url:this.$url.getCategorySubList,
                    method:'post',
                    data:{categoryId:categoryId}
                })
                .then(response=>{
                    console.log('小类类别列表',categoryId,response.data.data);
                    if(response.data.code == 200 && response.data.data ){
                        this.categorySub=response.data.data;
                        this.active = 0;
                        this.categorySubId = this.categorySub[0].ID;
                    }else{
                        Toast('服务器错误，数据取得失败');
                    }  
                })
                .catch(error=>{
                    console.log(error);
                }) 
            },
            onLoad(){//上拉加载方法
                setTimeout(()=>{
                   this.categorySubId = this.categorySubId?this.categorySubId:this.categorySub[0].ID;
                   this.getGoodsList();
                },500)
            },
            onRefresh(){//下拉刷新方法
                setTimeout(()=>{
                    this.isRefresh=false;
                    this.finished = false;
                    this.goodsList=[];
                    this.page=1;
                    this.onLoad();
                },500)
            },
            getGoodsList(){
                this.axios({
                    url:this.$url.getGoodsBySubId,
                    method:'post',
                    data:{
                        categorySubId:this.categorySubId,
                        page:this.page
                    }
                })
                .then(response=>{
                    console.log('getGoodsList',response.data.data);
                    if(response.data.code == 200  && response.data.data.length){
                        this.page++;
                        this.goodsList=this.goodsList.concat(response.data.data);//合并商品数组
                    }else{
                        this.finished = true;
                    }
                    this.loading = false;
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            onClickCategorySub(index,title){
                this.categorySubId = this.categorySub[index].ID;
                this.goodsList=[];
                this.finished = false;
                this.page = 1;
                this.onLoad();
            },
            goGoodsInfo(id){//跳转到商品详细页
                this.$router.push({name:'Goods',params:{goodsId:id}});
            },
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