import axios from 'axios'

// 上传图片的接口 URL
const uploadUrl = 'https://picui.cn/api/v1/upload'


/**
 * 上传图片文件到指定 URL
 * @param {File} file - 需要上传的图片文件
 * @returns {Promise<string>} - 返回图片的 URL
 */
const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post(uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: 'Bearer 352|FSCb3qXhcE9qs4hkgXGQ9WGAWLRJPxKlO4VpE3lP'
      }
    })
    return response.data.data?.links?.url
  } catch (error) {
    console.error('图片上传失败:', error)
    throw new Error('图片上传失败，请稍后重试')
  }
}

export default uploadImage
