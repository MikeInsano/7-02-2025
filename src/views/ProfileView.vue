<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <!-- Base de carga para mostrar mientras responden nuestros servicios -->
    <template v-if="loading">
      <div class="animate-pulse space-y-8">
        <div class="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div class="grid gap-6 md:grid-cols-3">
          <div class="space-y-4">
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            <div class="h-10 bg-gray-200 rounded-lg"></div>
          </div>
          <div class="space-y-4">
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            <div class="h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </template>
    <!-- Cuando ya recibimos un valor -->
    <template v-else-if="userStore.user">
      <header class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ userStore.user.name }}</h1>
          <p class="text-gray-600 mt-2">{{ userStore.user.role }}</p>
        </div>
        <div class="relative">
          <div class="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <span class="text-2xl font-bold text-blue-600">{{ userStore.userInitials }}</span>
          </div>
          <span
            class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
          ></span>
        </div>
      </header>

      <section class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-500">Email</label>
            <p class="text-gray-900">{{ userStore.user.email }}</p>
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-500">Joined</label>
            <p class="text-gray-900">{{ userStore.user.joinDate || randomJoinDate }}</p>
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-500">Status</label>
            <span
              class="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-100 text-green-800"
            >
              Active
            </span>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Estatus de actividad</h3>
          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="p-4 bg-gray-50 rounded-xl">
              <p class="text-2xl font-bold text-blue-600">{{ randomProjects }}</p>
              <p class="text-sm text-gray-600">Proyectos</p>
            </div>
            <div class="p-4 bg-gray-50 rounded-xl">
              <p class="text-2xl font-bold text-blue-600">100%</p>
              <p class="text-sm text-gray-600">Eficiencia</p>
            </div>
            <div class="p-4 bg-gray-50 rounded-xl">
              <p class="text-2xl font-bold text-blue-600">4.8</p>
              <p class="text-sm text-gray-600">Calificación</p>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- Eb  -->
    <div v-else class="text-center py-12">
      <p class="text-gray-600 mb-4">User not found</p>
      <BaseButton variant="secondary" @click="$router.push('/Users')">
        Back to Dashboard
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const loading = ref(true)

const userStore = useUserStore()

const randomProjects = computed(() => {
  return Math.floor(Math.random() * 20)
})
const randomJoinDate = computed(() => {
  return new Date().toLocaleDateString()
})

// Watcher para cambios en el parámetro de ruta
watch(
  () => route.params.name,
  (newName) => {
    if (newName) {
      userStore.fetchUser(newName)
      loading.value = false
    }
  },
  { immediate: true },
)
</script>
