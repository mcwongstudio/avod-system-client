<template>
    <div>
        <div class="block">
            <el-carousel :height="height" :interval="3000">
                <el-carousel-item v-for="(img, i) in images" :key="i">
                    <h3 class="small" :style="{'height': height}">
                        <img class="display-img" :src=img alt="display">
                    </h3>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'blockHeight',
    ],

    created() {
        this.height = `${this.blockHeight}px`;
    },

    data() {
        return {
            images: [
                require('@/assets/images/display1.jpg'),
                require('@/assets/images/display2.jpg'),
                require('@/assets/images/display3.jpg')
            ]
        }
    }
}
</script>

<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  .display-img {
      height: 100%;;
  }
</style>
