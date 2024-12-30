<template>
  <!-- <div class="container">
    <div>
      <RouterView />
    </div>
  </div> -->
  <div class="container">
    <el-container>
      <el-header>
        <div class="">

        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
}
</style>
