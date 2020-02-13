<template>
    <div class="components">
        <div class="box">
            <!-- Logo -->
            <div class="top-components logo" @click="goHome">
                <img src="@/assets/images/logo.png" alt="logo">
            </div>
            <!-- 搜索 -->
            <div class="top-components search">
                <input type="text" v-model="search_info">
                <a href="javascript:void(0)" @click="dosearch(search_info)">
                    <img src="@/assets/images/search.png" alt="search">
                </a>
            </div>
            <!-- 用户 -->
            <div class="top-components user">
                <div class="login" :style="{'display': iflogin}">
                    <div class="finger button" @click="doLogin">登录</div>
                    <span> / </span>
                    <div class="finger button" @click="doRegister">注册</div>
                    <LoginRegister 
                        :loginDialogFormVisible=loginDialogFormVisible 
                        :loginCancle="loginCancle"
                        :registerDialogFormVisible="registerDialogFormVisible"
                        :registerCancle="registerCancle"
                        @child-event="loginOrRegister"
                    />
                </div>
                <div class="logined" @click="goUserInfo" :style="{'display': iflogined}">
                    <div class="word">
                        <p>{{user.studyid}}</p>
                        <p>{{user.name}}</p>
                    </div>
                    <img :src="user.avatar" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoginRegister from '@/components/LoginRegister';
import setLoginStatus from '@/utils/setLoginStatus';
import config from '@/config'
export default {
    components: {
        LoginRegister
    },
    data() {
        return {
            iflogin: 'inline',
            iflogined: 'none',
            user: {
                studyid: '',
                name: '',
                avatar: ''
            },
            search_info: '',
            loginDialogFormVisible: false,
            registerDialogFormVisible:false
        }
    },
    created() {
        this.getPortraitAssem();
    },
    updated() {
       this.getPortraitAssem(); 
    },

    methods: {
        doLogin() {
            this.loginDialogFormVisible = true;   
        },

        doRegister() {
            this.registerDialogFormVisible = true;
        },
        
        dosearch(keyword) {
            const Logistics = this.$router.resolve({
                path: '/search',
                query: {keyword}
            });
            window.open(Logistics.href, '_top');
        },

        loginCancle() {
            this.loginDialogFormVisible = false;
        },

        registerCancle() {
            this.registerDialogFormVisible = false;
        },

        loginOrRegister(data) {
            if(data === 'register') {
                this.doRegister();
            }
            if(data === 'login') {
                this.doLogin();
            }
        },

        async getPortraitAssem() {
            // 获取头像姓名等信息
            const userinfo = await setLoginStatus();
            if(userinfo && userinfo.data) {
                this.setPortraitAssem(userinfo.data);
            }
            else {
                this.setPortraitAssem()
            }
        },

        setPortraitAssem(data=false) {
            // 显示头像姓名等信息
            if(data && this.user.studyid !== data.sno) {
                console.log(data)
                this.iflogin = 'none';
                this.iflogined = 'inline';
                this.user = {
                    studyid: data.sno,
                    name: data.name,
                    // avatar: data.avatar
                }
                let avatar_ = data.avatar
                if(data.avatar.substr(2, 3) != 'www') {
                    avatar_ = config.serverUrl + avatar_
                }
                this.user.avatar = avatar_
                this.$emit('loginSuccess', {logined: true})
            } else {
                console.log(data)
            }
        },

        goUserInfo() {
            const Logistics = this.$router.resolve({
                path: '/userinfo',
            });
            window.open(Logistics.href, '_blank');
        },

        goHome() {
            const Logistics = this.$router.resolve({
                path: '/home',
            });
            window.open(Logistics.href, '_self');
        }
    }
}
</script>

<style lang="scss" scoped>
    .finger{
        cursor:pointer;
    }
    .components {
        width: auto;
        .box {
            width: 1300px;
            overflow: hidden;
            .logo {
                cursor: pointer;
                display: inline-block;
                img { width: 180px; }
            }

            .search {
                display: inline-block;
                position: relative;
                bottom: 28px;
                margin-left: 250px;
                input {
                    width: 250px;
                    height: 25px;
                    border-radius: 9px;
                    border:0;
                    outline:none;
                    padding-left: 10px;
                    background-color: #e9e9e9; 
                }
                img {
                    height: 15px;
                    margin-left: -20px;
                    position: relative;
                    top: 4px
                }
            }
            .user {
                // display: inline-block;
                // position: relative;
                // bottom: 28px;
                margin-top: 28px;
                float: right;
                .login {
                    color: #72777c;
                    letter-spacing: 1px;
                    .button {
                        display: inline-block;
                    }
                    .button:hover { color: red; }
                }
                .logined {
                    display: flex;
                    justify-content: space-between;
                    width: 200px;
                    cursor: pointer;
                    .word {
                        display: inline-block;
                        position: relative;
                        bottom: 5px;
                        p {color: #72777c; font-size: 15px;}
                    }
                    img {
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        display: inline-block;
                        margin-left: 10px; 
                        position: relative;
             
                    }
                 
                }
                
            }
        }
    }
</style>
