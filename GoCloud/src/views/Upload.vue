<template>
  <div class="upload-container">
    <!-- Floating Window for File Selection -->
    <div class="file-selection-window floating">
      <h2>选择上传文件</h2>
      <div
        class="upload-area"
        @dragover.prevent
        @dragenter.prevent
        @drop.prevent="handleDrop"
      >
        <p>将文件拖放到此处，或</p>
        <button @click="triggerFileInput">选择文件</button>
        <input
          type="file"
          ref="fileInput"
          multiple
          @change="handleFileSelect"
          style="display: none;"
        />
      </div>
      <!-- List of Selected Files -->
      <div v-if="selectedFiles.length" class="selected-files">
        <h3>已选择文件:</h3>
        <ul>
          <li v-for="(file, index) in selectedFiles" :key="index">
            {{ file.name }} ({{ formatFileSize(file.size) }})
            <font-awesome-icon
              icon="times-circle"
              class="remove-file-icon"
              @click="removeFile(index)"
            />
          </li>
        </ul>
      </div>
    </div>

    <!-- Floating Window for Destination Selection -->
    <div class="destination-selection-window floating">
      <h2>选择上传位置</h2>
      <div class="folder-tree">
        <ul>
          <li v-for="folder in folders" :key="folder.id">
            <div
              :class="['folder-item', { selected: selectedFolder.id === folder.id }]"
              @click="selectFolder(folder)"
            >
              <font-awesome-icon icon="folder" class="folder-icon" />
              {{ folder.name }}
            </div>
            <!-- Nested folders -->
            <ul v-if="folder.subfolders">
              <li
                v-for="subfolder in folder.subfolders"
                :key="subfolder.id"
                @click.stop="selectFolder(subfolder)"
              >
                <div
                  :class="['folder-item', { selected: selectedFolder.id === subfolder.id }]"
                >
                  <font-awesome-icon icon="folder" class="folder-icon" />
                  {{ subfolder.name }}
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- Upload Button -->
    <div class="upload-button-container">
      <button
        :disabled="!canUpload"
        @click="uploadFiles"
        :class="{ disabled: !canUpload }"
      >
        开始上传
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimesCircle, faFolder } from '@fortawesome/free-solid-svg-icons'

library.add(faTimesCircle, faFolder)

// File selection
const selectedFiles = ref<File[]>([])

// Reference to the hidden file input
const fileInput = ref<HTMLInputElement | null>(null)

// Function to trigger the file input
const triggerFileInput = () => {
  fileInput.value?.click()
}

// Handle file selection from file input
const handleFileSelect = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files) {
    for (let i = 0; i < files.length; i++) {
      selectedFiles.value.push(files[i])
    }
  }
}

// Handle files dropped into the upload area
const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files) {
    for (let i = 0; i < files.length; i++) {
      selectedFiles.value.push(files[i])
    }
  }
}

// Remove a file from the selected files list
const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

// Format file size
const formatFileSize = (size: number) => {
  if (size < 1024) return size + ' B'
  else if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB'
  else if (size < 1024 * 1024 * 1024)
    return (size / (1024 * 1024)).toFixed(1) + ' MB'
  else return (size / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
}

// Destination selection
const folders = ref([
  { id: 1, name: '根目录', subfolders: [
    { id: 2, name: '文档', subfolders: null },
    { id: 3, name: '图片', subfolders: null },
    { id: 4, name: '视频', subfolders: null },
  ]},
])

const selectedFolder = ref({ id: 1, name: '根目录' })

// Select a folder
const selectFolder = (folder) => {
  selectedFolder.value = folder
}

// Computed property to enable the upload button
const canUpload = computed(() => selectedFiles.value.length > 0 && selectedFolder.value)

// Upload files
const uploadFiles = () => {
  console.log('Uploading files:', selectedFiles.value)
  console.log('To folder:', selectedFolder.value)
  // Implement the upload logic here
}
</script>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
}

/* Reuse floating window styles */
.floating {
  background-color: #f0f8ff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 80%;
  max-width: 800px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.floating:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

/* Upload Area Styles */
.upload-area {
  border: 2px dashed #3b82f6;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
}

.upload-area p {
  font-size: 1.2em;
  color: #666;
}

.upload-area button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.upload-area button:hover {
  background-color: #2563eb;
}

/* Selected Files Styles */
.selected-files {
  margin-top: 20px;
}

.selected-files h3 {
  margin-bottom: 10px;
}

.selected-files ul {
  list-style: none;
  padding: 0;
}

.selected-files li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.selected-files li .remove-file-icon {
  margin-left: 10px;
  color: #f87171;
  cursor: pointer;
}

.selected-files li .remove-file-icon:hover {
  color: #ef4444;
}

/* Folder Tree Styles */
.folder-tree {
  margin-top: 20px;
}

.folder-tree ul {
  list-style: none;
  padding-left: 20px;
}

.folder-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 0;
}

.folder-item:hover {
  color: #2563eb;
}

.folder-item.selected {
  font-weight: bold;
  color: #2563eb;
}

.folder-icon {
  margin-right: 8px;
  color: #fbbf24;
}

/* Upload Button Styles */
.upload-button-container {
  margin-top: 20px;
}

.upload-button-container button {
  padding: 12px 24px;
  background-color: #10b981;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1em;
}

.upload-button-container button.disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.upload-button-container button:hover:not(.disabled) {
  background-color: #059669;
}

/* Dark Mode Styles */
.dark .floating {
  background-color: #1a2a4e;
  color: #ffffff;
}

.dark .upload-area {
  border-color: #60a5fa;
}

.dark .upload-area p {
  color: #cbd5e1;
}

.dark .upload-area button {
  background-color: #3b82f6;
}

.dark .upload-area button:hover {
  background-color: #2563eb;
}

.dark .selected-files li .remove-file-icon {
  color: #fca5a5;
}

.dark .selected-files li .remove-file-icon:hover {
  color: #f87171;
}

.dark .folder-item:hover {
  color: #60a5fa;
}

.dark .folder-item.selected {
  color: #60a5fa;
}

.dark .folder-icon {
  color: #fbbf24;
}

.dark .upload-button-container button {
  background-color: #10b981;
}

.dark .upload-button-container button:hover:not(.disabled) {
  background-color: #059669;
}
</style>
