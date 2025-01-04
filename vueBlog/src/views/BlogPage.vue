<template>
  <div class="article-container">
    <div class="catalog-column">
      <div>
        <!-- <input type="file" @change="handleFileUpload" />
        <p>文章 id:{{ Userstore.CurrentBlogId }}</p>
        <p>作者 id:{{ AuthorId }}</p>
        <p>当前用户 id:{{ Userstore.User.id }}</p>
        <p>是否有编辑权限: {{ EditRight }}</p> -->
      </div>
      <MdArticleCatalog :editorId="id" :scrollElement="scrollElement" />
      <UserCard v-if="AuthorId != -1" :id="AuthorId" />
    </div>
    <div>
      <el-card style="width: 900px" shadow="hover">
        <MdArticlePreview :editorId="id" :modelValue="MdText" />
      </el-card>
      <div class="ArticlePlus">
        <div>
          <el-button
            type="primary"
            @click="editHandler"
            :icon="Edit"
            :disabled="!EditRight"
            circle
          />
          <el-button
            type="danger"
            @click="deleteHandler"
            :icon="Delete"
            :disabled="!EditRight"
            circle
          />
        </div>
      </div>
      <el-divider />
      <MdComment />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'

import { computed, onMounted, reactive, ref } from 'vue'
import MdArticleCatalog from '@/components/MdArticleCatalog.vue'
import MdArticlePreview from '@/components/MdArticlePreview.vue'
import UserCard from '@/components/UserCard.vue'

import MdComment from '@/components/MdComment.vue'

import router from '@/router/index'

import BlogAxiosInstance from '@/apis/blogAxios'


import type { Blog } from '@/types/Blog'
import type { Response } from '@/types/Response'
import type { User } from '@/types/User'

import { useUserStore } from '@/stores/userStore'
const Userstore = useUserStore()

//处理md展示使用的id
const id = 'preview-only'
const scrollElement = document.documentElement

//该页面所有需要数据
const blogAndUser = ref({
  blog: {
    id: -1,
    context: '',
    title: '',
    titleImg: '',
  },
  user: {
    id: -1,
    name: '',
    avatar: '',
  },
})

//控制md显示内容
// const MdText = blogAndUser.value.blog.context

const MdText = ref('')
const AuthorId = ref(-1)
const EditRight = computed(() => {
  if (AuthorId.value == Userstore.User.id) {
    return true
  } else {
    return false
  }
})

// 定义handleFileUpload方法
const handleFileUpload = (event) => {
  // 获取文件列表中的第一个文件对象
  const file = event.target.files[0]
  if (file) {
    // 创建FileReader对象
    const reader = new FileReader()
    // 设置文件读取完毕后的回调函数
    reader.onload = (e) => {
      // 将文件内容赋值给响应式变量mdText
      MdText.value = e.target.result as string
    }
    // 以文本形式读取文件内容
    reader.readAsText(file)
  }
}

const getBlog = async () => {
  console.log('getBlog')
  try {
    const response: Response = await BlogAxiosInstance.getBlogById(Userstore.CurrentBlogId)
    const data = response.data as Blog
    MdText.value = data.content
  } catch (error) {
    console.error('getBlog failed', error)
  }
}

const getAuthorId = async () => {
  console.log('getAuthorId')
  try {
    const response: Response = await BlogAxiosInstance.getUseridByBlogid(Userstore.CurrentBlogId)
    const data = response.data as User
    AuthorId.value = data.id
  } catch (error) {
    console.error('getCruntUser', error)
  }
}

//判断是否是自己的文章
const hasEditRightsForBlog = () => {
  console.log('hasEditRightsForBlog')
  if (AuthorId.value == Userstore.User.id) {
    EditRight.value = true
  } else {
    EditRight.value = false
  }

  console.log('hasEditRightsForBlog  结束')
}

const editHandler = () => {
  console.log('editHandler')
  router.push('BlogEdit')
}

const deleteHandler = async () => {
  console.log('deleteHandler')
  const response: Response = await BlogAxiosInstance.deleteBlog(Userstore.CurrentBlogId)
  const data = response.message
  console.log(data)
  router.push('MyHome')
}

// 初始化数据

onMounted(() => {
  //获取作者id 通过文章id
  getAuthorId()

  // 获取文章数据
  getBlog()
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

.ArticlePlus {
  display: flex;
  justify-content: space-between;
}
</style>
