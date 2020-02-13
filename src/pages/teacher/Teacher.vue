<template>
    <div class="page">
        <div v-if="!islogined">
            <input type="text" v-model="formData.sno">
            <input type="text" v-model="formData.password">
            <button @click="doLogin">登录</button>
        </div>
        <div v-if="islogined">
            <Logined :tid="uid"/>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request'
import setLoginStatus from '@/utils/setLoginStatus'
import config from '@/config'
import Logined from './children/Logined'
export default {
    components: {
        Logined
    },

    data() {
        return {
            islogined: false,
            formData: {
                sno: '',
                password: '' 
            },
            uid: ''
            
        }
    },

    created() {
        this.getUserInfo()
    },

    methods:{
        async getUserInfo() {
            const userinfo = await setLoginStatus()
            console.log(userinfo)
            if(userinfo.data && userinfo.data.admin) {
                console.log('老师')
                this.uid = userinfo.data.uid
                this.islogined = true;
            } else {
                console.log('不是老师')
            }
        },

        doLogin() {
            this.sendLoginInfo(this.formData);
        },

        async sendLoginInfo(formData) {
            const method = 'POST';
            const url = `${config.apiUrl}/users/login`;
            const data = formData
            await request({ method, url, data})
                .then(res => {
                    if(res.status === 200) {
                        this.afterLoginSuccess(res.data);
                        // loginState = true;
                    } else {
                    console.log(res.response);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        afterLoginSuccess(data) {
            console.log(data);
            localStorage.setItem('token', data.token);
            this.getUserInfo();
        },
    }
}
</script>

