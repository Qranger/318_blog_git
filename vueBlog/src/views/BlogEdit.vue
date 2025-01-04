<template>
  <div class="article-container">
    <div>
      <div>
        <MdBlogEditor v-model="text" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref ,onMounted} from 'vue'
import MdBlogEditor from '@/components/MdBlogEditor.vue'

import BlogAxiosInstance from '@/apis/blogAxios'

import type { Response } from '@/types/Response'

import { useUserStore } from '@/stores/userStore'
const Userstore = useUserStore()

const text = ref('# Hello Editor')

const getArticle = async () => {
  console.log('getArticle')

  if (Userstore.CurrentBlogId != 0) {
    try {
      const response = (await BlogAxiosInstance.getBlogById(Userstore.CurrentBlogId)) as Response
      // console.log(response)
      text.value = response.data?.content
    } catch (error) {
      console.error('getArticle failed', error)
    }
  }
}

onMounted(() => {
  getArticle()
})
</script>

<style scoped>
.article-container {
  display: flex;
  justify-content: center;
}

.catalog-column {
  position: sticky;
  top: 0px;
  height: 100vh; /* 可见视窗的高度，可以调整 */
  overflow-y: hidden; /* 添加滚动条，适应内容 */
}
</style>
