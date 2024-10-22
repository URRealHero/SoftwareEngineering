<!-- src/views/Settings.vue -->
<template>
  <div :class="['settings-page', isDarkMode ? 'dark-mode' : 'light-mode']">
    <h2>Settings</h2>

    <!-- Update Username -->
    <section class="settings-section">
      <h3>Update Username</h3>
      <input
        v-model="username"
        type="text"
        placeholder="Enter your new username"
      />
      <button @click="updateUsername">Save Username</button>
    </section>

    <!-- Update Profile Picture -->
    <section class="settings-section">
      <h3>Update Profile Picture</h3>
      <input type="file" @change="onFileChange" />
      <div v-if="profileImage" class="profile-preview">
        <img :src="profileImage" alt="Profile Preview" class="profile-img" />
      </div>
      <button @click="uploadProfilePicture">Upload Picture</button>
    </section>

    <!-- Toggle Notifications -->
    <section class="settings-section">
      <h3>Notification Preferences</h3>
      <label>
        <input type="checkbox" v-model="notificationsEnabled" />
        Enable Notifications
      </label>
    </section>

    <!-- Update Password -->
    <section class="settings-section">
      <h3>Change Password</h3>
      <input
        v-model="currentPassword"
        type="password"
        placeholder="Current Password"
      />
      <input v-model="newPassword" type="password" placeholder="New Password" />
      <button @click="updatePassword">Change Password</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

// Receive dark mode prop from the parent component
const props = defineProps({
  isDarkMode: Boolean,
})

// Define reactive data
const username = ref('John Doe') // Initial username
const profileImage = ref<string | null>(null) // To store profile image preview
const notificationsEnabled = ref(false) // Notification toggle
const currentPassword = ref('') // Current password input
const newPassword = ref('') // New password input

// Update Username Function
const updateUsername = () => {
  if (username.value.trim()) {
    console.log('Username updated to:', username.value)
    alert('Username successfully updated!')
  } else {
    alert('Username cannot be empty.')
  }
}

// Profile Picture Change Handler
const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    profileImage.value = URL.createObjectURL(file) // Preview the selected image
  }
}

// Upload Profile Picture Function
const uploadProfilePicture = () => {
  if (profileImage.value) {
    console.log('Profile picture uploaded:', profileImage.value)
    alert('Profile picture uploaded successfully!')
  } else {
    alert('Please select a profile picture.')
  }
}

// Update Password Function
const updatePassword = () => {
  if (currentPassword.value && newPassword.value) {
    console.log('Password updated!')
    alert('Password updated successfully!')
  } else {
    alert('Please enter both current and new password.')
  }
}
</script>

<style scoped>
.settings-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.settings-section {
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 10px;
}

input[type='text'],
input[type='password'],
input[type='file'] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.profile-preview {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

/* Light mode background for the floating window */
.light-mode {
  background-color: #f9f9f9;
  color: #000;
}

/* Dark mode background for the floating window */
.dark-mode {
  background-color: #333;
  color: #fff;
}

input[type='text'],
input[type='password'],
input[type='file'] {
  background-color: inherit;
  color: inherit;
  border-color: #ccc;
}

button {
  background-color: #4caf50;
  color: white;
}

button:hover {
  background-color: #45a049;
}
</style>
