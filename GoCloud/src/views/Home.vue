<!-- src/views/Home.vue -->
<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <div class="dashboard-content">
      <!-- File Type Chart -->
      <div class="chart-container">
        <canvas id="fileTypeChart"></canvas>
      </div>
      <!-- Storage Usage Chart -->
      <div class="chart-container">
        <canvas id="storageUsageChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend, ChartDataLabels)

onMounted(() => {
  // File Type Chart
  const fileTypeCtx = (
    document.getElementById('fileTypeChart') as HTMLCanvasElement
  ).getContext('2d')
  new Chart(fileTypeCtx, {
    type: 'doughnut',
    data: {
      labels: ['文档', '图片', '视频', '其他'],
      datasets: [
        {
          data: [12, 20, 38, 30],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderColor: '#fff',
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        datalabels: {
          color: '#fff',
          font: { size: 16, weight: 'bold' },
          textShadowColor: 'rgba(0, 0, 0, 0.7)',
          textShadowBlur: 4,
          formatter: (value: number, ctx: any) => {
            const label = ctx.chart.data.labels[ctx.dataIndex]
            return `${label}\n${value}%`
          },
        },
      },
      cutout: '60%',
      animation: { animateRotate: true, animateScale: true },
    },
  })

  // Storage Usage Chart
  const storageUsageCtx = (
    document.getElementById('storageUsageChart') as HTMLCanvasElement
  ).getContext('2d')
  new Chart(storageUsageCtx, {
    type: 'doughnut',
    data: {
      labels: ['已用', '空闲'],
      datasets: [
        {
          data: [65, 35],
          backgroundColor: [
            'rgba(255, 159, 64, 0.8)',
            'rgba(75, 192, 192, 0.8)',
          ],
          hoverBackgroundColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderColor: '#fff',
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        datalabels: {
          color: '#fff',
          font: { size: 16, weight: 'bold' },
          textShadowColor: 'rgba(0, 0, 0, 0.7)',
          textShadowBlur: 4,
          formatter: (value: number, ctx: any) => {
            const label = ctx.chart.data.labels[ctx.dataIndex]
            return `${label}\n${value}%`
          },
        },
      },
      cutout: '60%',
      animation: { animateRotate: true, animateScale: true },
    },
  })
})
</script>

<style scoped>
.dashboard-content {
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
  background-color: #eef2f5;
  border-radius: 12px;
}

.chart-container {
  width: 45%;
}
</style>
