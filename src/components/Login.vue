<template>
    <div class="login-container">
        <el-dialog title="登录"
        :visible.sync=dialogFormVisible
        :show-close=false
        :close-on-click-modal=false
        width="400px"
        >
        <img id="cancle-img"
            :src=cancle_image
            alt="cancle"
            @mouseover="cancleOver"
            @mouseout="cancleOut"
            @click=docancle
        >
        <div class="input-content">
            <input 
                id="studyid"
                type="text"
                v-model="formData.sno"
                @blur=studyidBlur
                placeholder="请输入学号"
            />
            <input 
                id="password"
                type="password"
                v-model="formData.password"
                @blur=passwordBlur
                placeholder="请输入密码"
            />
        </div>
        <div class="tips" :style="{'visibility': hiddenTips}">
            <span>账号或密码错误</span>
        </div>
        <div class="setup">
            <span class="forget-password" @click="forgetPassword">忘记密码</span>
        </div>
        <div class="footer">
            <button 
                class="confirm-button" 
                @click="doLogin" 
                :style="{'background-color': buttonColor}" 
                @mousedown="changeColorDown"
                @mouseup="changeColorUp"
            >登 陆</button>
        <div><span class="go-order" @click="goRegister">去注册></span></div>
        </div>
        </el-dialog>

    </div>
</template>

<script>
import request from '@/utils/request';
import config from '@/config';
export default {
    props: ['dialogFormVisible','cancle'],
    data() {
        return {
            formData: {
                sno: '',
                password: ''
            },
            cancle_image: require('../assets/images/cancle.png'),
            hiddenTips: 'hidden',
            buttonColor: 'red'
        }
    },

    methods: {
        docancle() {
            this.cancle();
        },

        studyidBlur() {
            console.log(this.formData.sno);
        },

        passwordBlur() {
            console.log(this.formData.password);
        },

        cancleOver() {
            this.cancle_image = require('../assets/images/cancle_red.png')
        },

        cancleOut() {
            this.cancle_image = require('../assets/images/cancle.png')
        },

        forgetPassword() {
            console.log('忘记密码');
        },

        async doLogin() {
            console.log('登陆');

            const login = await this.sendLogin();
            console.log(login)
            if(!login) {
                // 登录失败
                 this.hiddenTips = 'visible';
            }
            else { 
                // 登录成功
                this.hiddenTips = 'hidden';
                this.docancle();
            }
        },

        async sendLogin() {
            var loginState = false;
            const method = 'POST';
            const url = `${config.apiUrl}/users/login`;
            const data = this.formData;
            await request({method, url, data}).then(res => {
                if(res.status === 200) {
                    this.setLoginState(res.data);
                    loginState = true;
                } else {
                   console.log(res.response);
                }
            }).catch(err => {
                console.log(err);
            })
            return loginState;
        },

        setLoginState(data) {
            console.log(data);
            localStorage.setItem('token', data.token)
        },

        changeColorDown() {
            this.buttonColor = '#a80000';
        },

        changeColorUp() {
            this.buttonColor = 'red';
        },

        goRegister() {
            this.$emit('login-event', true)
        }
    }
}
</script>

<style lang="scss" scoped>
    
    
    #cancle-img {
        width: 18px;
        position: absolute;
        left: 360px;
        top: 15px;
    }
    #cancle-img:hover {
        width: 20px;
        position: absolute;
        left: 359px;
        top: 14px;
    }

    .input-content {
        input {
            color: black;
            font-size: 14px;
            display: block;
            height: 30px;
            width: 100%;
            // margin-left: 10px;
            padding-left: 10px; 
            border-radius: 5px;
            border: 0;
            outline:none;
            background-color: #f1f1f2;
        }
        #password {
            color: black;
            margin-top: 20px;
            margin-left: 0;
        }   
    }
    .tips {
        margin: 8px 0 0 0;
        font-size: 10px;
        color: red;
    }
    .forget-password {
        position: relative;
        left: 80%;
        color: #a09f9f;
        cursor:pointer;
    }
    .confirm-button {
        color: white;
        height: 40px;
        width: 70%;
        margin: 100px 0 50px 15%;
        border-radius: 20px;
        border: 0;
        outline: none;
        cursor:pointer;
    }

    .footer {
        .go-order {
            color: #8a8888;
            cursor:pointer;
        }
    }
</style>

