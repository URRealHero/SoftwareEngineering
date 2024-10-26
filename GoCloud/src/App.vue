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

/* Dark Mode: Deep Blue */
.main-container.dark {
  background-color: #1a2a4e; /* Deep blue background for dark mode */
  color: #ffffff;
}

/* Light Mode: Light Blue */
.main-container.light {
  background-color: #e6f7ff; /* Really light blue background for light mode */
  color: #000000;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
