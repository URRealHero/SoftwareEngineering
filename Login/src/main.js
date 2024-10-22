// src/main.js
import { createApp } from 'vue';
import App from './App.vue'; // 确保 App.vue 是应用的入口文件
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
