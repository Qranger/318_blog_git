// src/services/axios.js

//mock 基础路由
const mockBaseUrl: string = 'http://127.0.0.1:4523/m1/5682619-5363514-default';

// Strig baseUrl='http://localhost:8080'


import axios from 'axios'
axios.defaults.withCredentials = true
// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: mockBaseUrl, // 配置基础路由
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance
