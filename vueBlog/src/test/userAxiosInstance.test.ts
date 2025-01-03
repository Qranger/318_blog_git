import { describe, it, expect, beforeEach } from 'vitest'

import UserAxiosInstance from '@/apis/userAxios'
import { setActivePinia, createPinia } from 'pinia'

import type { Response } from '@/types/Response'

describe('API:user 端口连通性测试', () => {
  beforeEach(() => {
    // 创建一个新 pinia，并使其处于激活状态，这样它就会被任何 useStore() 调用自动接收
    setActivePinia(createPinia())
  })
  it('getUserById 测试', async () => {
    try {
      const response = (await UserAxiosInstance.getUserById(1)) as Response // 假设请求 id 为 1 的博客
      console.log('getUserById 端口响应')
      console.log(response.data)
    } catch (error) {
      // 请求失败时抛出错误
      expect(error).toBeUndefined()
    }
  })

  it('login 测试', async () => {
    try {

      const user = {
        id : 24,
        name : '生浩晨',
        password : 'x5kf0zfB1oGw8Bi',
        avatar : 'https://avatars.githubusercontent.com/u/76501413',
      }

      const response = (await UserAxiosInstance.login(user)) as Response
      console.log('login 端口响应')
      console.log(response.data)
    } catch (error) {
      // 请求失败时抛出错误
      expect(error).toBeUndefined()
    }
  })

  it('register 测试', async () => {
    try {

      const user = {
        id : 24,
        name : '生浩晨',
        password : 'x5kf0zfB1oGw8Bi',
        avatar : 'https://avatars.githubusercontent.com/u/76501413',
      }

      const response = (await UserAxiosInstance.register(user)) as Response
      console.log('register 端口响应')
      console.log(response.data)
    } catch (error) {
      // 请求失败时抛出错误
      expect(error).toBeUndefined()
    }
  })

  it('updateUser 测试', async () => {
    try {

      const user = {
        id : 24,
        name : '生浩晨',
        password : 'x5kf0zfB1oGw8Bi',
        avatar : 'https://avatars.githubusercontent.com/u/76501413',
      }

      const response = (await UserAxiosInstance.updateBaseInfo(user)) as Response
      console.log('updateUser 端口响应')
      console.log(response.data)
    } catch (error) {
      // 请求失败时抛出错误
      expect(error).toBeUndefined()
    }
  })
})
