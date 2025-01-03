<template>
  <div>
    <!-- 显示 inpurtText -->
    <el-text class="mx-1" size="large">{{ inpurtText }}</el-text>
    <!-- 按钮 -->
    <el-button type="success" plain @click="fun">Success</el-button>
    <!-- 输入框，绑定 inpurtText -->
    <el-input v-model="inpurtText" style="width: 240px" placeholder="Please input" />
    <!-- 显示 Userstore.searchText -->
    <el-text class="mx-1" size="large">{{ Userstore.searchText }}</el-text>
  </div>
  <div>
    <!-- 显示筛选后的文章 -->
    <ul>
      <li v-for="article in filteredArticles" :key="article.title">
        {{ article.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { computed, ref } from 'vue'

// 假设的文章列表
const ArticleList = ref([
  { title: 'Vue 3 Basics', content: 'Learn the basics of Vue 3.' },
  { title: 'Advanced Vue 3', content: 'Dive deeper into Vue 3 features.' },
  { title: 'TypeScript with Vue', content: 'Integrating TypeScript in Vue 3.' },
])

// 引入 userStore
const Userstore = useUserStore()

// 输入文本（inpurtText ）
const inpurtText = ref('')

// 按钮点击时将 inpurtText 赋值给 Userstore.searchText
const fun = () => {
  Userstore.searchText = inpurtText.value
}

// 计算属性：筛选符合条件的文章
const filteredArticles = computed(() => {
  return ArticleList.value.filter((article) =>
    article.title.toLowerCase().includes(Userstore.searchText.toLowerCase())
  )
})
</script>

<style scoped></style>
