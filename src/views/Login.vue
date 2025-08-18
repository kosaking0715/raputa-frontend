<template>
  <AuthLayout>
    <div class="form-box">
      <h2 class="form-title">欢迎登录</h2>
      <el-form :model="form" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码" show-password>
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit-btn" type="primary" @click="onSubmit">
            登录
          </el-button>
          <div class="link-row">
            <router-link to="/register">注册新账号</router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/components/AuthLayout.vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const form = reactive({ username: '', password: '' })

const onSubmit = () => {
  // TODO: 调用登录 API
  console.log('login', form)
  ElMessage.success({
    message: '登录成功，正在进入仪表盘',
    duration: 1500,
  })
  setTimeout(() => {
    router.push('/dashboard/patient')
  }, 1500)
}
</script>

<style scoped>
.form-box {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  text-align: center;
}
.form-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.submit-btn {
  display: block;
  width: 100%;
}
.link-row {
  margin-top: 0.5rem;
}
.link-row a {
  color: #409eff;
  font-size: 0.875rem;
}
</style>
