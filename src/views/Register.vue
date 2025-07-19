<template>
  <AuthLayout>
    <div class="form-box">
      <h2 class="form-title">账户注册</h2>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="register-form"
        label-width="0"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            @input="() => validateField('username')"
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            show-password
            @input="() => validateField('password')"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="再次输入密码"
            show-password
            @input="() => validateField('confirmPassword')"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item class="form-actions">
          <el-button class="submit-btn" type="primary" @click="onSubmit">
            注册
          </el-button>
        </el-form-item>

        <!-- 跳转链接 -->
        <div class="link-row">
          <router-link to="/login">已有账号？登录</router-link>
        </div>
      </el-form>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/components/AuthLayout.vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

// 表单字段类型
interface RegisterForm {
  username: string
  password: string
  confirmPassword: string
}

// formRef，FormInstance 非泛型
const formRef = ref<FormInstance | null>(null)

// 响应式表单数据
const form = reactive<RegisterForm>({
  username: '',
  password: '',
  confirmPassword: '',
})

// 验证规则
const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 2,
      max: 20,
      message: '用户名长度应为 2~20 个字符',
      trigger: ['blur', 'change'],
    },
    {
      pattern: /^[\u4e00-\u9fa5A-Za-z0-9]+$/,
      message: '用户名仅支持中文、字母和数字',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 8,
      max: 16,
      message: '密码长度应为 8~16 位',
      trigger: 'blur',
    },
    {
      validator: (
        _rule: any,
        value: string,
        callback: (error?: string | Error) => void,
      ) => {
        // 允许：大小写字母、数字，以及经典特殊字符 ! @ #
        const allowedSymbols = '!@#'
        // 构建正则：^[A-Za-z0-9!@#]+$
        const pattern = new RegExp(
          `^[A-Za-z0-9${allowedSymbols.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\\\$&')}]+$`,
        )
        if (!pattern.test(value)) {
          callback(
            `密码只能包含大小写字母、数字，以及 ${allowedSymbols} 等特殊字符`,
          )
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (
        _rule: any,
        value: any,
        callback: (error?: string | Error) => void,
      ) => {
        if (value !== form.password) {
          callback('两次输入的密码不一致')
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
}

// 路由实例
const router = useRouter()

/** 实时验证某个字段 */
function validateField(field: keyof RegisterForm): void {
  formRef.value?.validateField(field)
}

/** 提交表单 */
function onSubmit(): void {
  formRef.value?.validate((valid: boolean) => {
    if (!valid) return
    // TODO: 调用注册 API
    console.log('register', form)
    ElMessage.success({
      message: '注册成功，即将跳转到登录页面',
      duration: 1500,
    })
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  })
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
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-actions {
  margin-top: 1rem;
}
.submit-btn {
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
