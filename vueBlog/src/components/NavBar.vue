<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li @click="goHomepage"><a>Homepage</a></li>
          <li @click="goBlogEdit"><a>BlogEditor</a></li>
          <li @click="goSquare"><a>Square</a></li>
        </ul>
      </div>
    </div>
    <!-- 搜索按钮 -->
    <div class="navbar-end">
      <div class="form-control">
        <input
          v-model="searchText"
          type="text"
          placeholder="Search"
          class="input input-bordered w-24 md:w-auto"
        />
      </div>
      <button @click="search" class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
    <div class="navbar-center">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" :src="userInform.avatar" />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li @click="EditInformation"><a>Edit</a></li>
          <li @click="Logout"><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  <el-drawer v-model="drawer" title="个人信息界面" :with-header="true">
    <span>Hi there!</span>
    <InformationTable />
  </el-drawer>
  <div class="divider"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import router from '@/router'

import InformationTable from '@/components/InformationTable.vue'

import { useUserStore } from '@/stores/userStore'

const Userstore = useUserStore()

const searchText = ref('')

const search = () => {
  console.log('触发查找', searchText)
  Userstore.searchText = searchText.value
}

const drawer = ref(false)

const userInform = ref({
  id: -1,
  name: '',
  avatar: '',
})

const initial = () => {
  userInform.value.name = Userstore.User.name
  userInform.value.avatar = Userstore.User.avatar
  userInform.value.id = Userstore.User.id
}

initial()

const goHomepage = () => {
  console.log('跳转到首页')
  router.push('MyHome')
}

const goSquare = () => {
  console.log('跳转到广场')
  router.push('Square')
}

const goBlogEdit = () => {
  console.log('跳转到 BlogEdit')
  Userstore. CurrentBlogId=0
  router.push('BlogEdit')
}

const Logout = () => {
  console.log('登出')
  router.push('hello')
}

const EditInformation = () => {
  console.log('EditInformation')
  drawer.value = true
}
</script>

<style scoped></style>
