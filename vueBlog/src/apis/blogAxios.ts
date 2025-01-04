import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import type { Blog } from '@/types/Blog'
import type { Response } from '@/types/Response'

declare module 'axios' {
  interface AxiosInstance {
    getBlogById(id: number): Promise<Response>
    getUseridByBlogid(id: number): Promise<Response>
    getUserAllSummaryBlogs(id: number): Promise<Response>
    searchBlogs(blogName: string): Promise<Response>
    addBlog(blog: Blog): Promise<Response>
    deleteBlog(blogId: number): Promise<Response>
    updateBlog(blog: Blog): Promise<Response>
    getAllBlog(): Promise<Response>
  }
}

const BlogBaseUrl: string = import.meta.env.VITE_API_BASEURL + '/blog'

// 创建一个 axios 实例
const BlogAxiosInstance = axios.create({
  baseURL: BlogBaseUrl, // 配置基础路由为 https
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
})

//查询具体id 对应的blog
BlogAxiosInstance.getUseridByBlogid = async (id) => {
  const response = (await BlogAxiosInstance.get('/getUseridByBlogid', {
    params: { id: id },
  })) as Response
  return response
}

BlogAxiosInstance.getBlogById = async (id) => {
  const response = (await BlogAxiosInstance.get('/getBlogById', {
    params: { id: id },
  })) as Response
  return response
}

BlogAxiosInstance.getAllBlog = async () => {
  const response = (await BlogAxiosInstance.get('/getAllSummaryBlogs', {})) as Response
  return response
}

BlogAxiosInstance.getUserAllSummaryBlogs = async (id) => {
  const response = (await BlogAxiosInstance.get('/getUserAllSummaryBlogs', {
    params: { id: id },
  })) as Response
  return response
}

BlogAxiosInstance.searchBlogs = async (blogName) => {
  // 如果 blogName 存在，则传递它，如果不存在则不传递这个参数
  const params = blogName ? { title: blogName } : {}

  // 发起请求
  const response = (await BlogAxiosInstance.get('/searchBlogs', { params })) as Response
  return response
}

BlogAxiosInstance.addBlog = async (Blog) => {
  const formData = Blog
  const response = (await BlogAxiosInstance.post('/addBlog', formData)) as Response
  return response
}

BlogAxiosInstance.deleteBlog = async (BlogId) => {
  const response = (await BlogAxiosInstance.delete('/deleteBlog', {
    params: { id: BlogId },
  })) as Response
  return response
}

BlogAxiosInstance.updateBlog = async (Blog) => {
  const formData = Blog
  const response = (await BlogAxiosInstance.post('/updateBlog', formData)) as Response
  return response
}

// 设置请求拦截器
BlogAxiosInstance.interceptors.request.use(
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

// 设置响应拦截器
BlogAxiosInstance.interceptors.response.use(
  (response) => {
    // 在这里对响应数据做些什么
    return response.data
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
export default BlogAxiosInstance
