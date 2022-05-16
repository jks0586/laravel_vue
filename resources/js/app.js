require('./bootstrap');
require('../sass/app.scss')

import { createApp } from 'vue'
import App from './components/App.vue'
import router from './routes'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import AdminSidebar from './components/layouts/AdminSidebar'
import Frontheader from './components/layouts/Frontheader'
import CKEditor from '@ckeditor/ckeditor5-vue';
const app = createApp(App)

app.use(VueSweetalert2);
app.use(CKEditor);
app.use(router);

if(localStorage.getItem('isAdmin')){
    app.component('AdminSidebar',AdminSidebar)
    app.mount('#letscms_admin')
} else {
    app.component('Frontheader',Frontheader)
    app.mount('#letscms_front')
}
// import Vue from 'vue'

// window.Vue = require('vue');

// // router
// import router from './routes.js';
// window.router = router;
// window.Fire = new Vue();

// const app = new Vue({
//     el: '#app',
//     router,
// }).$mount('#app');
