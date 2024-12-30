<template>
  <div class="container">
    <el-container>
      <el-header>
        <div class="bg-red-300">
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
import NavBar from '@/components/NavBar.vue'
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
}
</style>
