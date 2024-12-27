<template>
  <div class="container">
    <div>
      <RouterView />
      <el-button>Default</el-button>
    </div>
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
