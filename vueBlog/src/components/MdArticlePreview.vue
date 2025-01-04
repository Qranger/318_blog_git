<template>
  <div>
    <MdPreview :editorId="props.editorId" :modelValue="props.modelValue" />
  </div>
</template>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

const props = defineProps({
  editorId: String,
  modelValue: String
})
</script>
