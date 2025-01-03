<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="基础信息" name="first">
      <el-form class="form-div" :model="userInform" label-width="auto" ref="formRef" :rules="rules">
        <div class="upload-container">
          <UploadImageComponent v-model:imgUrl="userInform.avatar" />
        </div>
        <el-form-item label="UserName" prop="name">
          <el-input placeholder="输入账户" v-model="userInform.name" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">更改</el-button>
          <el-button type="danger" plain @click="clearAvatar">重置头像</el-button>
          <el-button @click="clear">clearAll</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="安全信息" name="second">
      <el-form class="form-div" :model="userInform" label-width="auto" ref="formRef" :rules="rules">
        <div class="upload-container">
          <UploadImageComponent v-model:imgUrl="userInform.avatar" />
        </div>

        <el-form-item label="oldPassword" prop="oldPassword">
          <el-input
            type="password"
            placeholder="输入旧密码"
            show-password
            v-model="userInform.oldPassword"
          />
        </el-form-item>

        <el-form-item label="PassWord" prop="password">
          <el-input
            type="password"
            placeholder="输入新密码"
            show-password
            v-model="userInform.password"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">更改</el-button>
          <el-button @click="clear">clearAll</el-button>
        </el-form-item>
      </el-form></el-tab-pane
    >
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'

import UserAxiosInstance from '@/apis/userAxios'
import UploadImageComponent from '@/components/UploadImgComponent.vue'

import { ElNotification } from 'element-plus'
import { h } from 'vue'

import type { User } from '@/types/User'

import { useUserStore } from '@/stores/userStore'
const Userstore = useUserStore()

const userInform = ref({
  id: -1,
  name: '',
  avatar: '',
  password: '',
  oldPassword: '',
})

const initial = () => {
  userInform.value.name = Userstore.User.name
  userInform.value.avatar = Userstore.User.avatar
  userInform.value.id = Userstore.User.id
}

const message = (str: string) => {
  ElNotification({
    title: str,
    message: h(str),
  })
}

const formRef = ref<FormInstance>()

initial()
const rules = {
  name: [{ required: false, message: 'Name is required', trigger: 'blur' }],
  password: [{ required: false, message: 'Password is required', trigger: 'blur' }],
  oldPassword: [{ required: false, message: 'Password is required', trigger: 'blur' }],
}

const updateBaseInfo = async () => {
  try {
    const user: User = {
      name: userInform.value.name,
      avatar: userInform.value.avatar,
    }
    const response = await UserAxiosInstance.updateBaseInfo(user)
    if (response.success) {
      message('修改成功')
    } else {
      message('账户名重复')
    }
  } catch (error) {
    message('账户名重复')
  }
}

const updateSecurityInfo = async () => {
  try {
    const user = {
      password: userInform.value.password,
      oldPassword: userInform.value.oldPassword,
    }
    const response = await UserAxiosInstance.updateSecurityInfo(user)
    if (response.success) {
      message('修改成功')
    } else {
      message('原密码错误')
    }
  } catch (error) {
    message('原密码错误')
  }
}

const onSubmit = () => {
  if (formRef.value) {
    formRef.value.validate(async (Valid) => {
      if (Valid) {
        console.log('submit!')

        if (activeName.value == 'first') {
          console.log('基础信息')
          updateBaseInfo()
        } else if (activeName.value == 'second') {
          console.log('安全信息')
          updateSecurityInfo()
        }
      } else {
        console.log('error submit!')
      }
    })
  }
}

const clearAvatar = () => {
  userInform.value.avatar = ''
}

const clear = () => {
  if (activeName.value == 'first') {
    userInform.value.name = ''
    userInform.value.password = ''
    userInform.value.avatar = ''
  } else {
    userInform.value.oldPassword = ''
    userInform.value.password = ''
  }
}

//table表单切换
import type { TabsPaneContext } from 'element-plus'
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
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

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
