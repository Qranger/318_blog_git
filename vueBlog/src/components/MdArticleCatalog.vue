<template>
  <div>
    <el-card style="width: 250px" shadow="hover">
      <MdCatalog :editorId="props.editorId" :scrollElement="props.scrollElement" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { MdCatalog } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

const props = defineProps({
  editorId: String,
  scrollElement: [String, Object]
})
</script>
