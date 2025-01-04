<template>
  <div class="main-content">
    <div>
      <el-button type="primary" @click="addOrupdataArticle">{{addOrupdataBlog}}</el-button>
      <el-input v-model="title" style="width: 240px" placeholder="Please input the title" />
      <el-button @click="titleImgUrl = ''" type="danger" plain>清除图片</el-button>
    </div>
    <div>
      <UploadImageComponent v-model:imgUrl="titleImgUrl" />
      <!-- <p>titleImgUrl :{{ titleImgUrl }}</p> -->
    </div>
    <div>
      <!-- <p>当前ArticleId: {{ Userstore.CurrentBlogId }}</p> -->
      <MdEditor v-model="mdtext_mode" @onUploadImg="onUploadImg" @onSave="onSaveHandles" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import uploadImage from '@/apis/uploadImage'
import { ref, onMounted } from 'vue'
import UploadImageComponent from '@/components/UploadImgComponent.vue'

import BlogAxiosInstance from '@/apis/blogAxios'

import type { Response } from '@/types/Response'

import { useUserStore } from '@/stores/userStore'

import { messageSucceed, messageWarning, messageInfo, messageError } from '@/utils/notification'
const Userstore = useUserStore()

const mdtext_mode = defineModel()

const titleImgUrl = ref('')
const title = ref('')

const initial = async () => {
  if (Userstore.CurrentBlogId != 0) {
    const response = await BlogAxiosInstance.getBlogById(Userstore.CurrentBlogId)
    console.log(response)
    title.value = response.data?.title
    titleImgUrl.value = response.data?.titleImg

    addOrupdataBlog.value='保存更新'
  }else{
    addOrupdataBlog.value='添加文章'
  }

}

const addOrupdataBlog = ref('')
const onUploadImg = async (files, callback) => {
  console.log('onUploadImg')
  const responseUrls = await Promise.all(files.map((file) => uploadImage(file)))
  console.log(responseUrls)
  callback(responseUrls)
}

const onSaveHandles = async () => {
  console.log('onSaveHandles')
  console.log(mdtext_mode.value)
}

const addOrupdataArticle = () => {
  if (Userstore.CurrentBlogId == 0) {
    addArticle()
  } else {
    updataArticle()
  }
}

const addArticle = async () => {
  const blog = {
    id: 0,
    title: title.value,
    content: mdtext_mode.value,
    titleImg: titleImgUrl.value,
  }
  try {
    const response = (await BlogAxiosInstance.addBlog(blog)) as Response
    console.log(response)
    messageSucceed("博客发布成功")
  } catch (error) {
    console.error('addArticle failed', error)
    messageError("博客发布失败")
  }
}

const updataArticle = async () => {
  const blog = {
    id: Userstore.CurrentBlogId,
    title: title.value,
    content: mdtext_mode.value,
    titleImg: titleImgUrl.value,
  }

  console.log('updataArticle')

  try {
    const response = (await BlogAxiosInstance.updateBlog(blog)) as Response
    console.log(response)
    messageSucceed("博客更新成功")
  } catch (error) {
    console.error('updata failed', error)
    messageError("博客更新失败")
  }
}

onMounted(() => {
  initial()
})

</script>

<style scoped>
.main-content {
  display: flex;
  width: 100vh;
  flex-direction: column;
  height: 80vh;
}
</style>
