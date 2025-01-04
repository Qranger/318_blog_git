<template>
  <div @click="handleCardClick" class="card">
    <el-avatar :size="50" :src="user.avatar" />
    <p>用户 id :{{ user.id }}</p>
    <p>用户名 name : {{ user.name }}</p>
  </div>
</template>

<script setup lang="ts">
import UserAxiosInstance from '@/apis/userAxios'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import router from '@/router/index'
import type { User } from '@/types/User'
import type { Response } from '@/types/Response'

const Userstore = useUserStore()

const props = defineProps<{
  id: number
}>()

const user = ref({
  id: props.id,
  name: '',
  avatar: '',
})

const getSelfUser = async () => {
  try {
    const response: Response = await UserAxiosInstance.getUserById(props.id)
    const data = response.data as User
    // console.log(data)
    //pinia 状态库
    user.value.id = data.id!
    user.value.name = data.name!
    user.value.avatar = data.avatar!
    // console.log(user)
  } catch (error) {
    console.error('getUser', error)
  }
}
// 处理点击事件
const handleCardClick = () => {
  // 在这里可以定义点击卡片后的行为，例如触发事件或者跳转页面等
  console.log('UserCard clicked!')
  Userstore.visitUserId = user.value.id
    router.push('MyHome')
}

onMounted(() => {
  getSelfUser()
})
</script>

<style scoped>
.card {
  cursor: pointer;
  width: 190px;
  height: 254px;
  background: rgb(255, 255, 255);
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 255, 0.2);
  transition: all 0.2s;
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);

  display: flex;
  Padding: 1em;
}

.card:hover {
  box-shadow: -12px 12px 2px -1px rgba(0, 0, 255, 0.2);
}
</style>
