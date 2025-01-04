<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div class="main-content">
          <div class="article-section">
            <ol v-if="filteredArticles.length > 0">
              <li v-for="article in filteredArticles_sliced" :key="article.id">
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
        <!-- 分页框 -->
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="10"
          :pager-count="5"
          background
          layout="prev, pager, next"
          :total="filteredArticles.length"
          @current-change="handleCurrentChange"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from 'vue'

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

const currentPage = ref(1)
// 计算属性：筛选符合条件的文章
const filteredArticles = computed(() => {
  // 只有当 ArticleList 非空时才进行过滤
  if (!ArticleList.value || ArticleList.value.length === 0) {
    return [] // 如果 ArticleList 为 null/undefined 或空数组，返回空数组
  }
  return ArticleList.value.filter((article) =>
    article.title.toLowerCase().includes(Userstore.searchText.toLowerCase()),
  )
})

// 计算属性：根据当前页数来筛选文章
const filteredArticles_sliced = computed(() => {
  const startIndex = (currentPage.value - 1) * 10
  const endIndex = Math.min(currentPage.value * 10, filteredArticles.value.length)
  return filteredArticles.value.slice(startIndex, endIndex)
})

// 监听 Userstore.searchText 的变化，重置 currentPage
watch(
  () => Userstore.searchText,
  () => {
    currentPage.value = 1 // 当搜索文本变化时，将当前页重置为第一页
  },
)

// 处理页码变化
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  currentPage.value = val // 只需要更新 currentPage，filteredArticles_sliced 会自动重新计算
}

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
