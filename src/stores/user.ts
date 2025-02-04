import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserProfile } from '@/interfaces/IUserProfile'
import users81 from '@/data/users/81.json'
import users82 from '@/data/users/82.json'
import users83 from '@/data/users/83.json'

export const useUserStore = defineStore('user', () => {
  const users = ref<UserProfile[]>([])
  const user = ref<UserProfile | null>()
  const loading = ref(false)

  const usersCount = computed(() => users.value.length)

  const userInitials = computed(() => {
    if (!user.value?.name) return ''
    return user.value.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  async function fetchUsers() {
    loading.value = true
    try {
      const globalConfig = localStorage.getItem('global-config')
      const config = globalConfig ? JSON.parse(globalConfig) : { group: '81' }
      const group = config.group || '81'

      switch (group) {
        case '81':
          users.value = users81 as UserProfile[]
          break
        case '82':
          users.value = users82 as UserProfile[]
          break
        case '83':
          users.value = users83 as UserProfile[]
          break
        default:
          users.value = users81 as UserProfile[]
      }
    } catch (error) {
      console.error('Error obteniendo users:', error)
    } finally {
      loading.value = false
    }
  }
  async function fetchUser(name: string) {
    loading.value = true
    try {
      if (users.value.length === 0) {
        await fetchUsers()
      }
      console.log('Buscando usuario:', name)

      const foundUser = users.value.find((u) => u.name === name)
      user.value = foundUser // Asegurar null si no se encuentra
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error // Propagar error para manejo en componentes
    } finally {
      loading.value = false
    }
  }
  function setGroup(group: number) {
    localStorage.setItem('group', group.toString())
    fetchUsers()
  }

  return {
    users,
    loading,
    fetchUsers,
    user,
    userInitials,
    usersCount,
    setGroup,
    fetchUser,
  }
})
