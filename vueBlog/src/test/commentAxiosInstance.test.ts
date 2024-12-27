import { describe, it, expect, beforeEach } from 'vitest'

import CommentAxiosInstance from '@/apis/commentAxios'
import { setActivePinia, createPinia } from 'pinia'

import type { Response } from '@/types/Response'

describe('API:comment 端口连通性测试', () => {
  beforeEach(() => {
    // 创建一个新 pinia，并使其处于激活状态，这样它就会被任何 useStore() 调用自动接收
    setActivePinia(createPinia())
  })
  it('getCommentsByBlogId 测试', async () => {
    try {
      const response = (await CommentAxiosInstance.getCommentsByBlogId(1)) as Response // 假设请求 id 为 1 的博客
      console.log('getCommentsByBlogId 端口响应')
      console.log(response.data)
    } catch (error) {
      // 请求失败时抛出错误
      expect(error).toBeUndefined()
    }
  })

  it('login 测试', async () => {
    try {

      const comment = {
        id : 24,
        parentId : 26,
        context : "dolor est ea",
        responseId : 70,
        time :"2024-12-27T09:43:06.930Z"
      }

      const response = (await CommentAxiosInstance.addComment(1,comment)) as Response
      console.log('addComment 端口响应')
      console.log(response.data)
    } catch (error) {
      // 请求失败时抛出错误
      expect(error).toBeUndefined()
    }
  })

})
