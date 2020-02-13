<template>
    <div class="components">
    
        <!-- 文件上传 -->
        <div class="box upload-box">
            <!-- <input type="file" ref="fileInt">
            <button @click="send">按钮</button> -->
            <div v-for="(item, index) in uploadlist" :key="index">
                <Upload :cid="cid" @success="uploadDisplay"  v-if="item.display"/>
            </div>

        </div>

        <!-- 课程信息输入 -->
        <div class="box info-input-box">
            <p>基本信息</p>
            <div class="content-title-container">
                <span>*</span><span>标题</span>
                <input type="text" v-model="mainData.name">
            </div>
            <div class="content-style-container">
                <span>*</span><span>类型</span>
                <input type="text" v-model="mainData.style">
            </div>
            <div class="content-desc-container">
                <span>*</span><span>简介</span>
                <textarea name="" id="" cols="30" rows="10" v-model="mainData.desc"></textarea>
            </div>
            <div class="content-image-container">
                <span>*</span><span>封面</span>
                <input type="file" ref="imagefile">
            </div>
            <div class="content-comfirm-container">
                <button @click="comfirm">立即投稿</button>
            </div>
        </div>
        <button @click="uploadDisplay">test</button>
    </div>
</template>

<script>
import config from '@/config'
import request from '@/utils/request'
import Upload from './Upload'
// import InfoInput from './InfoInput'
export default {
    props: ['tid'],

    components: {
        Upload
    },

    data(){
        return {
            cid: '',
            mainData: {
                name: '',
                style: '',
                desc: ''
            },
            uploadlist: []
        }
    },

    created() {
        this.newcid();
        this.uploadlist = this.getUploadList();
    },
    methods: {
        send() {
            const file = this.$refs.fileInt.files[0];
            const method = 'POST'
            const url = `${config.apiUrl}/file/upload`  //upload video
            const data = new FormData();
            data.append('file', file)
            data.append('cid', this.cid)

            request({method, url, data}, 'FILE')
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })  
        },

        async newcid() {
            const method = 'GET'
            const url = `${config.apiUrl}/other/newid`
            const data = {}
            await request({method, url, data})
                .then(res => {
                    this.cid = res.data.id
                })
                .catch(err => {
                    console.log(err)
                })
        },

        getUploadList() {
            const list = []
            for (let i = 0; i < 10; i++) {
                const display = i === 0 ? true : false
                list.push({'id': i, 'display': display})
            }
            return list
        },

        uploadDisplay() {
            for(let i = 0; i < this.uploadlist.length; i++) {
                if (!this.uploadlist[i].display) {
                    this.uploadlist[i].display = true;
                    break;
                }
            }
        },

        comfirm() {
            const imagefile = this.$refs.imagefile.files[0];
            const method = 'POST'
            const url = `${config.apiUrl}/file/uploadmaininfo`
            const data = new FormData()
            data.append('cid', this.cid)
            data.append('file', imagefile)
            data.append('name', this.mainData.name)
            data.append('style', this.mainData.style)
            data.append('desc', this.mainData.desc)
            data.append('tid', this.tid)

            request({method, url, data}, 'FILE')
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
  
}
</script>

