<template>
  <el-form class="form-div" :model="form" label-width="auto" ref="formRef" :rules="rules">
    <el-form-item label="UserName" prop="username">
      <el-input placeholder="输入账户名" v-model="form.username" />
    </el-form-item>

    <el-form-item label="PassWord" prop="password">
      <el-input type="password" placeholder="输入密码" show-password v-model="form.password" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">LoginIn</el-button>
      <el-button @click="clear">clearAll</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import type { FormInstance } from 'element-plus'

import UserAxiosInstance from '@/apis/userAxios'

import { useUserStore } from '@/stores/userStore'
const Userstore = useUserStore()

import router from '@/router/index'

import { messageSucceed, messageWarning, messageInfo, messageError } from '@/utils/notification'

import type { User } from '@/types/User'

const formRef = ref<FormInstance>()

const form = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: 'UserName is required', trigger: 'blur' }],
  password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
}

const LoginIn = async () => {
  try {
    const user: User = {
      name: form.username,
      password: form.password,
    }
    const response = await UserAxiosInstance.login(user)

    // console.log(response)

    Userstore.initializeStore()
    Userstore.UserToken = response.data.token
    Userstore.User.id = response.data.id
    Userstore.User.name = response.data.name
    Userstore.User.avatar = response.data.avatar

    Userstore.visitUserId = response.data.id

    // 跳转到首页
    messageSucceed('登录成功')
    router.push('MyHome')
  } catch (error) {
    messageError('登录失败，用户名或密码错误')
    form.password = ''
  }
}

const onSubmit = () => {
  if (formRef.value) {
    formRef.value.validate(async (Valid) => {
      if (Valid) {
        console.log('submit!')
        LoginIn()
      } else {
        console.log('error submit!')
      }
    })
  }
}

const clear = () => {
  form.username = ''
  form.password = ''
}
</script>

<style scoped>
.form-div {
  max-width: 600px;
  width: 100%; /* 使卡片自适应宽度 */
}
</style>
