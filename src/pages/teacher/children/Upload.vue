<template>
    <div class="components">
        <div class="box upload-box">
            <input type="file" ref="fileInt">
            <button @click="send">按钮</button>
        </div>
    </div>
</template>

<script>
import config from '@/config'
import request from '@/utils/request'
import getFileName from '@/utils/getFileName'
export default {
    props: ['cid'],

    data() {
        return {
           
        }
    },
    methods: {
        send() {
            const file = this.$refs.fileInt.files[0];
            const filename = getFileName(file.name)
            const method = 'POST'
            const url = `${config.apiUrl}/file/upload`  //upload video
            const data = new FormData();
            data.append('file', file)
            data.append('cid', this.cid)
            data.append('branchTitle', filename)
            request({method, url, data}, 'FILE')
                .then(res => {
                    console.log(res)
                    if(res.status && res.status === 200) {
                        this.sendSuccess()
                    }
                })
                .catch(err => {
                    console.log(err)
                })  
        },

        sendSuccess() {
            this.$emit('success')
        }
    }
}
</script>

