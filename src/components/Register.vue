<template>
    <div class="login-container">
        <el-dialog title="注册"
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
                id="email"
                type="text"
                v-model="formData.email"
                @blur=emailBlur
                placeholder="邮箱"
            />
            <span 
                id="second"
                class="email tips"
                :style="{'visibility': tipsHidden.emailTipsHidden}">
                邮箱格式不正确
            </span>
            <input 
                id="studyid"
                type="text"
                v-model="formData.sno"
                @blur=studyidBlur
                placeholder="学号"
            />
            <span 
                class="studyid tips" 
                :style="{'visibility': tipsHidden.studyidTipsHidden}">
                学号格式不正确
            </span>
            <input 
                id="username"
                type="text"
                v-model="formData.username"
                @blur=usernameBlur
                placeholder="姓名"
            />
            <span 
            class="username tips"
            :style="{'visibility': tipsHidden.usernameTipsHidden}">
            姓名格式不正确，不能包含空格及特殊符号
            </span>
            <el-select v-model="formData.major" placeholder="专业">
                <el-option
                v-for="(value, i) in majorList"
                :key="i"
                :label="value.label"
                :value="value.label">
                </el-option>
            </el-select>
  <div id="under-select" />
            <input 
                id="password"
                type="password"
                v-model="formData.password"
                @blur=passwordBlur
                placeholder="6到16位密码"
            />
            <span class="password tips"
                :style="{'visibility': tipsHidden.passwordTipsHidden}">
                密码格式不正确，允许输入数字、之母、小数点和下划线
            </span>
            <input 
                id="password2"
                type="password"
                v-model="formData.password2"
                @blur=passwor2dBlur
                placeholder="确认密码"
            />
            <span 
                class="password2 tips"
                :style="{'visibility': tipsHidden.password2TipsHidden}">
                密码输入不一致
            </span>
        </div>
       
        <div class="footer">
            <button 
                class="confirm-button" 
                @click="doRegister" 
                :style="{'background-color': buttonColor}" 
                @mousedown="changeColorDown"
                @mouseup="changeColorUp"
            >注 册</button>
        <div>
            <span class="go-order" @click="goLogin">去登录></span>
        </div>
        </div>
        </el-dialog>

    </div>
</template>

<script>
import majorZip from '@/utils/major-zip';
import request from '@/utils/request';
import config from '@/config';
export default {
    props: ['dialogFormVisible','cancle'],
    data() {
        return {
            formData: {
                email: '',
                username: '',
                sno: '',
                major: '',
                password: '',
                password2: '',
            },
            majorList: majorZip,
            cancle_image: require('../assets/images/cancle.png'),
            tipsHidden: {
                emailTipsHidden: 'hidden',
                studyidTipsHidden: 'hidden',
                usernameTipsHidden: 'hidden',
                passwordTipsHidden: 'hidden',
                password2TipsHidden: 'hidden',
            },
            buttonColor: 'red'
        }
    },

    methods: {
        docancle() {
            this.cancle();
        },

        // 邮箱验证
        emailBlur() {
            const email = this.formData.email;
            if(email.length > 0) {
                const regex = /^[0-9a-zA-Z_]{1,}@[0-9a-zA-Z]{2,}.(com|cn|net){1}$/g;
                const result = email.match(regex);
                if(result) {
                    this.tipsHidden.emailTipsHidden = 'hidden';
                } else {
                    this.tipsHidden.emailTipsHidden = 'visible'; 
                }  
            }
        },

        // 学号验证
        studyidBlur() {
            const studyid = this.formData.studyid;
            if(studyid && studyid.length > 0) {
                const regex = /^[0-9a-zA-Z]{6,20}$/g;
                const result = studyid.match(regex);
                if(result) {
                    this.tipsHidden.studyidTipsHidden = 'hidden';
                } else {
                    this.tipsHidden.studyidTipsHidden = 'visible';
                }    
            }    
        },

        // 姓名验证
        usernameBlur() {
            const username = this.formData.username;
            if(username.length > 0) {
                const regex = /(^[\u4e00-\u9fa5]{2,10}$)|(^[a-zA-Z]{2,20}$)/g;
                const result = username.match(regex);
                if(result) {
                    this.tipsHidden.usernameTipsHidden = 'hidden';
                } else {
                    this.tipsHidden.usernameTipsHidden = 'visible';
                }
            } 
        },

        // 密码验证
        passwordBlur() {
            const password = this.formData.password;
            if(password.length > 0) {
                const regex = /^([0-9a-zA-Z]|\.|_){6,16}$/g;
                const result = password.match(regex);
                if(result) {
                    this.tipsHidden.passwordTipsHidden = 'hidden';
                } else {
                    this.tipsHidden.passwordTipsHidden = 'visible';
                }
            }
        },

        // 确认密码验证
        passwor2dBlur() {
            const password2 = this.formData.password2;
            if(password2.length > 0) {
                if(this.formData.password === password2) {
                    this.tipsHidden.password2TipsHidden = 'hidden';
                } else {
                    this.tipsHidden.password2TipsHidden = 'visible';
                }
            } 
        },

        cancleOver() {
            this.cancle_image = require('../assets/images/cancle_red.png')
        },

        cancleOut() {
            this.cancle_image = require('../assets/images/cancle.png')
        },


        // 点击注册
        doRegister() {
            // console.log(typeof JSON.parse(JSON.stringify(this.formData)));
            if(this.verRegister()) {
                this.sendRegister();
            } else {
                this.$message('请正确填写信息');
            }
          

        },
        // 验证注册信息
        verRegister() {
            var ver = true;
            for(let key in this.tipsHidden) {
                if(this.tipsHidden[`${key}`] === 'visible') {
                    ver = false;
                    break;
                }
            }
            for(let key in this.formData) {
                if(this.formData[`${key}`].length === 0) {
                    ver = false;
                    break;
                }
            }
            return ver;
        },
        // 发送注册表单
        sendRegister() {
            console.log('发送注册表单');
            console.log(this.formData)
            const method = 'POST';
            const url = `${config.apiUrl}/users/register`;
            const data = this.formData;
            request({method, url, data})
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err)
                })
        },


        changeColorDown() {
            this.buttonColor = '#a80000';
        },

        changeColorUp() {
            this.buttonColor = 'red';
        },

        emailInput() {
            const email = this.getEmail();
            if(email.length > 5) {
                console.log(email);
            }
            // console.log(email.length);
        },
        getEmail() {
            return this.email;
        },

        goLogin() {
            this.$emit('register-event', true);
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
            margin:2px 0 2px 0;
            padding-left: 10px; 
            border-radius: 5px;
            border: 0;
            outline:none;
            background-color: #f1f1f2;
        }
        .tips {
            margin-left: 10px;
            font-size: 11px;
            color: red;
        }
        #second {
            color: red;
        }
           
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

    #under-select {
        height: 10px;
    }
</style>

