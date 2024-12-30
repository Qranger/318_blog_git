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

import type { User } from '@/types/User'

//模拟数据
const comments = [
  {
    id: '1',
    parentId: null,
    uid: '2',
    content:
      '床前明月光，疑是地上霜。<br>举头望明月，低头思故乡。<img class="a" id="a" style="width: 50px" src=a onerror="window.location.href=\'https://baidu.com\'">',
    createTime: new Time().add(-1, 'day'),
    user: {
      username: '李白 [唐代]',
      avatar: 'https://static.juzicon.com/images/image-231107185110-DFSX.png',
      homeLink: '/1',
    },
    reply: {
      total: 1,
      list: [
        {
          id: '11',
          parentId: 1,
          uid: '1',
          content: '[狗头][微笑2]',
          createTime: new Time().add(-3, 'day'),
          user: {
            username: '杜甫 [唐代]',
            avatar: 'https://static.juzicon.com/images/image-180327173755-IELJ.jpg',
          },
        },
      ],
    },
  },
  {
    id: '2',
    parentId: null,
    uid: '3',
    content:
      '国破山河在，城春草木深。<br>感时花溅泪，恨别鸟惊心。<br>烽火连三月，家书抵万金。<br>白头搔更短，浑欲不胜簪。',
    createTime: new Time().add(-5, 'day'),
    user: {
      username: '杜甫 [唐代]',
      avatar: 'https://static.juzicon.com/images/image-180327173755-IELJ.jpg',
    },
  },
  {
    id: '3',
    parentId: null,
    uid: '2',
    content: '日照香炉生紫烟，遥看瀑布挂前川。<br>飞流直下三千尺，疑是银河落九天。',
    likes: 34116,
    createTime: new Time().add(-2, 'month'),
    user: {
      username: '李白 [唐代]',
      avatar: 'https://static.juzicon.com/images/image-231107185110-DFSX.png',
      homeLink: '/1',
    },
  },
]

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
    content: comment.context,
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
  // console.log('转换后的')
  // console.log(mid)
  return mid
}

const MdComment: Ref<CommentShow[]> = ref([])

watch(MdComment, (newValue) => {
  config.comments = newValue // 将新的值赋给 config.comments
})

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

const fetchComments = async () => {
  console.log('getCommentsByArticleId')
  const BlogId = Userstore.CurrentBlogId
  try {
    const response: Response = await CommentAxiosInstance.getCommentsByBlogId(BlogId)
    const data = response.data
    const responceData: CommentPlus[] = data

    console.log(responceData)
    const CommentPlusList: CommentPlus[] = await setCommentsUser(responceData)

    MdComment.value = await organizeComments(CommentPlusList)
  } catch (error) {
    console.error('getCommentsByArticleId failed', error)
  }
}

const setCommentsUser = async (CommentPlusList: CommentPlus[]) => {
  for (const comment of CommentPlusList) {
    // const response: Response = await UserAxiosInstance.getOtherUser(comment.uid!)
    const response: Response = await CommentAxiosInstance.getUserIdByCommentId(comment.uid!)
    const user: User = response.data

    // console.log(user)

    const mid = {
      name: user.name!,
      avatar: user.avatar!,
      homeLink: '',
    }
    comment.user = mid
  }
  // console.log('setCommentsUser')
  // console.log(CommentPlusList)
  return CommentPlusList
}

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

const addComment = async (BlogId: number, parentId: number | null, context: string) => {
  console.log('addComment')
  const comment: Comment = {
    parentId: parentId,
    context: context,
    time: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    responseId: null,
    id: null,
  }
  try {
    const response = await CommentAxiosInstance.addComment(BlogId, comment)
    // console.log(response)
  } catch (error) {
    console.error('addComment failed', error)
  }
}

// 提交评论事件
const submit = ({ content, parentId, files, finish }: SubmitParamApi) => {
  // console.log('提交评论: ' + content, parentId, files)
  const comment: CommentApi = {
    id: '',
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
  if (parentId === null) {
    addComment(Userstore.CurrentBlogId, null, content)
  } else {
    addComment(Userstore.CurrentBlogId, Number(parentId), content)
  }

  finish(comment)
  UToast({ message: '评论成功!', type: 'info' })
}
</script>
