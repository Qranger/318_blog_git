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
          <div v-if="visitUserId != 0" class="user-section">
            <UserCard :id="visitUserId" />
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

const visitUserId =Userstore.visitUserId

//查询文章
const getBlogs = async () => {
  console.log('getUserAllArticle')
  try {
    const response: Response = await BlogAxiosInstance.getUserAllSummaryBlogs(visitUserId)
    const data = response.data as Blog[]

    // console.log(data)
    ArticleList.value = data
    // console.log(ArticleList.value)
  } catch (error) {
    console.error('getUserAllArticle failed', error)
  }
}

// const getUser = async () => {
//   try {

//     const response: Response = await UserAxiosInstance.getUserById(visitUserId)
//     const user = response.data as User

//     console.log(user)
//   } catch (error) {
//     console.error('getUser', error)
//   }
// }
// 计算属性：筛选符合条件的文章
const filteredArticles = computed(() => {
  // 只有当 ArticleList 非空时才进行过滤
  if (!ArticleList.value || ArticleList.value.length === 0) {
    return []; // 如果 ArticleList 为 null/undefined 或空数组，返回空数组
  }
  return ArticleList.value.filter((article) =>
    article.title.toLowerCase().includes(Userstore.searchText.toLowerCase())
  );
});

onMounted(async () => {
  // getUser()
  getBlogs()
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
