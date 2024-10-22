<!-- src/App.vue -->
<template>
  <div :class="['main-container', isDarkMode ? 'dark' : 'light']">
    <NavBar :isDarkMode="isDarkMode" @toggle-theme="toggleTheme" />
    <div class="content">
      <router-view :isDarkMode="isDarkMode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'

const isDarkMode = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}
</script>

<style scoped>
.main-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.main-container.dark {
  background-color: #1e1e1e;
  color: #ffffff;
}

.main-container.light {
  background-color: #f0f2f5;
  color: #000000;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
