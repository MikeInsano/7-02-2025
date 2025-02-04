<template>
  <div class="container mx-auto px-4 py-12 max-w-6xl">
    <header class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Grupos de trabajo</h1>
        <p class="text-gray-600 mt-2">Maneja a tu equipo de trabajo</p>
      </div>
      <div class="relative w-64">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar usuarios"
          class="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        <svg
          class="w-5 h-5 absolute right-3 top-2.5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </header>

    <div class="grid lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-blue-600 text-white p-6 rounded-xl">
        <p class="text-sm mb-2">Usuarios totales</p>
        <p class="text-3xl font-bold">{{ users.length }}</p>
      </div>
      <div class="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
        <p class="text-sm mb-2 text-gray-600">Proyectos Activos</p>
        <p class="text-3xl font-bold text-gray-900">{{ randomActiveProjects }}</p>
      </div>
      <div class="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
        <p class="text-sm mb-2 text-gray-600">Eficiencia de equipo</p>
        <p class="text-3xl font-bold text-gray-900">{{ randomEfficience }}</p>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <section
        class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-h-96 overflow-y-auto"
      >
        <h2 class="text-xl font-semibold mb-6">Miembros del equipo</h2>

        <TransitionGroup name="list" tag="div" class="space-y-3">
          <div
            v-for="user in filteredUsers"
            :key="user.id"
            class="group flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="font-medium text-blue-600">{{ getUserInitials(user.name) }}</span>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ user.name }}</p>
                <p class="text-sm text-gray-500">Software Engineer</p>
              </div>
            </div>
            <RouterLink
              variant="secondary"
              size="small"
              :to="{ name: 'Profile', params: { name: user.name.toString() } }"
            >
              View Profile
            </RouterLink>
          </div>
        </TransitionGroup>
      </section>

      <section
        class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-h-96 overflow-y-auto"
      >
        <h2 class="text-xl font-semibold mb-6">Actividad reciente</h2>
        <div class="space-y-4">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="p-4 bg-gray-50 rounded-lg"
          >
            <p class="text-sm text-gray-600">{{ activity.date }}</p>
            <p class="text-gray-900">{{ activity.description }}</p>
          </div>
        </div>
      </section>
    </div>

    <router-view class="mt-8" />
  </div>
</template>

<script setup lang="ts">
//Importación de los módulos necesarios
import { ref, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useUserStore } from '@/stores/user'
import type { UserProfile } from '@/interfaces/IUserProfile'

//Variables y funciones
const userStore = useUserStore()
const randomEfficience = ref(Math.floor(Math.random() * 100))
const randomActiveProjects = ref(Math.floor(Math.random() * 50))
const searchQuery = ref('')
const users: Ref<UserProfile[]> = ref([])

// Datos de prueba
const recentActivities = ref([
  { id: 1, date: '2024-03-20', description: 'Se completó el hito del Proyecto Alpha 🎉' },
  { id: 2, date: '2024-03-19', description: 'Nuevo miembro del equipo a bordo 🚀' },
  { id: 3, date: '2024-03-18', description: 'Reunión con el cliente XYZ Corp 🤝' },
])
// Función que filtra los usuarios (Datos computados)
const filteredUsers = computed(() => {
  return users.value.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const getUserInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
}

//Función que se ejecuta al montar el componente
onMounted(async () => {
  await userStore.fetchUsers().then(() => {
    users.value = [...userStore.users]
  })
})
</script>
