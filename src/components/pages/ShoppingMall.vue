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
    </div>
</template>

<script>
export default {
    data() {
        return {
            locationIcon: require('../../assets/icon/location.png')
        }
    },
}
</script>

<style scoped>
    .search-bar{
        height: 2.2rem;
        line-height: 2.2rem;
        background: #4291ab;
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
</style>