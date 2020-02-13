<template>
    <div class="page">
        <header>
            <Header />
        </header>
        <section>
            <div class="lesson-list">
                <div 
                class="lesson-item" 
                v-for="(course, index) in courserZip" 
                :key="index"
                @click="goCourseItem(course.cid)"
                >
                    <img :src="getImageUrl(course.image)" alt="">
                    <div class="shizhan-intro-box">
                        <p class="title">{{course.name}}</p>
                        <p class="shizhan-desc">{{course.desc}}</p>
                    </div>
                </div>
            </div>
        </section>


        <div class="test">
            {{lessonStyle}}
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import request from '@/utils/request.js'
import config from '@/config'
// import courserZip from '@/utils/course-zip'
export default {
    components: {
        Header,
    },

    created() {
        this.getParams();
        // this.courserZip = courserZip;
        this.getCourserZip()
    },

    data() {
        return {
            lessonStyle: '',
            courserZip: []
        }
    },

    methods: {
        getParams() {
            // 获取课程类型
            const routerParams = this.$route.query;
            this.lessonStyle = routerParams.lesson;
            console.log(routerParams);
        },

        goCourseItem(cid) {
            // 选中课程跳转
            console.log(cid);
            const Logistics = this.$router.resolve({
                path: '/lessonitem',
                query: {cid}
            });
            window.open(Logistics.href, '_blank');
        },

        async getCourserZip() {
            const method = 'POST'
            const url = `${config.apiUrl}/file/getmaincoursebystyle`
            const data = {style: this.lessonStyle}
            await request({method, url, data})
                .then(res => {
                    if(res && res.status === 200) {
                        this.courserZip = res.data.findResult
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        getImageUrl(url) {
            return config.serverUrl + url
        }
    }
}
</script>

<style lang="scss" scoped>
    section {
        width: 100%;
        background-color: #e0d9da;
    }
    .lesson-list {
        width: 1340px;
        background-color: #e0d9da;
    }
    .lesson-item {
        width: 270px;
        margin: 20px 30px;
        display: inline-block;
        cursor: pointer;
        img {
            width: 270px;
            border-radius: 10px;
        }
        .shizhan-intro-box {
            width: 250px;
            margin: 0 auto;
            .title {
                height: 48px;
                font-size: 16px;
                line-height: 24px;
                font-weight: 700;
                word-break: break-all;
                word-wrap: break-word;
                display: inline-block;
                overflow: hidden;
                color: #2b333b;
            }
            .shizhan-desc {
                font-size: 12px;
                color: #93999f;
                max-height: 48px;
                line-height: 24px;
                word-break: break-all;
                word-wrap: break-word;
                overflow: hidden;
            }
        }
        
    }
</style>
