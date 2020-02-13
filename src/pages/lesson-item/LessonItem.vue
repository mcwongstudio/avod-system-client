<template>
    <div class="page">
        <div class="header">
            <Header @loginSuccess="getUserInfo"/>
        </div>
        <div class="logined" v-if="islogined">
            <div class="mq-crouse-box">
                <!-- 视频 -->
                <div class="mq-video-item">
                    <div class="window1">
                        <video-player  class="video-player vjs-custom-skin"
                            ref="videoPlayer" 
                            :playsinline="true" 
                            :options="playerOptions"
                            @play="onPlayerPlay($event)"
                        >
                        </video-player>
                    </div>
                </div>
                <!-- 课程 -->
                <div class="mq-cotent-box">
                    <div class="window2">
                        <div class="hm-course-content" v-for="(item, index) in content" :key="index">
                        <!-- <button @click="changevideo(item.url)">{{item.title}}</button> -->
                        <el-radio-group size="small" v-model="radio1" @change="changevideo(item.url)">
                            <div class="hm-course-item">
                                <el-radio-button :label="item.url">
                                    <div class="hm-course-item-title">{{item.title}}</div>
                                </el-radio-button>
                            </div>
                        </el-radio-group>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import config from '@/config'
import request from '@/utils/request.js'
import setLoginStatus from '@/utils/setLoginStatus'
export default {
    components: {
        Header
    },
    data() {
        return {
            cid: '',
            uid: '',
            sid: '',
            islogined: false,
            content: [],
            radio1: '',
            start: false,

            playerOptions : {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                type: "video/mp4",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                src: "http://localhost:5000/upload/upload_a85626aafa93bc0ab0a101c660edc840.mp4" //url地址
                }],
                // poster: require("@/assets/images/display1.jpg"), //你的封面地址
                width: document.documentElement.clientWidth / 3, //播放器宽度
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            }

        }
    },

    created() {
        this.getCid();
        this.getUserInfo()
        this.getCourseInfo(this.cid);
    },

    mounted() {
        window.addEventListener('beforeunload', e => this.setEndTime(e))
    },

    methods: {
        getCid() {
            this.cid = this.$route.query.cid;
        },

        async getCourseInfo(cid) {
            const method = 'POST'
            const url = `${config.apiUrl}/file/getcoursebycid`
            const data = {cid}
            await request({method, url, data})
                .then(res => {
                    if(res && res.status === 200) {
                        const {content} = res.data.result
                        this.content = content
                        this.radio1 = content[0].url
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        changevideo(videoUrl) {
            this.playerOptions.sources[0].src = config.serverUrl + videoUrl
        },

        async getUserInfo() {
            const userinfo = await setLoginStatus()
            if(userinfo.data) {
                this.uid = userinfo.data.uid
                this.islogined = true;
            } else {
                // 请登录
                alert('请登录')
            }
        },

        onPlayerPlay() {
            if(!this.start) {
                this.setStartTime()
            }
            this.start = true
        },

        async setStartTime() {
            const method = 'POST'
            const url = `${config.apiUrl}/study/setstarttime`
            const data = {
                cid: this.cid, uid: this.uid, token: localStorage.token
            }
            await request({method, url, data})
                .then(res => {
                    this.sid = res.data.sid
                })
                .catch(err => {
                    console.log(err)
                })
        },

        async setEndTime() {
            if(this.sid) {
                const method = 'POST'
                const url =`${config.apiUrl}/study/setendtime`
                const data = {sid: this.sid, token: localStorage.token}
                await request({method, url, data})
            }
        },


    }
}
</script>

<style lang="scss" scoped>
.window1{
    height: 450px;
    width: 800px;
}
.window2{
    min-height: 450px;
    width: 400px;
    background-color: #cddbcd;
    padding-top: 10px;
}



    .page {width: 100%;}
    .logined{width: 100%; background-color: #ebe1e3;}
    .mq-crouse-box {width: 1340px;; background-color: #ebe1e3;} //高要和.login+
    .mq-video-item {
        display: inline-block;
        margin: 30px 0 30px 100px;
    }
    .mq-cotent-box{
        float: right;
        margin: 30px 10px 0 0
    }
    .hm-course-content{display: inline-block; width: 350px; margin: 5px 0 0 10px;}
    .hm-course-item-title{width: 350px;}
</style>
