// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/Login.vue';
import SignUp from '@/views/SignUp.vue';

const routes = [
    { path: '/', component: Login, name: 'Login' },
    { path: '/signup', component: SignUp, name: 'SignUp' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
