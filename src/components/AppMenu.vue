<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-8xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <!-- Logo y texto general (adecuar a su antojo) -->
        <RouterLink to="/" class="flex items-center text-xl font-bold text-amber-300">
          <HomeIcon class="w-6 h-6 mx-2" />
          Actividad 1
        </RouterLink>

        <!-- Menú Pantallas desktop-->
        <ul class="hidden md:flex space-x-2">
          <MenuItem
            class="place-content-center"
            v-for="route in menuRoutes"
            :key="route.path"
            :route="route"
          />
        </ul>

        <!-- Botón para moviles-->
        <button @click="isOpen = !isOpen" class="md:hidden p-2 text-gray-600 hover:text-gray-800">
          <Bars3Icon class="w-6 h-6" />
        </button>
      </div>

      <!-- Menú Mobile -->
      <ul
        v-show="isOpen"
        class="md:hidden absolute left-0 right-0 bg-white border-t shadow-lg py-2 px-4 space-y-1"
      >
        <MenuItem
          v-for="route in menuRoutes"
          :key="route.path"
          :route="route"
          @close-mobile-menu="isOpen = false"
        />
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import MenuItem from '@/components/MenuItem.vue'
import { Bars3Icon, HomeIcon } from '@heroicons/vue/24/solid'

const router = useRouter()
const isOpen = ref(false)

const menuRoutes = computed(() => {
  return router.options.routes.filter((route) => route.meta?.menu && !route.redirect)
})
</script>
