<template>
  <div>
    <el-card style="width: 800px" shadow="hover" @click="handleCardClick">
      <div class="card-content">
        <img :src="titleImg" alt="Card Image" class="card-image" />
        <div class="card-text">
          <h1>{{ title }}</h1>
        </div>
      </div>
    </el-card>
  </div>

  <div class="card glass w-96"  @click="handleCardClick">
  <figure class= "w-232 h-">
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="car!" />
  </figure>
  <div class="card-body">
    <p>{{ title }}</p>
  </div>
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
  width: 100px; /* 设置固定宽度 */
  height: 100px; /* 设置固定高度 */
  object-fit: cover; /* 保持图片比例并裁剪 */
}
</style>
