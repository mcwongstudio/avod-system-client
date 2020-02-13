<template>
    <div>
        <button @click="test">66</button>
    </div>
</template>

<script>
export default {
    methods: {
        test() {
            console.log(window)
        }
    }
}
</script>
