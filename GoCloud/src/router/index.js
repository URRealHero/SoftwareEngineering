// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MyDrive from '../views/MyDrive.vue'
import Upload from '../views/Upload.vue'
import Categories from '../views/Categories/Categories.vue'
import Docs from '../views/Categories/Docs.vue'
import Images from '../views/Categories/Images.vue'
import Videos from '../views/Categories/Videos.vue'
import Audios from '../views/Categories/Audios.vue'
import Others from '../views/Categories/Others.vue'
import Settings from '../views/Settings.vue' // Import Settings.vue

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/my-drive', name: 'MyDrive', component: MyDrive },
  { path: '/upload', name: 'Upload', component: Upload },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    children: [
      { path: 'docs', name: 'Docs', component: Docs },
      { path: 'images', name: 'Images', component: Images },
      { path: 'videos', name: 'Videos', component: Videos },
      { path: 'audios', name: 'Audios', component: Audios },
      { path: 'others', name: 'Others', component: Others },
    ],
  },
  { path: '/settings', name: 'Settings', component: Settings }, // Add Settings route
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
