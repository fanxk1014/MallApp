<template>
    <div>

        <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        />

        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
            <div class="register-button">
                <van-button type="primary" class="register-btn" size="large" @click="axiosRegisterUser">注册</van-button>
            </div>
       </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            axiosRegisterUser(){
                this.axios({
                    url: this.$url.registerUser,
                    method: 'post',
                    data:{
                        username:this.username,
                        password:this.password 
                    }
                })
                .then(response => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },
    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
    .register-btn{
        background: #4291ab;
        border: #4291ab;
    }
</style>