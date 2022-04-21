import { createWebHistory, createRouter } from 'vue-router'
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('./components/Auth/login')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./components/Auth/register')
    },
    {
        path: '/admin/dashboard',
        name: '/admin/dashboard',
        component: () => import('./components/Admin/Dashbaord')
    },
    {
        path: '/admin/category',
        name: '/admin/category',
        component: () => import('./components/Admin/Category/Index')
    },
    {
        path: '/admin/category/add',
        name: '/admin/category/add',
        component: () => import('./components/Admin/Category/Add')
    },
    {
        path: '/admin/category/edit/:id',
        name: '/admin/category/edit',
        component: () => import('./components/Admin/Category/Edit')
    },
    {
        path: '/admin/post',
        name: '/admin/post',
        component: () => import('./components/Admin/Post/Index')
    },
    {
        path: '/admin/post/add',
        name: '/admin/post/add',
        component: () => import('./components/Admin/Post/Add')
    },
    {
        path: '/admin/post/edit/:id',
        name: '/admin/post/edit',
        component: () => import('./components/Admin/Post/Edit')
    },
    {
        path: '/',
        alias: '/tutorials',
        name: 'tutorials',
        component: () => import('./components/Tutorial/TutorialsList')
    },
    {
        path: '/tutorials/:id',
        name: 'tutorial-details',
        component: () => import('./components/Tutorial/Tutorial')
    },
    {
        path: '/add',
        name: 'add',
        component: () => import('./components/Tutorial/AddTutorial')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
