<template>
    <div>
        <Login 
            :dialogFormVisible="loginDialogFormVisible" 
            :cancle="doLoginCancle"
            @login-event='goRegister'
        />
        <Register 
            :dialogFormVisible="registerDialogFormVisible"
            :cancle="doRegisterCancle"
            @register-event='goLogin'
        />
    </div>
</template>

<script>
import Login from './Login';
import Register from './Register';
export default {
    components: {
        Login, Register
    },

    props: [
        'loginDialogFormVisible',
        'loginCancle',
        'registerDialogFormVisible',
        'registerCancle'
        ],

    methods: {
        doLoginCancle() {
            this.loginCancle();
        },

        doRegisterCancle() {
            this.registerCancle();
        },

        goRegister(data) {
            if(data) {
                this.doLoginCancle();
                this.$emit('child-event', 'register');
            }
        },

        goLogin(data) {
            if(data) {
                this.doRegisterCancle();
                this.$emit('child-event', 'login');
            }
        }
    }
}
</script>