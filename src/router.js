import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/home/Home';
import LessonList from './pages/lesson-list/LessonList';
import LessonItem from './pages/lesson-item/LessonItem';
import Teacher from './pages/teacher/Teacher';
import Userinfo from './pages/userinfo/Userinfo';
import Search from './pages/search/Search';

import Test from './pages/test/Test';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path:'/home',
            name: 'home',
            meta: {
                title: '首页'
            },
            component: Home
        },
        {
            path:'/lessonlist',
            name: 'lessonlist',
            meta: {
                title: '课程'
            },
            component: LessonList
        },
        {
            path:'/lessonitem',
            name: 'lessonitem',
            meta: {
                title: '课程'
            },
            component: LessonItem
        },
        {
            path:'/teacher',
            name: 'teachere',
            meta: {
                title: 'teacher'
            },
            component: Teacher
        },
        {
            path:'/userinfo',
            name: 'userinfo',
            meta: {
                title: 'user'
            },
            component: Userinfo
        },
        {
            path:'/search',
            name: 'search',
            meta: {
                title: 'search'
            },
            component: Search
        },
        {
            path: '/test',
            component: Test
        }
    ]
})