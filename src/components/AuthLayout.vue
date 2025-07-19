<!-- src/components/AuthLayout.vue -->
<template>
  <div class="auth-layout">
    <div class="background" />
    <div class="auth-container">
      <header class="auth-header">
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
        <h1 class="title">吞咽障碍智能检测系统</h1>
      </header>
      <main class="auth-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.auth-layout {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background {
  position: absolute;
  inset: 0;
  background: url('@/assets/auth-background.png') center / cover no-repeat;
  z-index: 1;
}

.auth-container {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
}

.auth-header {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.logo {
  width: 56px;
  height: 56px;
}
.title {
  color: #fff;
  font-size: 1.75rem;
  font-weight: bold;
  white-space: nowrap;
}
.auth-content {
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  min-width: 320px;
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 8px;
}

@media (min-resolution: 3dppx) {
  .auth-header {
    display: none;
  }
  .auth-content {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
