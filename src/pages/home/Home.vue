<template>
    <div class="home_page">
        <header class="head">
            <Header @loginSuccess="getPortraitAssem"/>
        </header>
        <section class="section1">
            <div class="jn-section-box">
                <div style="height: 10px;" />
                <Lessonshow />
                <div style="height: 10px;" />
            </div>
        </section>
    </div>
</template>

<script>
import Header from '@/components/Header'
// import LoginRegister from '../../components/LoginRegister';
import Lessonshow from './childern/Lessonshow';
// import request from '@/utils/request';
// import config from '@/config';
import setLoginStatus from '@/utils/setLoginStatus';
export default {
    components: {
        Header, Lessonshow
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


    methods: {
        doLogin() {
            this.loginDialogFormVisible = true;   
        },

        doRegister() {
            this.registerDialogFormVisible = true;
        },
        
        dosearch() {
            console.log(this.search_info);
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
            // 显示头像姓名等信息
            const userinfo = await setLoginStatus();
            if(userinfo && userinfo.data) {
                this.setPortraitAssem(userinfo.data);
            }
            else {
                this.setPortraitAssem()
            }
        },

        setPortraitAssem(data=false) {
            if(data) {
                console.log(data)
                this.iflogin = 'none';
                this.iflogined = 'inline';
                this.user = {
                    studyid: data.sno,
                    name: data.name,
                    avatar: data.avatar
                    }
            } else {
                console.log(data)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .home_page {
        width: 100%;
        .section1 {width:100%; background-color: #dae5f3;}
        .jn-section-box {width:1340px; background-color: #dae5f3;}
    }
</style>
