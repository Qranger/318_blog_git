<template>
  <el-upload
    v-if="!imgUrl"
    class="avatar-uploader"
    v-model:file-list="fileList"
    ref="upload"
    http-request:
    list-type="picture-card"
    :auto-upload="true"
    :limit="1"
    :http-request="myUpload"
    :on-exceed="handleExceed"
    :show-file-list="false"
  >
    <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
  <el-image v-if="imgUrl" :src="imgUrl" :preview-src-list="[imgUrl]" class="avatar" fit="cover" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { type UploadInstance, type UploadProps, type UploadRequestOptions, type UploadUserFile , type UploadRawFile,genFileId} from 'element-plus'

// import uploadImage from '@/apis/uploadImage'
import uploadImage_ali from '@/apis/uploadImage-ali'

const imgUrl = defineModel('imgUrl')

const myUpload = async (fileOptions: UploadRequestOptions) => {
  console.log('myUpload')
  const responseUrls = await uploadImage_ali(fileOptions.file)
  imgUrl.value = responseUrls
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const fileList = ref<UploadUserFile[]>([])

const upload = ref<UploadInstance>()
</script>

<style scoped>
.avatar-uploader,
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
