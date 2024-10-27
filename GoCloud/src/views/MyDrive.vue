<template>
  <div class="mydrive-container">
    <!-- Floating Window for Recently Accessed Files -->
    <div class="recent-files-window floating">
      <h2>最近访问</h2>
      <div class="recent-files">
        <div
          v-for="file in recentFiles"
          :key="file.id"
          class="recent-file-item"
          @click="openFile(file)"
        >
          <font-awesome-icon :icon="getFileIcon(file.type)" class="file-icon" />
          <span class="file-name">{{ file.name }}</span>
        </div>
      </div>
    </div>

    <!-- Floating Window for File List -->
    <div class="file-list-window floating">
      <div class="file-list-header">
        <!-- Select All Checkbox -->
        <input
          type="checkbox"
          id="select-all"
          v-model="selectAll"
          @change="toggleSelectAll"
        />
        <label for="select-all">全选</label>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button
            :disabled="!anyFileSelected"
            @click="bulkDownload"
            :class="{ disabled: !anyFileSelected }"
          >
            下载
          </button>
          <button
            :disabled="!anyFileSelected"
            @click="bulkDelete"
            :class="{ disabled: !anyFileSelected }"
          >
            删除
          </button>
          <button
            :disabled="!anyFileSelected"
            @click="bulkMove"
            :class="{ disabled: !anyFileSelected }"
          >
            移动
          </button>
          <!-- Undo and Redo Buttons -->
          <font-awesome-icon
            icon="undo"
            class="icon-button"
            @click="undo"
            :class="{ disabled: !canUndo }"
          />
          <font-awesome-icon
            icon="redo"
            class="icon-button"
            @click="redo"
            :class="{ disabled: !canRedo }"
          />
        </div>
      </div>

      <!-- File List Table -->
      <table class="file-table">
        <thead>
          <tr>
            <th></th>
            <th>文件名</th>
            <th>类型</th>
            <th>大小</th>
            <th>修改日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in files" :key="file.id">
            <!-- Selection Checkbox -->
            <td>
              <input
                type="checkbox"
                v-model="file.selected"
                @change="updateSelection"
              />
            </td>
            <td>{{ file.name }}</td>
            <td>{{ file.type }}</td>
            <td>{{ file.size }}</td>
            <td>{{ file.modified }}</td>
            <td>
              <!-- Action buttons -->
              <button @click="downloadFile(file)">下载</button>
              <button @click="deleteFile(file)">删除</button>
              <button @click="moveFile(file)">移动</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faFileAlt,
  faFileImage,
  faFileAudio,
  faFileVideo,
  faFileArchive,
  faFile,
  faFolder,
  faUndo,
  faRedo,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faFileAlt,
  faFileImage,
  faFileAudio,
  faFileVideo,
  faFileArchive,
  faFile,
  faFolder,
  faUndo,
  faRedo
)

// Use router to navigate to files or directories
const router = useRouter()

// Mock data for recent files (6-7 files)
const recentFiles = ref([
  { id: 101, name: '最近文档1.docx', type: '文档', path: '/documents/recent1.docx' },
  { id: 102, name: '最近图片1.png', type: '图片', path: '/images/recent1.png' },
  { id: 103, name: '最近音频1.mp3', type: '音频', path: '/audios/recent1.mp3' },
  { id: 104, name: '最近视频1.mp4', type: '视频', path: '/videos/recent1.mp4' },
  { id: 105, name: '最近文档2.docx', type: '文档', path: '/documents/recent2.docx' },
  { id: 106, name: '最近图片2.png', type: '图片', path: '/images/recent2.png' },
  { id: 107, name: '最近音频2.mp3', type: '音频', path: '/audios/recent2.mp3' },
])

// Mock data for files in the root directory
const files = ref([
  { id: 1, name: '文档1.docx', type: '文档', size: '1.2 MB', modified: '2023-10-01', selected: false },
  { id: 2, name: '图片1.png', type: '图片', size: '2.5 MB', modified: '2023-09-28', selected: false },
  { id: 3, name: '音频1.mp3', type: '音频', size: '5 MB', modified: '2023-09-20', selected: false },
  { id: 4, name: '视频1.mp4', type: '视频', size: '700 MB', modified: '2023-09-15', selected: false },
  { id: 5, name: '其他文件.zip', type: '其他', size: '15 MB', modified: '2023-09-10', selected: false },
  // Add more mock files as needed
])

// State for select all checkbox
const selectAll = ref(false)

// Computed property to check if any file is selected
const anyFileSelected = computed(() => files.value.some(file => file.selected))

// Function to toggle select all files
const toggleSelectAll = () => {
  files.value.forEach(file => {
    file.selected = selectAll.value
  })
}

// Update selectAll checkbox when individual selections change
const updateSelection = () => {
  selectAll.value = files.value.every(file => file.selected)
}

// Bulk actions
const bulkDownload = () => {
  const selectedFiles = files.value.filter(file => file.selected)
  console.log('Bulk downloading files:', selectedFiles)
  // Implement bulk download logic
}

const bulkDelete = () => {
  const selectedFiles = files.value.filter(file => file.selected)
  console.log('Bulk deleting files:', selectedFiles)
  // Implement bulk delete logic
}

const bulkMove = () => {
  const selectedFiles = files.value.filter(file => file.selected)
  console.log('Bulk moving files:', selectedFiles)
  // Implement bulk move logic
}

// Individual file actions
const downloadFile = (file) => {
  console.log('Downloading file:', file)
  // Implement download logic
}

const deleteFile = (file) => {
  console.log('Deleting file:', file)
  // Implement delete logic
}

const moveFile = (file) => {
  console.log('Moving file:', file)
  // Implement move logic
}

// Open recent file or directory
const openFile = (file) => {
  console.log('Opening file:', file)
  // Implement file opening logic, e.g., navigate to file viewer
  // router.push({ name: 'FileViewer', params: { fileId: file.id } })
}

// Get icon based on file type
const getFileIcon = (type) => {
  switch (type) {
    case '文档':
      return 'file-alt'
    case '图片':
      return 'file-image'
    case '音频':
      return 'file-audio'
    case '视频':
      return 'file-video'
    case '其他':
      return 'file-archive'
    case '文件夹':
      return 'folder'
    default:
      return 'file'
  }
}

// Undo and redo stacks
const actionStack = ref([])
const redoStack = ref([])

// Flags to check if undo/redo is possible
const canUndo = computed(() => actionStack.value.length > 0)
const canRedo = computed(() => redoStack.value.length > 0)

// Undo action
const undo = () => {
  if (canUndo.value) {
    const lastAction = actionStack.value.pop()
    redoStack.value.push(lastAction)
    console.log('Undoing action:', lastAction)
    // Implement undo logic based on lastAction
  }
}

// Redo action
const redo = () => {
  if (canRedo.value) {
    const lastUndoneAction = redoStack.value.pop()
    actionStack.value.push(lastUndoneAction)
    console.log('Redoing action:', lastUndoneAction)
    // Implement redo logic based on lastUndoneAction
  }
}
</script>

<style scoped>
.mydrive-container {
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
  max-width: 1200px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.floating:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

/* Recently Accessed Files */
.recent-files-window {
  text-align: center;
}

.recent-files {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.recent-file-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  margin: 10px;
  cursor: pointer;
}

.recent-file-item .file-icon {
  font-size: 2.5em;
  color: #3b82f6;
}

.recent-file-item .file-name {
  margin-top: 8px;
  font-size: 0.9em;
  word-break: break-all;
  text-align: center;
}

/* File List Header */
.file-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.file-list-header label {
  margin-left: 8px;
  font-weight: bold;
}

.action-buttons {
  display: flex;
  align-items: center;
}

.action-buttons button {
  margin-right: 8px;
  padding: 6px 12px;
  background-color: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.action-buttons button.disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

.action-buttons button:hover:not(.disabled) {
  background-color: #2563eb;
}

.icon-button {
  font-size: 1.5em;
  color: #3b82f6;
  margin-left: 8px;
  cursor: pointer;
}

.icon-button.disabled {
  color: #cbd5e1;
  cursor: not-allowed;
}

.icon-button:hover:not(.disabled) {
  color: #2563eb;
}

/* Styles for the file table */
.file-table {
  width: 100%;
  border-collapse: collapse;
}

.file-table th,
.file-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.file-table th {
  background-color: #e0e7ff;
  font-weight: bold;
}

.file-table tr:hover {
  background-color: #f1f5f9;
}

.file-table td input[type='checkbox'] {
  margin-right: 8px;
}

/* Styles for action buttons in table */
.file-table button {
  margin-right: 8px;
  padding: 6px 12px;
  background-color: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.file-table button:hover {
  background-color: #2563eb;
}

/* Dark Mode Styles */
.dark .floating {
  background-color: #1a2a4e;
  color: #ffffff;
}

.dark .file-table th {
  background-color: #334155;
}

.dark .file-table tr:hover {
  background-color: #475569;
}

.dark .file-table button {
  background-color: #3b82f6;
}

.dark .action-buttons button {
  background-color: #3b82f6;
}

.dark .action-buttons button.disabled {
  background-color: #475569;
  color: #94a3b8;
}

.dark .icon-button {
  color: #3b82f6;
}

.dark .icon-button.disabled {
  color: #475569;
}

.dark .recent-file-item .file-icon {
  color: #60a5fa;
}
</style>
