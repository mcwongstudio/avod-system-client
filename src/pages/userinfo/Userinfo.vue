<template>
    <div class="page">
        <div class="header">
            <Header @loginSuccess="getUserInfo"/>
        </div>
        <div class="logined" v-if="logined">
            <!-- 个人资料 -->
            <div class="box mq-user-box">
                <div class="avatar">
                    <img id="avatar" :src="user.avatar" alt="" @click="changeAvatar">
                    <input v-show="false" type="file" ref="avatatImage" @change="avatarChanged">
                </div>
                <div class="word-box">
                    <div class="word-item name">
                        <span>{{user.name}}</span>
                    </div>
                    <div class="word-item studyno">
                        <span>{{user.sno}}</span>
                    </div>
                    <div class="word-item email">
                        <input type="text" v-model="user.email">
                    </div>
                </div>
                
                <div class="save">
                    <button @click="saveInfo">保存</button>
                </div>
            </div>
            <!-- 已学课程 -->
            <div class="mq-box mq-lesson-box">
                <div class="show" @click="getLessons(user.uid)">
                    <img src="@/assets/images/show.png" alt=""><span>已学课程</span>
                </div>
                <div class="hm-info-list lesson-info-list" v-if="course.lShow">
                    <tbody>
                        <tr>
                            <td valign="top" width="550">课程</td>
                            <td valign="top" width="150">类型</td>
                        </tr>
                        <tr 
                            v-for="(item, index) in course.lessons" 
                            :key="index"
                            :style="{'background-color': backgroundColor(index)}"
                        >
                            <td valign="top" width="550">{{item.name}}</td>
                            <td valign="top" width="150">{{item.style}}</td>
                        </tr>
                    </tbody>
                </div>
            </div>
            <!-- 学习记录 -->
            <div class="mq-box mq-history-box">
                <div class="show" @click="getHistory(user.uid)">
                    <img src="@/assets/images/show.png" alt=""><span>学习记录</span>
                </div>
                <div class="hm-info-list history-info-list" v-if="course.hShow">
                    <tbody>
                        <tr>
                            <td valign="top" width="150">开始时间</td>
                            <td valign="top" width="500">课程</td>
                            <td valign="top" width="150">类型</td>
                            <td valign="top" width="80">持续时间(s)</td>
                        </tr>
                        <tr 
                            v-for="(item, index) in course.history" 
                            :key="index"
                            :style="{'background-color': backgroundColor(index)}"
                        >
                            <td valign="top" width="150">{{item.start}}</td>
                            <td valign="top" width="500">{{item.name}}</td>
                            <td valign="top" width="150">{{item.style}}</td>
                            <td valign="top" width="80">{{item.long}}</td>
                        </tr>
                    </tbody>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import Header from '@/components/Header'
import request from '@/utils/request'
import TOAST from '@/utils/toast'
import config from '@/config'
export default {
    components: {
        Header
    },
    data() {
        return {
            logined: false,
            user: {
                uid: '',
                name:'',
                sno: '',
                avatar: '',
                email: '',
            },

            formData: {
                avatarFile: {}
            },

            course: {
                lessons: [],
                lShow: false,
                history: [],
                hShow: false
            }
        }
    },

    created() {
        this.getUserInfo()
    },

    methods: {
        getUserInfo() {
            const method = 'GET'
            const url = `${config.apiUrl}/users/current`
            const data = {token: localStorage.token}
            request({method, url, data})
                .then(res => {
                    if(res && res.status === 200) {
                        this.logined = true
                        this.setUserData(res.data)
                    } else {
                        alert('请登录')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        setUserData(data) {
            this.user.uid = data.uid
            this.user.name = data.name
            this.user.sno =data.sno
            this.user.email = data.email
            let avatar_ = data.avatar
            if(data.avatar.substr(2, 3) != 'www') {
                avatar_ = config.serverUrl + avatar_
            }
            this.user.avatar = avatar_
        },

        changeAvatar() {
            this.$refs.avatatImage.click()
        },

        avatarChanged() {
            const file = this.$refs.avatatImage.files[0]
            this.formData.avatarFile = file
            const fileReader = new FileReader();
            // 将文件对象传递给内置对象
            fileReader.readAsDataURL(file)
            const that = this
            fileReader.onload = function() {
                that.user.avatar = this.result
            }
        },

        saveInfo() {
            const result = this.checkEmailFormat(this.user.email)
            if(result) {
               this.save()
            } else {
                TOAST.warning(this, '警告', '请输入正确的邮箱格式')
            }
        },

        checkEmailFormat(email) {
            const regex = /^[0-9a-zA-Z_]{1,}@[0-9a-zA-Z]{2,}.(com|cn|net){1}$/g;
                const result = email.match(regex);
                if(result) {
                    // email符合格式
                    return true
                }
                return false
        },

        async save() {
            const method = 'POST'
            const url = `${config.apiUrl}/users/update`
            const data = new FormData();
            const {uid, email} = this.user
            
            if(this.formData.avatarFile['name']) {
                data.append('file', this.formData.avatarFile)
            }
            data.append('uid', uid)
            data.append('email', email)
            data['token'] = localStorage.token

            await request({method, url, data}, 'FILE')
                .then(res => {
                    if(res && res.status === 200) {
                        TOAST.success(this, '成功', '信息已保存')
                    } else {
                        TOAST.error(this, '失败', '信息保存失败')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        async getLessons(uid) {
            const method = 'POST'
            const url = `${config.apiUrl}/study/getlessons`
            const data = {token: localStorage.token, uid}
            await request({method, url, data})
                .then(res => {
                    if(res && res.status === 200) {
                        this.showLessons(res.data)
                    } else {
                        TOAST.error(this, '失败', '操作失败')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        showLessons(data) {
            this.course.lessons = data.lessons
            this.course.lShow = true
            console.log(this.course.lessons)
        },

        backgroundColor(i) {
            if(i % 2 === 0) {
                return '#f2f0f0'
            }
            return 'white'
        },

        async getHistory(uid) {
            const method = 'POST'
            const url = `${config.apiUrl}/study/gethistory`
            const data = {
                token: localStorage.token,
                uid
            }
            await request({method, url, data})
                .then(res => {
                    if(res && res.status === 200) {
                        this.showHistory(res.data)
                    } else {
                        TOAST.error(this, '失败', '操作失败')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        showHistory(data) {
            this.course.history = data.history
            this.course.hShow = true
        }

    }
}
</script>

<style lang="scss" scoped>
    .mq-user-box {
        margin-left: 50px;
        width: 800px;
        border-radius: 10px;
        background-color: rgb(165, 150, 152);
        .avatar {
            display: inline-block;
            margin: 30px 0 0 50px;
            #avatar {width: 100px; height: 100px; border-radius: 5px;}
        }
        .word-box {
            // display: inline-block;
            float: right;
            margin: 35px 200px 0 0;
            color: #e4e8eb;
            .word-item {margin: 0 0 13px 0;}
            input {
                border: none; 
                outline: none; 
                border-radius: 5px; 
                background-color: rgb(243, 239, 239);
                height: 20px;
                font-size: 16px;
            }
        }
        .word-box:after {clear: both;}
        .save{
            clear: both;
            margin: 20px 0 10px 700px;
            display: inline-block;
            button {height: 25px; width: 80px; border: none; border-radius: 5px;letter-spacing: 3px;}
        }
    }

    .show {
        margin: 10px 0; 
        color: rgb(88, 87, 87);
        cursor: pointer;
        img {width: 18px; position: relative; top: 4px; display: inline-block; }
    }

    .mq-box {
        margin: 50px;
        
        .hm-info-list {
            border: 1px solid  rgb(201, 197, 197);
            border-radius: 5px;
            tbody {
                tr {
                    display: block;
                    padding: 10px 5px;
                }
                tr:hover {background-color: #badbf5!important;}
            }
        }

        .lesson-info-list {
            width: 700px;
            font-size: 16px;
        }

        .history-info-list {
            width: 880px;
            font-size: 13px;
        }
    }
</style>
