<template>
  <div class="container">
    <el-container>
      <el-header>
        <div v-if="shouldShowNavBar">
          <NavBar />
        </div>
      </el-header>
      <el-container>
        <el-main><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
const route = useRoute()

// 根据当前路由路径判断是否显示 NavBar
const shouldShowNavBar = computed(() => route.path !== '/hello')

import NavBar from '@/components/NavBar.vue'
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 200vh;
}
</style>
