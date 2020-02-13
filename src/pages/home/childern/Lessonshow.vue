<template>
    <div class="container" :style="{'height': `${containerHeight}px`}">
        <div class="lesson" :style="{'height': `${containerHeight}px`}">
            <div 
                class="select-lesson"
            >
                <div 
                    class="select-item" 
                    v-for="(selectItem, i) in selectItems" 
                    :key=i
                    :style="{'background-color': selectItem.bgc}"
                    @mouseover="showSelect(i)"
                    @mouseout="hideSelect(i)"
                >
                    <span>{{selectItem.title}}</span>
                </div>

            </div>
            <div class="show-lesson">
                <Swiper :blockHeight="`${containerHeight}`" />
            </div>
        </div>
        <div 
        class="show-select" 
        :style="{
            'display': select,
            'height': `${containerHeight}px`,
            'top': `${-containerHeight}px`
            }"
        @mouseover="showSelect(item)"
        @mouseout="hideSelect(item)"
        >
        <div class="content-item" v-for="(content, i) in selectItems[item].content" :key=i>
            <div class="title">
                <span>{{content.title}}</span>
            </div>
            <div class="list">
                <span 
                    v-for="(list, j) in content.list" 
                    :key=j
                    @click="goLesson(list)"
                >
                {{list}}
                </span>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import lessonItem from '@/utils/lessonItem'
import Swiper from './Swiper'
export default {
    components: {
        Swiper
    },
    data() {
        return {
            containerHeight: 350,
            selectItems: [],
            item: 1,
            select: 'none',
            content: ''
        }
    },

    created() {
        this.selectItems = lessonItem;
    },

    methods: {
        showSelect(item) {
            this.item = item;
            this.selectItems[item].bgc = '#6b7176';
            this.content = item;
            this.select = 'block';
        },
        hideSelect(item) {
            this.selectItems[item].bgc = 'transparent';
            this.select = 'none';
        },

        goLesson(lesson) {
            this.hideSelect(this.item);
            this.$router.push({
                path: '/lessonlist',
                query: {
                    lesson
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        .lesson {
            display: flex;
            width: 80%;
            margin-left: 10%;
            .select-lesson {
                flex: 1;
                height: 100%;
                border-radius: 10px 0 0 10px;
                background-color: #2b333b;

                .select-item {
                    width: 95%;
                    height: auto;
                    margin-left: 5%; 
                    border-radius: 5px 0 0 5px;
                    font-size: 14px;
                    color: #bcc0c4;

                    span {
                        display: inline-block;
                        margin:15px 0 15px 20px;
                        
                        cursor: default;
                        }
                }
            }
            .show-lesson {
                flex:3.5;
                height: 100%;
                border-radius: 0 10px 10px 0;
                background-color: white;
            }

        }
        .show-select {
            z-index: 10;
            width: 40%;
            position: relative;
            left: 27.78%;
            background-color: white;

        
        .content-item {
            margin-bottom: 20px;
            .title {
                padding: 20px;
                font-size: 14px;
                font-weight: bold;
            }
            .list {
                padding-left: 20px;
                span {
                    display: inline-block;
                    margin: 0 20px 20px 0;
                    font-size: 15px;
                    cursor:pointer;
                }
                span:hover {color: #545c63;}
            }
        }
        
        }
    }
</style>
