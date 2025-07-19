<template>
  <AuthLayout>
    <div class="dashboard-box">
      <h2 class="dashboard-title">欢迎来到仪表盘</h2>
      <p>这里是登录后展示的主界面。</p>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '@/components/AuthLayout.vue'
</script>

<style scoped>
.dashboard-box {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  color: #333;
}
.dashboard-title {
  margin-bottom: 1rem;
  font-size: 2rem;
}
</style>
