// src/services/axios.js
import axios from 'axios'
import { useUserStore } from '../stores/userStore'

import type { Blog } from '../types/Blog'

declare module 'axios' {
  interface AxiosInstance {
    getBlogById(id: number): Promise<unknown>;
  }
}

import { createPinia } from 'pinia';
const pinia = createPinia();

// declare module 'axios' {
//   export interface AxiosInstance {
//     getUserAllSummaryArticles: (uid: number) => Promise<any>
//     getAllSummaryArticles: (uid: number) => Promise<any>
//     getArticle: (articleId: number) => Promise<any>
//     updateArticle: (article: Blog) => Promise<any>
//     addArticle: (article: Blog) => Promise<any>
//     getArticleDynamic: (articleId: number) => Promise<any>
//     certifyUser: (articleId: number) => Promise<any>
//     deleteArticle: (articleId: number) => Promise<any>
//     getUserByArticleId: (articleId: number) => Promise<any>

//     increaseLikeCount: (articleId: number) => Promise<any>
//     increaseDislikeCount: (articleId: number) => Promise<any>

//     getArticleDynamicCount: (articleId: number) => Promise<any>
//   }
// }




const mockBlogBaseUrl: string = 'http://127.0.0.1:4523/m1/5682619-5363514-default/blog';


// 创建一个 axios 实例
const BlogAxiosInstance = axios.create({
  baseURL: mockBlogBaseUrl, // 配置基础路由为 https
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

BlogAxiosInstance.getBlogById = async (id:number) => {
  const response = await BlogAxiosInstance.get('/getBlogById', {
    params: { id: id }
  })
  return response
}




// BlogAxiosInstance.getUserAllSummaryArticles = async (uid) => {
//   const response = await BlogAxiosInstance.get('/getUserAllSummaryArticles', {
//     params: { uid: uid }
//   })
//   return response
// }

// BlogAxiosInstance.getUserAllSummaryArticles = async (uid) => {
//   const response = await BlogAxiosInstance.get('/getUserAllSummaryArticles', {
//     params: { uid: uid }
//   })
//   return response
// }

// BlogAxiosInstance.deleteArticle = async (articleId) => {
//   const response = await BlogAxiosInstance.get('/deleteArticle', {
//     params: { articleId: articleId }
//   })
//   return response
// }

// BlogAxiosInstance.certifyUser = async (articleId) => {
//   const response = await BlogAxiosInstance.get('/certifyUser', {
//     params: { articleId: articleId }
//   })
//   return response
// }

// BlogAxiosInstance.getAllSummaryArticles = async () => {
//   const response = await BlogAxiosInstance.get('/getAllSummaryArticles', {})
//   return response
// }

// BlogAxiosInstance.getArticle = async (articleId) => {
//   const response = await BlogAxiosInstance.get('/getArticle', {
//     params: {
//       articleId: articleId
//     }
//   })
//   return response
// }

// BlogAxiosInstance.updateArticle = async (article) => {
//   const formData = article
//   const response = await BlogAxiosInstance.post('/updateArticle', formData)
//   return response
// }

// BlogAxiosInstance.addArticle = async (article) => {
//   const formData = article
//   const response = await BlogAxiosInstance.post('/addArticle', formData)
//   return response
// }

// BlogAxiosInstance.getArticleDynamic = async (articleId) => {
//   const response = await BlogAxiosInstance.get('/getArticleDynamic', {
//     params: {
//       articleId: articleId
//     }
//   })
//   return response
// }

// BlogAxiosInstance.getUserByArticleId = async (articleId) => {
//   const response = await BlogAxiosInstance.get('/getUserByArticleId', {
//     params: {
//       articleId: articleId
//     }
//   })
//   return response
// }

// BlogAxiosInstance.getArticleDynamicCount = async (articleId) => {
//   const response = await BlogAxiosInstance.get('/getArticledynamic', {
//     params: {
//       articleId: articleId
//     }
//   })
//   return response
// }

// BlogAxiosInstance.increaseLikeCount = async (articleId) => {
//   const response = await BlogAxiosInstance.get('/addInteresting', {
//     params: {
//       articleId: articleId
//     }
//   })
//   return response
// }

// BlogAxiosInstance.increaseDislikeCount = async (articleId) => {
//   const response = await BlogAxiosInstance.get('/addBoring', {
//     params: {
//       articleId: articleId
//     }
//   })
//   return response
// }

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
  }
)

// 设置响应拦截器
BlogAxiosInstance.interceptors.response.use(
  (response) => {
    // 在这里对响应数据做些什么
    return response.data  // 可以根据实际情况做处理，例如只返回数据部分
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
  }
)
export default BlogAxiosInstance
