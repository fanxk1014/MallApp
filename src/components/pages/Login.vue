<template>
    <div>
         <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goBack"
            />
        <div class="login-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
                :error-message="usernameErrorMsg"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                :error-message="passwordErrorMsg"
                required
            />
            <div class="login-button">
                <van-button type="primary" class="login-btn" @click="loginAction" :loading="openLoading" size="large">登录</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant'
    export default {
        data() {
            return {
                username: '',
                password: '',
                openLoading: false, //是否开启用户的Loading
                usernameErrorMsg:'',   //当用户名出现错误的时候
                passwordErrorMsg:'',   //当密码出现错误的时候
            }
        },
        created(){
            if(localStorage.userInfo){
                Toast.success('您已经登录');
                this.$router.push('/');
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            loginAction(){
                // if(this.checkForm()){
                //     this.axiosRegisterUser()
                // }
                this.checkForm() && this.axiosLoginUser()
            },
            axiosLoginUser(){
                this.openLoading = true;
                this.axios({
                    url: this.$url.loginUser,
                    method: 'post',
                    data:{
                        userName:this.username,
                        password:this.password 
                    }
                })
                .then(response => {
                    console.log(response);
                    if(response.data.code==200 && response.data.status){
                        new Promise((resolve,reject)=>{
                            localStorage.userInfo = {userName: this.username}
                            setTimeout(()=>{
                                resolve();
                            },500)
                        }).then(()=>{
                            Toast.success(response.data.message);
                            this.$router.push('/');
                        }).catch(error=>{
                            Toast.success('登录状态保存失败');
                            console.log(error);
                        })
                        
                    }else{
                        Toast.fail(response.data.message);
                        this.openLoading = false;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    Toast.fail('登录失败');
                    this.openLoading = false;
                })
            },
            checkForm(){//注册表单验证
                let isOk= true;
                if(this.username.length<5){
                    this.usernameErrorMsg="用户名不能小于5位";
                    isOk= false;
                }else{
                    this.usernameErrorMsg='';
                }
                if(this.password.length<6){
                    this.passwordErrorMsg="密码不能少于6位";
                    isOk= false;
                }else{
                    this.passwordErrorMsg='';
                }
                return isOk
            }
        },
    }
</script>

<style scoped>
    .login-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .login-button{
        padding-top:10px;
    }
    .login-btn{
        background: #4291ab;
        border: #4291ab;
    }
</style>