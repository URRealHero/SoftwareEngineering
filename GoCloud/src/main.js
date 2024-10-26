// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faHome, faBriefcase, faCloudUploadAlt, faFolder, faSignOutAlt, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
library.add(faHome, faBriefcase, faCloudUploadAlt, faFolder, faSignOutAlt, faSun, faMoon)
createApp(App).use(router).mount('#app')


createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)  // Register FontAwesomeIcon globally
  .use(router)
  .mount('#app')