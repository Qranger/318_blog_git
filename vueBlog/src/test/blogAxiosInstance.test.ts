import { describe, it, expect, beforeEach } from 'vitest'

import BlogAxiosInstance from '@/apis/blogAxios'
import { setActivePinia, createPinia } from 'pinia'

import type { Response } from '@/types/Response'

describe('API 端口连通性测试', () => {
  beforeEach(() => {
    // 创建一个新 pinia，并使其处于激活状态，这样它就会被任何 useStore() 调用自动接收
    setActivePinia(createPinia())
  })
  it('应当成功连接到后端 API 并返回数据', async () => {
    try {
      const response = (await BlogAxiosInstance.getBlogById(1)) as Response // 假设请求 id 为 1 的博客
      console.log(response.data)
    } catch (error) {
      // 请求失败时抛出错误
      expect(error).toBeUndefined()
    }
  })
})
