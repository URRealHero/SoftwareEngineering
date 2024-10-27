<template>
  <div
    class="sidebar"
    :class="{ collapsed: isSidebarCollapsed }"
    @mouseenter="expandSidebar"
    @mouseleave="collapseSidebar"
  >
    <!-- Theme Toggle Button at the Top Right -->
    <div class="theme-toggle" @click="toggleTheme">
      <font-awesome-icon :icon="isDarkMode ? 'sun' : 'moon'" class="icon" />
    </div>

    <!-- Logo -->
    <div class="logo">
      <img :src="logo" alt="Logo" class="logo-image" />
    </div>

    <!-- User Info (clickable, navigates to settings) -->
    <div class="user-info" v-if="!isSidebarCollapsed" @click="navigateTo('/settings')">
      <div class="avatar-wrapper">
        <img :src="avatar" alt="User Avatar" class="avatar" />
      </div>
      <span class="username">John Doe</span>
    </div>

    <!-- Navigation Menu -->
    <ul class="nav-menu">
      <!-- Home -->
      <li :class="{ active: isActive('/') }" @click="navigateTo('/')">
        <font-awesome-icon icon="home" class="icon" />
        <span v-if="!isSidebarCollapsed">主页</span>
      </li>
      <!-- My Drive -->
      <li :class="{ active: isActive('/my-drive') }" @click="navigateTo('/my-drive')">
        <font-awesome-icon icon="briefcase" class="icon" />
        <span v-if="!isSidebarCollapsed">我的网盘</span>
      </li>
      <!-- Upload -->
      <li :class="{ active: isActive('/upload') }" @click="navigateTo('/upload')">
        <font-awesome-icon icon="cloud-upload-alt" class="icon" />
        <span v-if="!isSidebarCollapsed">上传</span>
      </li>
      <!-- Categories Dropdown -->
      <li class="dropdown">
        <div class="dropdown-toggle" @click="toggleDropdown">
          <font-awesome-icon icon="folder" class="icon" />
          <span v-if="!isSidebarCollapsed">分类</span>
          <font-awesome-icon icon="chevron-down" class="chevron" v-if="!isSidebarCollapsed" />
        </div>
        <!-- Dropdown Menu Shown Only When "分类" Button is Clicked -->
        <ul class="dropdown-menu" v-if="showDropdown && !isSidebarCollapsed">
          <li @click="navigateTo('/categories/docs')">
            <font-awesome-icon icon="file-alt" class="icon" />
            <span>文档</span>
          </li>
          <li @click="navigateTo('/categories/images')">
            <font-awesome-icon icon="file-image" class="icon" />
            <span>图片</span>
          </li>
          <li @click="navigateTo('/categories/videos')">
            <font-awesome-icon icon="file-video" class="icon" />
            <span>视频</span>
          </li>
          <li @click="navigateTo('/categories/audios')">
            <font-awesome-icon icon="file-audio" class="icon" />
            <span>音频</span>
          </li>
          <li @click="navigateTo('/categories/others')">
            <font-awesome-icon icon="file" class="icon" />
            <span>其他</span>
          </li>
        </ul>
      </li>
    </ul>

    <!-- Log Out Button at the Bottom -->
    <div class="logout-button" @click="logout">
      <font-awesome-icon icon="sign-out-alt" class="icon" />
      <span v-if="!isSidebarCollapsed">退出</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logo from '@/assets/gocloud.svg'
import avatar from '@/assets/gocloud.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSun,
  faMoon,
  faHome,
  faBriefcase,
  faCloudUploadAlt,
  faFolder,
  faChevronDown,
  faFileAlt,
  faFileImage,
  faFileVideo,
  faFileAudio,
  faFile,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faSun,
  faMoon,
  faHome,
  faBriefcase,
  faCloudUploadAlt,
  faFolder,
  faChevronDown,
  faFileAlt,
  faFileImage,
  faFileVideo,
  faFileAudio,
  faFile,
  faSignOutAlt
)

const props = defineProps({
  isDarkMode: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['toggle-theme'])

const isSidebarCollapsed = ref(true)
const showDropdown = ref(false) // Manage dropdown visibility

const expandSidebar = () => {
  isSidebarCollapsed.value = false
}

const collapseSidebar = () => {
  isSidebarCollapsed.value = true
  showDropdown.value = false
}

// Toggle dropdown visibility on click
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const router = useRouter()
const route = useRoute()

const navigateTo = (path: string) => {
  router.push(path)
}

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

// Emit toggle theme event
const toggleTheme = () => {
  emit('toggle-theme')
}

// Log out function
const logout = () => {
  console.log('Logging out...')
  router.push('/login')
}
</script>

<style scoped>
/* Sidebar styles */
.sidebar {
  position: relative;
  background-color: #2f323a;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 200px;
  transition: width 0.3s, opacity 0.3s;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 60px;
}

/* Theme Toggle Button at the Top Right */
.theme-toggle {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.theme-toggle .icon {
  font-size: 1.5em;
  color: #ffffff;
}

/* Logo styles */
.logo {
  margin-bottom: 20px;
}

.logo-image {
  width: 60px;
}

.sidebar.collapsed .logo-image {
  width: 40px;
}

/* User Info styles */
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
}

.user-info:hover {
  opacity: 0.8;
}

.avatar-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.sidebar.collapsed .avatar-wrapper {
  width: 30px;
  height: 30px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.username {
  font-size: 1em;
  font-weight: bold;
}

.sidebar.collapsed .username {
  display: none;
}

/* Navigation Menu styles */
.nav-menu {
  list-style: none;
  padding: 0;
  width: 100%;
}

.nav-menu li {
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-menu li.active {
  background-color: #444a56;
}

.nav-menu li:hover {
  background-color: #444a56;
}

.nav-menu li .icon {
  margin-right: 10px;
  font-size: 1.5em;
  color: #ffffff;
}

.sidebar.collapsed .nav-menu li .icon {
  margin-right: 0;
}

.sidebar.collapsed .nav-menu li span {
  display: none;
}

/* Dropdown Menu Styles */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  width: 100%;
}

.dropdown-toggle .chevron {
  margin-left: auto;
  font-size: 1em;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #2f323a;
  width: 150px;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1;
}

.dropdown-menu li {
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 0.85em;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #444a56;
}

.dropdown-menu li .icon {
  margin-right: 10px;
  font-size: 1.2em;
  color: #ffffff;
}

/* Adjustments for collapsed sidebar */
.sidebar.collapsed .dropdown-menu {
  display: none;
}

/* Log Out Button at the Bottom */
.logout-button {
  margin-top: auto;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #444a56;
}

.logout-button .icon {
  margin-right: 10px;
  font-size: 1.5em;
  color: #ffffff;
}

.sidebar.collapsed .logout-button .icon {
  margin-right: 0;
}

.sidebar.collapsed .logout-button span {
  display: none;
}
</style>
