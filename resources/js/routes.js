import { createWebHistory, createRouter } from 'vue-router'
import middlewarePipeline  from './middleware/middlewarePipeline';
import authuser from './middleware/authuser';
import admin from './middleware/admin';
const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('./components/Front/Home')
    },
    {
        path: '/post/:id/:title',
        name: 'post',
        component: () => import('./components/Front/Postdetail')
    },
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
        path: '/admin/user/edit/:id',
        name: 'userget',
        component: () => import('./components/Admin/Users/Edit')
    },
    {
        path: '/admin/user/add',
        name: 'usercreate',
        component: () => import('./components/Admin/Users/Add')
    },
    {
        path: '/admin',
        name: '/admin',
        meta:{ middleware: [authuser,admin] },
        component: () => import('./components/Admin/Dashbaord')
    },
    {
        path: '/admin/dashboard',
        name: '/admin/dashboard',
        meta:{ middleware: [authuser,admin] },
        component: () => import('./components/Admin/Dashbaord')
    },
    {
        path: '/admin/category',
        name: '/admin/category',
        meta:{ middleware: [authuser,admin] },
        component: () => import('./components/Admin/Category/Index')
    },
    {
        path: '/admin/category/add',
        name: '/admin/category/add',
        meta:{ middleware: [authuser,admin] },
        component: () => import('./components/Admin/Category/Add')
    },
    {
        path: '/admin/category/edit/:id',
        name: '/admin/category/edit',
        meta:{ middleware: [authuser,admin] },
        component: () => import('./components/Admin/Category/Edit')
    },
    {
        path: '/admin/post',
        name: '/admin/post',
        meta:{ middleware: [authuser,admin] },
        component: () => import('./components/Admin/Post/Index')
    },
    {
        path: '/admin/post/add',
        name: '/admin/post/add',
        meta:{ middleware: [authuser,admin] },
        component: () => import('./components/Admin/Post/Add')
    },
    {
        path: '/admin/post/edit/:id',
        name: '/admin/post/edit',
        meta:{ middleware: [authuser,admin] },
        component: () => import('./components/Admin/Post/Edit')
    },
    {
        path: '/admin/users',
        name: '/admin/users',
        meta:{ middleware: [authuser,admin] },
        component: () => import('./components/Admin/Users/Index')
    },
    {
        path: '/admin/users/add',
        name: '/admin/users/add',
        meta:{ middleware: [authuser,admin] },
        component: () => import('./components/Admin/Users/Add')
    },
    {
        path: '/admin/users/edit/:id',
        name: '/admin/users/edit',
        meta:{ middleware: [admin],authuser },
        component: () => import('./components/Admin/Users/Edit')
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const middleware = to.meta.middleware;
    const context = { to, from, next };
    // console.log(to);
    // Check if no middlware on route
    if (!middleware) {
      return next();
    }

    middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1),
     });
  });

export default router
