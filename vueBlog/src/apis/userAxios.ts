import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

import type { User } from '@/types/User'

declare module 'axios' {
  export interface AxiosInstance {
    login(username: string, password: string): Promise<AxiosResponse<any, any>>
    register(
      username: string,
      password: string,
      email: string,
      userImg: string,
      captcha: string
    ): Promise<AxiosResponse<any, any>>
    getUser(): Promise<AxiosResponse<any, any>>
    getOtherUser(userId: Number): Promise<AxiosResponse<any, any>>
    sendeMail(email: string): Promise<AxiosResponse<any, any>>
    hello(): Promise<AxiosResponse<any, any>>
  }
}

// 创建一个 axios 实例
const UserAxiosInstance = axios.create({
  baseURL: 'http://192.168.54.14:9000/user', // 配置基础路由为 https
  timeout: 10000000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 添加 Login 方法到 UserAxiosInstance
UserAxiosInstance.hello = async () => {
  const response = await UserAxiosInstance.get('/hello')
  return response
}

// 添加 Login 方法到 UserAxiosInstance
UserAxiosInstance.login = async (username, passWord) => {
  const formData: User = {
    username: username,
    password: passWord
  }
  const response = await UserAxiosInstance.post('/login', formData)
  return response
}

// 添加 register 方法到 UserAxiosInstance
UserAxiosInstance.register = async (username, passWord, email, userImg, captcha) => {
  const formData = {
    user: {
      username: username,
      password: passWord,
      email: email,
      userImg: userImg
    },
    captcha: captcha
  }
  const response = await UserAxiosInstance.post('/register', formData)
  return response
}

// 添加 getUser 方法到 UserAxiosInstance
UserAxiosInstance.getUser = async () => {
  const response = await UserAxiosInstance.get('/getUser')
  return response
}

// 添加 getUser 方法到 UserAxiosInstance
UserAxiosInstance.getOtherUser = async (userId) => {
  const response = await UserAxiosInstance.get('/getOtherUser', {
    params: {
      other_uid: userId
    }
  })
  return response
}

UserAxiosInstance.sendeMail = async (email) => {
  const params = {
    email: email
  }
  const response = await UserAxiosInstance.get('/sendEmail', { params: params })
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
  }
)

// 设置响应拦截器
UserAxiosInstance.interceptors.response.use(
  (response) => {
    // 在这里对响应数据做些什么
    return response // 可以根据实际情况做处理，例如只返回数据部分
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
export default UserAxiosInstance
