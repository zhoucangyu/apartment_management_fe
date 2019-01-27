import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import parentView from '@/components/parent-view'

import index from '@/views/dashboard/index'
import apartment from '@/views/apartment/apartment.vue'
import student from '@/views/student/student.vue'
import alarm from '@/views/alarm/alarm.vue'

/**
 * hidden: true                                     if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true                             if set true, will always show the root menu, whatever its child routes length
 *                                                                if not set alwaysShow, only more than one route under the children
 *                                                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect                     if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'                         the name is used by <keep-alive> (must set!!!)
 * meta : {
        title: 'title'                             the name show in submenu and breadcrumb (recommend set)
        icon: 'svg-name'                         the icon show in the sidebar,
    }
 **/
export const constantRouterMap = [
    {
        path: '/',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {
                    icon: 'index',
                    title: '首页'
                },
                component: index
            }
        ]
    },
    {
        path: '/apartment',
        component: Layout,
        children: [
            {
                path: '/apartment',
                name: 'apartment',
                meta: {
                    icon: 'apartment',
                    title: '公寓管理'
                },
                component: apartment
            }
        ]
    },
    {
        path: '/student',
        component: Layout,
        children: [
            {
                path: '/student',
                name: 'student',
                meta: {
                    icon: 'user',
                    title: '学生管理'
                },
                component: student
            }
        ]
    },
    {
        path: '/alarm',
        component: Layout,
        children: [
            {
                path: '/alarm',
                name: 'alarm',
                meta: {
                    icon: 'alarm',
                    title: '告警平台'
                },
                component: alarm
            }
        ]
    }
];

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
