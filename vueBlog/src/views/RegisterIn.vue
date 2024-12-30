<template>
  <el-form class="form-div" :model="form" label-width="auto" ref="formRef" :rules="rules">
    <div class="upload-container">
      <UploadImageComponent v-model:imgUrl="imgUrl" />
    </div>
    <!-- <p>{{ imgUrl }}</p> -->
    <el-form-item label="UserName" prop="username">
      <el-input placeholder="输入账户" v-model="form.username" />
    </el-form-item>

    <el-form-item label="PassWord" prop="password">
      <el-input type="password" placeholder="输入密码" show-password v-model="form.password" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">RegisterIn</el-button>
      <el-button @click="clear">clearAll</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import type { FormInstance } from 'element-plus'

import UserAxiosInstance from '@/apis/userAxios'

import UploadImageComponent from '@/components/UploadImgComponent.vue'

import { ElNotification } from 'element-plus'
import { h } from 'vue'

import type { User } from '@/types/User'

const message = () => {
  ElNotification({
    title: '注册成功',
    message: h('请进行登录'),
  })
}

const formRef = ref<FormInstance>()

const imgUrl = ref('')

const form = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: 'UserName is required', trigger: 'blur' }],
  password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
}

const Register = async () => {
  try {
    const user: User = {
      name: form.username,
      password: form.password,
      avatar: imgUrl.value,
    }
    const response = await UserAxiosInstance.register(user)
    // console.log(response)
    message()
  } catch (error) {
    console.error('注册出错,用户名重复', error)
  }
}

const onSubmit = () => {
  if (formRef.value) {
    formRef.value.validate(async (Valid) => {
      if (Valid) {
        console.log('submit!')
        Register()
      } else {
        console.log('error submit!')
      }
    })
  }
}

const clear = () => {
  form.username = ''
  form.password = ''
  imgUrl.value = ''
}
</script>

<style scoped>
.form-div {
  max-width: 600px;
  width: 100%; /* 使卡片自适应宽度 */
}

.upload-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-bottom: 20px; /* 添加一些底部外边距 */
}
</style>
