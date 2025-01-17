import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import type { User } from '@/types/User'

import type { Response } from '@/types/Response'

declare module 'axios' {
  export interface AxiosInstance {
    login: (user: User) => Promise<Response>
    register: (user: User) => Promise<Response>
    getUserById: (userId: number) => Promise<Response>
    updateBaseInfo: (user: User) => Promise<Response>
    updateSecurityInfo:(user: unknown)=> Promise<Response>
  }
}

const UserBaseUrl: string = import.meta.env.VITE_API_BASEURL + '/user'

// 创建一个 axios 实例
const UserAxiosInstance = axios.create({
  baseURL: UserBaseUrl, // 配置基础路由为 https
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
})

// 添加 Login 方法
UserAxiosInstance.login = async (user) => {
  const formData = user
  const response = (await UserAxiosInstance.post('/login', formData)) as Response
  return response
}

// 添加 register 方法
UserAxiosInstance.register = async (user) => {
  const formData = user
  const response = (await UserAxiosInstance.post('/register', formData)) as Response
  return response
}

//通过 用户id 获取用户信息
UserAxiosInstance.getUserById = async (userId) => {
  const response = (await UserAxiosInstance.get('/getUserById', {
    params: { id: userId },
  })) as Response
  return response
}

//设置 更新 User信息
UserAxiosInstance.updateBaseInfo = async (user) => {
  const formData = user
  const response = (await UserAxiosInstance.post('/updateBaseInfo', formData)) as Response
  return response
}

UserAxiosInstance.updateSecurityInfo = async (user) => {
  const formData = user
  const response = (await UserAxiosInstance.post('/updateSecurityInfo', formData)) as Response
  return response
}


// 设置请求拦截器
UserAxiosInstance.interceptors.request.use(
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
UserAxiosInstance.interceptors.response.use(
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
export default UserAxiosInstance
