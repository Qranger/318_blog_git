<template>
  <div>
    <el-card
      class="card bg-base-100 w-72 "
      style="width: 1200px"
      shadow="hover"
      @click="handleCardClick"
    >
      <div class="card-content">
        <img :src="titleImg" alt="Card Image" class="card-image" />
        <div class="card-text">
          <h1>{{ title }}</h1>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import router from '@/router/index'
const Userstore = useUserStore()

// 定义 props
const props = defineProps<{
  titleImg: string
  title: string
  id: number
}>()

// 处理点击事件
const handleCardClick = () => {
  // 在这里可以定义点击卡片后的行为，例如触发事件或者跳转页面等

  if (props.id == 0) {
    router.push('/BlogPageEdit')
  } else {
    console.log('ArticleSummaryCard clicked!')
    console.log('前往文章 id: ' + props.id)
    Userstore.CurrentBlogId = props.id
    router.push('/BlogPage')
  }
}
</script>

<style scoped>
.card-content {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card-image {
  width: 40%; /* 设置固定宽度 */
  height: 200px; /* 设置固定高度 */
  object-fit: cover; /* 保持图片比例并裁剪 */
}

.card-text{
  margin: 100px;
}
</style>
