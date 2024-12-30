import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const User = ref({
      id: 0,
      name: '',
      avatar: ''
    })
    const UserToken = ref('')
    const CurrentBlogId = ref(0)
    const visitId = ref(0)

    function initializeStore() {
      User.value = {
        id: 0,
        name: '',
        avatar: ''
      }
      UserToken.value = ''
      CurrentBlogId.value = 0 // 重置为初始状态
      visitId.value = 0
    }

    return { UserToken,  CurrentBlogId, User, visitUserId: visitId, initializeStore }
  },
  {
    persist: true
  }
)

//确保先初始化pinia


