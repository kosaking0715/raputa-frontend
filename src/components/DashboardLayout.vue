<template>
  <el-container class="dashboard-layout" style="height: 100vh">
    <!-- 顶栏 -->
    <el-header class="header">
      <div class="header-left">
        <img src="@/assets/logo.svg" class="logo" alt="Logo" />
        <span class="system-name"> 吞咽障碍智能检测系统 </span>
      </div>
      <div class="header-right">
        <el-avatar :src="avatarUrl" :size="48" v-if="avatarUrl" />
        <el-avatar :icon="User" :size="48" v-else />
        <el-button type="danger" @click="logout">登出</el-button>
      </div>
    </el-header>

    <el-container>
      <!-- 侧栏 -->
      <el-aside :width="isCollapsed ? '64px' : '200px'" class="sidebar">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapsed"
          router
          class="el-menu-vertical-demo"
          unique-opened
        >
          <el-menu-item index="/dashboard/home">
            <el-icon><House /></el-icon>
            <template #title>首页</template>
          </el-menu-item>

          <el-menu-item index="/dashboard/model">
            <el-icon><DataLine /></el-icon>
            <template #title>模型管理</template>
          </el-menu-item>

          <el-menu-item index="/dashboard/patient">
            <el-icon><User /></el-icon>
            <template #title>患者管理</template>
          </el-menu-item>

          <el-menu-item index="/dashboard/data">
            <el-icon><Document /></el-icon>
            <template #title>数据管理</template>
          </el-menu-item>

          <el-menu-item index="/dashboard/monitor">
            <el-icon><Loading /></el-icon>
            <template #title>系统监测</template>
          </el-menu-item>

          <!-- 收缩按钮 -->
          <el-menu-item @click="toggleCollapse">
            <el-icon>
              <component :is="isCollapsed ? Expand : Fold" />
            </el-icon>
            <template #title>{{
              isCollapsed ? '展开菜单' : '收起菜单'
            }}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主体 -->
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import avatarSrc from '@/assets/avatar.png'
import {
  Fold,
  Expand,
  House,
  DataLine,
  User,
  Document,
  Loading,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

const avatarUrl = ref<string>(avatarSrc)
const isCollapsed = ref(false)
const activeMenu = ref(route.path)

watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath
  },
)

function logout() {
  // TODO: 清除 token
  ElMessage.success({
    message: '已登出，正在跳转到登录页',
    duration: 1500,
  })
  setTimeout(() => {
    router.push('/login')
  }, 1500)
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  background: linear-gradient(to right, #1e3c72, #2a5298);
  color: #fff;
}
.header-left {
  display: flex;
  align-items: center;
}
.logo {
  height: 36px;
  margin-right: 0.5rem;
}
.system-name {
  font-size: 1.25rem;
  font-weight: bold;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.el-avatar {
  margin-right: 0.5rem;
}
.sidebar {
  background: linear-gradient(to bottom, #111827, #1f2937);
  color: #d1d5db;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  overflow-x: hidden;
}
.sidebar .el-menu {
  flex: 1;
  border-right: none;
  background-color: transparent;
  padding-top: 12px;
}
:deep(.el-menu-item) {
  color: #cbd5e1;
  border-radius: 0;
  transition: all 0.3s ease;
}
:deep(.el-menu-item:hover) {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}
:deep(.el-menu-item.is-active) {
  background-color: #3b82f6;
  color: #ffffff;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  margin: 4px 0 4px 0;
  padding-left: 20px;
  box-shadow: 2px 0 8px rgba(59, 130, 246, 0.15);
}
:deep(.el-menu--collapse .el-menu-item.is-active) {
  padding: 0 !important;
  margin: 4px 0 !important;
  background-color: #3b82f6;
  color: #ffffff;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 2px 0 8px rgba(59, 130, 246, 0.15);
}
.main-content {
  padding: 1rem;
  background: #f3f4f6;
  color: #1f2937;
  overflow: auto;
}

@media (min-resolution: 5dppx) {
  .system-name {
    display: none;
  }
}
</style>
