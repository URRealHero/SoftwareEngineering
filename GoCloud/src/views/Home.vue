<template>
  <div class="home-container">
    <!-- Floating Window for Welcoming Message -->
    <div class="welcome-window floating">
      <p>{{ getGreetingMessage() }}, "{{ username }}"</p>
      <p>
        祝你今日愉快！今天你的网盘里有 <strong>{{ fileCounts.docs }}</strong> 文本文件，
        <strong>{{ fileCounts.images }}</strong> 图片，<strong>{{ fileCounts.audios }}</strong> 音频文件，
        <strong>{{ fileCounts.videos }}</strong> 视频文件 和 <strong>{{ fileCounts.others }}</strong> 其他文件。
      </p>
    </div>

    <!-- Floating Window for File Type Chart -->
    <div class="chart-window floating">
      <h2>File Types</h2>

      <!-- Donut Chart -->
      <div class="chart-container">
        <canvas id="fileTypeChart"></canvas>
      </div>

      <!-- Bar Chart -->
      <div class="chart-container">
        <canvas id="fileTypeBarChart"></canvas>
      </div>

      <!-- Detailed Labels -->
      <div class="details">
        <div class="details-item">文档: <strong>{{ fileCounts.docs }}</strong></div>
        <div class="details-item">图片: <strong>{{ fileCounts.images }}</strong></div>
        <div class="details-item">音频: <strong>{{ fileCounts.audios }}</strong></div>
        <div class="details-item">视频: <strong>{{ fileCounts.videos }}</strong></div>
        <div class="details-item">其他: <strong>{{ fileCounts.others }}</strong></div>
      </div>
    </div>

    <!-- Floating Window for Storage Usage Chart -->
    <div class="chart-window floating">
      <h2>Storage Usage</h2>

      <!-- Donut Chart for Storage Usage -->
      <div class="chart-container">
        <canvas id="storageUsageChart"></canvas>
      </div>

      <!-- Bar Chart for Storage Usage -->
      <div class="chart-container">
        <canvas id="storageUsageBarChart"></canvas>
      </div>

      <!-- Detailed Labels for Storage Usage -->
      <div class="details">
        <div class="details-item">已用: <strong>{{ usedStorage }} GB</strong></div>
        <div class="details-item">空闲: <strong>{{ freeStorage }} GB</strong></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart, DoughnutController, BarController, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

// Mocking username and file count data
const username = 'John Doe'
const fileCounts = {
  docs: 12,
  images: 20,
  audios: 5,
  videos: 8,
  others: 4,
}

// Mock storage usage data (in GB)
const usedStorage = 65  // Example: 65 GB used
const totalStorage = 100 // Example: 100 GB total capacity
const freeStorage = totalStorage - usedStorage

// Function to get dynamic greeting based on the time of day
const getGreetingMessage = () => {
  const hour = new Date().getHours()
  if (hour < 12) return '早上好'
  if (hour < 18) return '下午好'
  return '晚上好'
}

// Register Chart.js components
Chart.register(DoughnutController, BarController, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

onMounted(() => {
  // File Type Donut Chart
  const fileTypeCtx = document.getElementById('fileTypeChart') as HTMLCanvasElement
  const fileTypeChart = new Chart(fileTypeCtx, {
    type: 'doughnut',
    data: {
      labels: ['文档', '图片', '音频', '视频', '其他'],
      datasets: [{
        label: '文档数量',
        data: [fileCounts.docs, fileCounts.images, fileCounts.audios, fileCounts.videos, fileCounts.others],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      }],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const type = tooltipItem.label
              const count = tooltipItem.raw
              const size = fileSizes[type === '文档' ? 'docs' : type === '图片' ? 'images' : type === '音频' ? 'audios' : type === '视频' ? 'videos' : 'others']
              const percentage = ((count / Object.values(fileCounts).reduce((a, b) => a + b)) * 100).toFixed(2)
              return `${type}: ${count} 文件, ${size} GB, ${percentage}%`
            }
          }
        },
        legend: {
          display: true,
          position: 'right', // Display legend for donut chart on the right
        },
      },
      animation: {
        animateScale: true,
      },
      cutout: '60%', // Make the donut chart bigger
      hoverOffset: 10, // Add hover effect
    }
  })

  // File Type Bar Chart
  const fileTypeBarCtx = document.getElementById('fileTypeBarChart') as HTMLCanvasElement
  new Chart(fileTypeBarCtx, {
    type: 'bar',
    data: {
      labels: ['文档', '图片', '音频', '视频', '其他'],  // Categories as labels
      datasets: [{
        label: '文件数量',
        data: [fileCounts.docs, fileCounts.images, fileCounts.audios, fileCounts.videos, fileCounts.others],  // File counts
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',  // 文档
          'rgba(54, 162, 235, 0.8)',  // 图片
          'rgba(75, 192, 192, 0.8)',  // 音频
          'rgba(153, 102, 255, 0.8)', // 视频
          'rgba(255, 206, 86, 0.8)',  // 其他
        ],
        borderColor: '#fff',
        borderWidth: 1,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,  // Ensure the legend is visible
          position: 'top',  // Position the legend at the top
        }
      },
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      }
    }
  })

  // Storage Usage Donut Chart
  const storageUsageCtx = document.getElementById('storageUsageChart') as HTMLCanvasElement
  new Chart(storageUsageCtx, {
    type: 'doughnut',
    data: {
      labels: ['已用', '空闲'],
      datasets: [{
        label: 'Storage Usage',
        data: [usedStorage, freeStorage],  // Storage usage in GB
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',  // Used storage (Red color)
          'rgba(75, 192, 192, 0.8)',  // Free storage (Green color)
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 1)',  // Used storage on hover
          'rgba(75, 192, 192, 1)',  // Free storage on hover
        ],
        borderWidth: 2,
        borderColor: '#fff',
      }],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const type = tooltipItem.label
              const amount = tooltipItem.raw
              const percentage = ((amount / totalStorage) * 100).toFixed(2)
              return `${type}: ${amount} GB, ${percentage}%`
            }
          }
        },
        legend: {
          display: true,
          position: 'right',  // Display legend for storage usage on the right
        },
      },
      animation: {
        animateScale: true,
      },
      cutout: '60%',  // Make the donut chart bigger
      hoverOffset: 10,  // Add hover effect
    }
  })

  // Storage Usage Bar Chart
  const storageUsageBarCtx = document.getElementById('storageUsageBarChart') as HTMLCanvasElement
  new Chart(storageUsageBarCtx, {
    type: 'bar',
    data: {
      labels: ['已用', '空闲'],  // Labels for bar chart
      datasets: [{
        label: '空间使用',
        data: [usedStorage, freeStorage],  // Storage usage in GB
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',  // Used storage (Red color)
          'rgba(75, 192, 192, 0.8)',  // Free storage (Green color)
        ],
        borderColor: '#fff',
        borderWidth: 1,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,  // Ensure the legend is visible
          position: 'top',  // Position the legend at the top
        }
      },
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      }
    }
  })
})
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
}

/* Floating window styles */
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

/* Welcome message styles */
.welcome-window {
  text-align: center;
  font-size: 1.5em;
  color: #333;
  animation: fadeIn 1s ease-in-out;
}

.welcome-window p {
  line-height: 1.6;
}

/* Chart container styles (Center the charts) */
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px; /* Increased height for a bigger donut chart */
  margin-bottom: 20px;
}

/* Detailed labels */
.details {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 1.2em;
  color: #333;
}

.details-item {
  padding: 0 10px;
}

/* Animation for the welcome window */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
