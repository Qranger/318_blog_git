import OSS from 'ali-oss'

const individualDomainName = import.meta.env.VITE_INDIVIDUAL_DOMAINNAME

const accessKeyId = import.meta.env.VITE_ALI_CLOUD_ID
const accessKeySecret = import.meta.env.VITE_ALI_CLOUD_PASSWORD

const region = import.meta.env.VITE_ALI_CLOUD_REGION
const bucket = import.meta.env.VITE_ALI_CLOUD_BUCKET

const client = new OSS({
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
  region: region,
  // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
  accessKeyId: accessKeyId,
  accessKeySecret: accessKeySecret,
  // 填写Bucket名称。
  bucket: bucket,
})

const putObject = async (file: File): Promise<string> => {
  try {
    const timestamp = Date.now() // 获取当前时间戳
    const filename = `images/${timestamp}_${file.name}`

    const result = await client.put(filename, file)

    // console.log(result);
    // console.log('callbackurl');

    const UrlParts = result.url.split('/')
    const callbackUrl = individualDomainName + UrlParts.slice(-2).join('/')
    // console.log(callbackUrl)
    return result.url as string
  } catch (e) {
    console.log('上传出错')
    console.log(e)
  }
}

const uploadImage_ali = async (file: File): Promise<string> => {
  try {
    const url = await putObject(file)
    return url
  } catch (error) {
    console.error('图片上传到 Ali OSS 失败', error)
    throw new Error('图片上传到 Ali OSS 失败')
  }
}

export default uploadImage_ali
