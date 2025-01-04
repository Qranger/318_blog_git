<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div class="main-content">
          <div class="article-section">
            <ol v-if="filteredArticles.length > 0">
              <li v-for="article in filteredArticles" :key="article.id">
                <BlogSumaryCard
                  :title="article.title"
                  :titleImg="article.titleImg"
                  :id="article.id"
                />
              </li>
            </ol>

            <div v-else>
              <BlogSumaryCard
                :title="blankArticle.title"
                :titleImg="blankArticle.titleImg"
                :id="blankArticle.id"
              />
            </div>
          </div>
          <div v-if="Userstore.User.id != 0" class="user-section">
            <UserCard :id="Userstore.User.id" />
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue'

// 导入子组件
import UserCard from '@/components/UserCard.vue'
import BlogSumaryCard from '@/components/BlogSumaryCard.vue'

import BlogAxiosInstance from '@/apis/blogAxios'
import UserAxiosInstance from '@/apis/userAxios'

import type { Response } from '@/types/Response'
import type { Blog } from '@/types/Blog'
import type { User } from '@/types/User'

import { useUserStore } from '@/stores/userStore'
const Userstore = useUserStore()

//无任何文章时候，显示一个默认导航
const blankArticle = {
  title: 'No Article ,Click to Edit Article',
  titleImg: 'https://imgstroe-redblacktree.oss-accelerate.aliyuncs.com/img/20250103234432875.png',
  id: 0,
}

const ArticleList: Ref<Blog[]> = ref([])

//查询自己文章
const getAllBlogs = async () => {
  console.log('getAllBlogs')
  try {
    const response: Response = await BlogAxiosInstance.getAllBlog()
    const data = response.data as Blog[]
    ArticleList.value = data
    // console.log(ArticleList.value)
  } catch (error) {
    console.error('getUserAllArticle failed', error)
  }
}

const getSelfUser = async () => {
  try {
    const id = Userstore.User.id
    const response: Response = await UserAxiosInstance.getUserById(id)
    const user = response.data as User

    console.log(user)
    //pinia 状态库
    Userstore.User.id = user.id!
    Userstore.User.name = user.name!
  } catch (error) {
    console.error('getUser', error)
  }
}

// 计算属性：筛选符合条件的文章
const filteredArticles = computed(() => {
  return ArticleList.value.filter((article) =>
    article.title.toLowerCase().includes(Userstore.searchText.toLowerCase()),
  )
})

onMounted(async () => {
  getSelfUser()
  getAllBlogs()
})
</script>

<style scoped>
.main-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.article-section {
  flex: 1; /* 根据需要调整这个值 */
}

.user-section {
  flex: 1; /* 根据需要调整这个值 */
}

ol {
  list-style: decimal;
  padding-left: 20px;
}

li {
  margin-bottom: 10px;
}
</style>
