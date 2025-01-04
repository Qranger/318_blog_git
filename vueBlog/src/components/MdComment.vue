<template>
  <u-comment :config="config" @submit="submit"> </u-comment>
</template>

<script setup lang="ts">
import emoji from '@/assets/emoji'
import { onMounted, reactive, ref, type Ref, watch } from 'vue'

import { UToast, Time, type CommentApi, type CommentSubmitApi, type ConfigApi } from 'undraw-ui'

// 相对时间
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
dayjs.extend(relativeTime)

import { useUserStore } from '@/stores/userStore'
const Userstore = useUserStore()

import CommentAxiosInstance from '@/apis/commentAxios'
import UserAxiosInstance from '@/apis/userAxios'

import type { User } from '@/types/User'

interface CommentShow {
  id: number
  parentId: number | null
  uid: number
  content: string
  createTime: string
  reply: {
    total: number
    list: CommentShow[]
  }
  user: {
    username: string
    avatar: string
    homeLink?: string
  }
}

import type { Comment, CommentPlus } from '@/types/Comment'

const config = reactive<ConfigApi>({
  user: {}, // 当前用户信息
  emoji: emoji, // 表情包数据
  comments: [], // 评论数据
  relativeTime: true, // 开启人性化时间
  show: {
    level: false, // 关闭等级显示
    homeLink: false, // 关闭个人主页链接跳转
    address: false, // 关闭地址信息
    likes: false, // 关闭点赞按钮显示
  },
})

const convertToCommentShow = (comment: CommentPlus): CommentShow => {
  const mid = {
    id: comment.id !== null ? comment.id : 0,
    parentId: comment.parentId,
    uid: 0,
    content: comment.content,
    createTime: comment.time,
    reply: {
      total: 0,
      list: [],
    },
    user: {
      username: comment.user.name!,
      avatar: comment.user.avatar,
      homeLink: '',
    },
  }
  return mid
}

const MdComment: Ref<CommentShow[]> = ref([])

watch(MdComment, (newValue) => {
  config.comments = newValue // 将新的值赋给 config.comments
})

const fetchComments = async () => {
  // console.log('getCommentsByArticleId')
  const BlogId = Userstore.CurrentBlogId
  console.log('fetchComments')
  try {
    const response: Response = await CommentAxiosInstance.getCommentsByBlogId(BlogId)
    const responceData = response.data
    const CommentPlusList: CommentPlus[] = await setCommentsUser(responceData)

    console.log('CommentPlusList', CommentPlusList)
    MdComment.value = await organizeComments(CommentPlusList)
  } catch (error) {
    console.error('getCommentsByArticleId failed', error)
  }
}

const organizeComments = async (comments: CommentPlus[]): Promise<CommentShow[]> => {
  const commentMap = new Map<number, CommentShow>()
  const organized: CommentShow[] = []

  for (const comment of comments) {
    const commentShow = convertToCommentShow(comment)
    commentMap.set(comment.id!, commentShow)
  }

  commentMap.forEach((comment) => {
    if (comment.parentId != null) {
      const parent = commentMap.get(comment.parentId)
      if (parent) {
        parent.reply.list.push(comment)
        parent.reply.total = parent.reply.total + 1
      }
    }
  })

  commentMap.forEach((comment) => {
    if (comment.parentId == null) {
      organized.push(comment)
    }
  })

  return organized
}

const setCommentsUser = async (CommentPlusList: CommentPlus[]) => {
  const userCache: Map<string, User> = new Map(); // 用于缓存用户数据的 Map，key 是 userId，value 是 User 对象

  for (const comment of CommentPlusList) {
    // 获取评论的 userId
    const userId = (await CommentAxiosInstance.getUserIdByCommentId(comment.id!)).data.id;

    // 检查缓存中是否已经存在该 userId
    let user: User;
    if (userCache.has(userId)) {
      // 如果缓存中已有该用户，直接从缓存中获取
      user = userCache.get(userId)!;
    } else {
      // 如果缓存中没有该用户，则通过 API 请求用户数据
      const response = await UserAxiosInstance.getUserById(userId);
      user = response.data;

      // 将获取到的用户数据存入缓存
      userCache.set(userId, user);
    }

    // 创建用户信息对象
    const mid = {
      name: user.name!,
      avatar: user.avatar!,
      homeLink: '', // 如果有用户主页链接，可以在此处填充
    };

    // 将用户数据赋值给评论
    comment.user = mid;
  }

  return CommentPlusList;
};
onMounted(() => {
  // 当前登录用户数据
  config.user = {
    id: Userstore.User.id,
    username: Userstore.User.name,
    avatar: Userstore.User.avatar,
  }
  fetchComments()
  console.log('setCommentsUser')

  // config.comments =comments
  // config.comments = MdComment.value
})

const addComment = async (BlogId: number, parentId: number | null, content: string) => {
  console.log('addComment')
  const comment: Comment = {
    parentId: parentId,
    content: content,
    time: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    responseId: null,
    id: null,
  }
  try {
    const response = await CommentAxiosInstance.addComment(BlogId, comment)
    return response.data
  } catch (error) {
    console.error('addComment failed', error)
  }
}

// 提交评论事件
const submit = ({ content, parentId, finish }: CommentSubmitApi) => {
  let id = null

  if (parentId === null) {
    console.log('评论成功', content, parentId)
    const data = addComment(Userstore.CurrentBlogId, null, content)
    id = data.id
  } else {
    const data = addComment(Userstore.CurrentBlogId, Number(parentId), content)
    id = data.id
  }

  const comment: CommentApi = {
    id: id,
    parentId: parentId,
    uid: config.user.id,
    content: content,
    createTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm'), // 使用dayjs格式化时间
    user: {
      username: config.user.username,
      avatar: config.user.avatar,
    },
    reply: null,
  }

  finish(comment)
  UToast({ message: '评论成功!', type: 'info' })
}
</script>
