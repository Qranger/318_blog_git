import { describe, it, expect, beforeEach } from 'vitest'

import BlogAxiosInstance from '@/apis/blogAxios'
import { setActivePinia, createPinia } from 'pinia'

import type { Response } from '@/types/Response'

describe('API:Blog 端口连通性测试', () => {
  beforeEach(() => {
    // 创建一个新 pinia，并使其处于激活状态，这样它就会被任何 useStore() 调用自动接收
    setActivePinia(createPinia())
  })
  it('getBlogById 测试', async () => {
    try {
      const response = (await BlogAxiosInstance.getBlogById(1)) as Response // 假设请求 id 为 1 的博客
      console.log('getBlogById 端口响应')
      console.log(response.data)
    } catch (error) {
      // 请求失败时抛出错误
      expect(error).toBeUndefined()
    }
  })

  it('getUserAllSummaryBlogs 测试', async () => {
    try {
      const response = (await BlogAxiosInstance.getUserAllSummaryBlogs(1)) as Response
      console.log('getBlogById 端口响应')
      console.log(response.data)
    } catch (error) {
      // 请求失败时抛出错误
      expect(error).toBeUndefined()
    }
  })

  it('searchBlogs 测试', async () => {
    try {
      const response = (await BlogAxiosInstance.searchBlogs('文章模糊查询')) as Response
      console.log('searchBlogs 端口响应')
      console.log(response.data)
    } catch (error) {
      // 请求失败时抛出错误
      expect(error).toBeUndefined()
    }
  })

  it('addBlog 测试', async () => {
    try {

      const blog = {
        id : 24,
        title : '测试文章',
        context : '这是一个测试文章',
        titleImg : '"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo"',
      }

      const response = (await BlogAxiosInstance.addBlog(blog)) as Response
      console.log('addBlog 端口响应')
      console.log(response.data)
    } catch (error) {
      // 请求失败时抛出错误
      expect(error).toBeUndefined()
    }
  })

  it('updateBlog 测试', async () => {
    try {

      const blog = {
        id : 24,
        title : '更新文章',
        context : '这是一个更新文章',
        titleImg : '"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo"',
      }

      const response = (await BlogAxiosInstance.updateBlog(blog)) as Response
      console.log('updateBlog 端口响应')
      console.log(response.data)
    } catch (error) {
      // 请求失败时抛出错误
      expect(error).toBeUndefined()
    }
  })

  it('deleteBlog 测试', async () => {
    try {
      const response = (await BlogAxiosInstance.deleteBlog(1)) as Response
      console.log('deleteBlog 端口响应')
      console.log(response.data)
    } catch (error) {
      // 请求失败时抛出错误
      expect(error).toBeUndefined()
    }
  })
})
