<template>
  <div class="fixed bottom-4 right-4 z-50">
    <button
      @click="isOpen = !isOpen"
      class="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
    >
      <svg
        class="w-6 h-6 text-gray-800 dark:text-gray-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </button>

    <Transition name="slide-up">
      <div
        v-if="isOpen"
        class="absolute bottom-full right-0 mb-4 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4"
      >
        <div class="space-y-4">
          <!-- Grupo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Group</label
            >
            <select
              v-model="config.group"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="81">Grupo 81</option>
              <option value="82">Grupo 82</option>
              <option value="83">Grupo 83</option>
            </select>
          </div>

          <!-- Tema Oscuro -->
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
            <button
              @click="toggleDarkMode"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                config.darkMode ? 'bg-blue-600' : 'bg-gray-200',
              ]"
            >
              <span
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  config.darkMode ? 'translate-x-6' : 'translate-x-1',
                ]"
              />
            </button>
          </div>

          <!-- Idioma -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Language</label
            >
            <select
              v-model="config.language"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <!-- Tamaño de Fuente -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Font Size</label
            >
            <input
              type="range"
              v-model="config.fontSize"
              min="12"
              max="24"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGlobalConfig } from '@/composables/useGlobalConfig'

const { config, toggleDarkMode } = useGlobalConfig()
const isOpen = ref(false)
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
