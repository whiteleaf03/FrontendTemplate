import * as VueRouter from 'vue-router'
import Login from "@views/Login.vue"
import Home from "@views/Home.vue"
import { useUserStore } from './store'
import { ElMessage } from "element-plus"

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home
    }
]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    const target = to.path

    console.log(userStore.getLevel === 'guest' && target !== '/login')

    // 前往非登录页且未登录 跳转至登录页
    if (userStore.getLevel === 'guest' && target !== '/login') {
        next('/login')
    }

    // 已登录 前往管理员页 且有管理员权限
    //TODO 待处理逻辑
    if (true && userStore.getLevel === 'admin') {
        next()
    }

    // 已登录 前往管理员页 但无管理员权限 原地不动
    //TODO 待处理逻辑
    if (false && userStore.getLevel !== 'admin') {
        ElMessage.error("权限不足")
        next(from.path)
    }

    // 其余情况，放行
    next()
})
