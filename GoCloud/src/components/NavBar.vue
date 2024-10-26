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
    <ul class="nav-menu" v-if="!isSidebarCollapsed">
      <li :class="{ active: isActive('/') }" @click="navigateTo('/')">
        <font-awesome-icon icon="home" class="icon" />
        <span>主页</span>
      </li>
      <li :class="{ active: isActive('/my-drive') }" @click="navigateTo('/my-drive')">
        <font-awesome-icon icon="briefcase" class="icon" />
        <span>我的网盘</span>
      </li>
      <li :class="{ active: isActive('/upload') }" @click="navigateTo('/upload')">
        <font-awesome-icon icon="cloud-upload-alt" class="icon" />
        <span>上传</span>
      </li>
      <li :class="{ active: isActive('/categories') }" @click="navigateTo('/categories')">
        <font-awesome-icon icon="folder" class="icon" />
        <span>分类</span>
      </li>
    </ul>

    <!-- Log Out Button at the Bottom -->
    <div class="logout-button" v-if="!isSidebarCollapsed" @click="logout">
      <font-awesome-icon icon="sign-out-alt" class="icon" />
      <span>退出</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logo from '@/assets/gocloud.svg'
import avatar from '@/assets/gocloud.png'

const props = defineProps({
  isDarkMode: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['toggle-theme'])

const isSidebarCollapsed = ref(true)

const expandSidebar = () => {
  isSidebarCollapsed.value = false
}

const collapseSidebar = () => {
  isSidebarCollapsed.value = true
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

.sidebar.collapsed .nav-menu li span {
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

.sidebar.collapsed .logout-button span {
  display: none;
}
</style>
