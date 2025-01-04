<template>
  <div>
    <div class="parallax">
      <div class="parallax__layer parallax__layer__0">
        <img :src="img0" />
      </div>
      <div class="parallax__layer parallax__layer__1">
        <img :src="img1" />
      </div>
      <div class="parallax__layer parallax__layer__2">
        <img :src="img2" />
      </div>
      <div class="parallax__layer parallax__layer__3">
        <img :src="img3" />
      </div>
      <div class="parallax__layer parallax__layer__4">
        <img :src="img4" />
      </div>
      <div class="parallax__layer parallax__layer__5">
        <img :src="img5" />
      </div>
      <div class="parallax__layer parallax__layer__6">
        <img :src="img6" />
      </div>
      <div class="parallax__cover"></div>
    </div>
    <div class="fixed-content">
      <el-tabs type="border-card">
        <el-tab-pane label="LoginIn"> <LoginIn></LoginIn></el-tab-pane>
        <el-tab-pane label="Register"><RegisterIn></RegisterIn></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import img0 from '@/assets/indexImgs/img0.png'
import img1 from '@/assets/indexImgs/img1.png'
import img2 from '@/assets/indexImgs/img2.png'
import img3 from '@/assets/indexImgs/img3.png'
import img4 from '@/assets/indexImgs/img4.png'
import img5 from '@/assets/indexImgs/img5.png'
import img6 from '@/assets/indexImgs/img6.png'

import LoginIn from '@/views/LoginIn.vue'
import RegisterIn from '@/views/RegisterIn.vue'

// const title = import.meta.env.VITE_API_BASEURL
// const titles ='http://127.0.0.1:4523/m1/5682619-5363514-default/'
if(import.meta.env.VITE_FLAG){
  console.log('不重合')
}
// console.log(title)
</script>

<style scoped>
.parallax {
  -webkit-perspective: 100px;
  perspective: 100px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  margin-left: -1500px;
}

.parallax__layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.parallax__layer img {
  display: block;
  position: absolute;
  bottom: 0;
}

.parallax__cover {
  background: #2d112b;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 400px;
  z-index: 2;
}

.parallax__layer__0 {
  -webkit-transform: translateZ(-300px) scale(4);
  transform: translateZ(-300px) scale(4);
}

.parallax__layer__1 {
  -webkit-transform: translateZ(-250px) scale(3.5);
  transform: translateZ(-250px) scale(3.5);
}

.parallax__layer__2 {
  -webkit-transform: translateZ(-200px) scale(3);
  transform: translateZ(-200px) scale(3);
}

.parallax__layer__3 {
  -webkit-transform: translateZ(-150px) scale(2.5);
  transform: translateZ(-150px) scale(2.5);
}

.parallax__layer__4 {
  -webkit-transform: translateZ(-100px) scale(2);
  transform: translateZ(-100px) scale(2);
}

.parallax__layer__5 {
  -webkit-transform: translateZ(-50px) scale(1.5);
  transform: translateZ(-50px) scale(1.5);
}

.parallax__layer__6 {
  -webkit-transform: translateZ(0px) scale(1);
  transform: translateZ(0px) scale(1);
}

.fixed-content {
  position: fixed;
  top: 100px;
  left: 50%; /* 把固定内容放在视图的中间 */
  transform: translateX(-50%);
  z-index: 3; /* 确保固定内容在其他层级之上 */
}

button {
  margin-bottom: 20px;
}
</style>
