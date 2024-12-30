import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import type { Comment } from '@/types/Comment'

import type { Response } from '@/types/Response'

declare module 'axios' {
  export interface AxiosInstance {
    getCommentsByBlogId: (BlogId: number) => Promise<Response>
    addComment: (BlogId: number, comment: Comment) => Promise<Response>
    getUserIdByCommentId: (CommentId: number) => Promise<Response>
  }
}

const CommentBaseUrl: string = import.meta.env.VITE_API_BASEURL+'/comment'

// 创建一个 axios 实例
const CommentAxiosInstance = axios.create({
  baseURL: CommentBaseUrl, // 配置基础路由为 https
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
})
CommentAxiosInstance.getCommentsByBlogId = async (BlogId) => {
  const response = (await CommentAxiosInstance.get('/getCommentsByBlogId', {
    params: {
      id: BlogId,
    },
  })) as Response
  return response
}

CommentAxiosInstance.addComment = async (BlogId, comment) => {
  const response = (await CommentAxiosInstance.post('/addcomment', {
    Id: BlogId,
    comment: comment,
  })) as Response
  return response
}
// 设置请求拦截器
CommentAxiosInstance.interceptors.request.use(
  (config) => {
    const Userstore = useUserStore()
    // 检查 Userstore.UserToken 是否存在
    if (Userstore.UserToken) {
      // 添加 token 到请求头中
      config.headers['satoken'] = `${Userstore.UserToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

CommentAxiosInstance.getUserIdByCommentId = async (CommentId) => {
  const response = (await CommentAxiosInstance.get('/getUserIdByCommentId', {
    params: {
      id: CommentId,
    },
  })) as Response
  return response
}

// 设置响应拦截器
CommentAxiosInstance.interceptors.response.use(
  (response) => {
    // 在这里对响应数据做些什么
    return response.data // 可以根据实际情况做处理，例如只返回数据部分
  },
  (error) => {
    // 对响应错误做些什么
    if (error.response) {
      // 请求已发出，但服务器返回状态码不在 2xx 范围内
      console.error('Response error status:', error.response.status)
      return Promise.reject(error.response) // 返回错误信息
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('No response received:', error.request)
      return Promise.reject('No response received')
    } else {
      // 发生了错误，在设置请求时触发
      console.error('Request error:', error)
      return Promise.reject(error)
    }
  },
)
export default CommentAxiosInstance
