<script setup lang="ts">
import { useJobStore } from '@/stores/jobs'
import { onMounted } from 'vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Job } from '@/interfaces/IJob'

const jobStore = useJobStore()

const jobs = ref([]) as Ref<Job[]>

onMounted(async () => {
  await jobStore.getJobs().then(() => {
    jobs.value = [...jobStore.jobList]
  })
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="mx-auto max-w-7xl">
      <div class="mb-10 border-b border-gray-200 pb-6">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">Oportunidades de trabajo</h1>
        <p class="mt-4 text-xl text-gray-500">Busca entre diferentes opciones de trabajo</p>
      </div>
      <!-- En el home estoy insertando el HTML directo, pero esto podría convertirse en un componente para mayor legibilidad y organización de más código -->
      <div v-if="jobs.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="job in jobs"
          :key="job.id"
          class="group relative flex flex-col rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-blue-500"
        >
          <div class="flex-1">
            <div class="mb-4 flex items-center justify-between">
              <h2 class="text-xl font-bold text-gray-900 hover:text-blue-600">{{ job.title }}</h2>
              <span
                class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
              >
                {{ job.city }}
              </span>
            </div>

            <p class="mb-4 text-gray-600">{{ job.description }}</p>

            <div class="space-y-2 border-t border-gray-100 pt-4">
              <div class="inline-flex items-center">
                <BuildingOffice2Icon class="mr-2 h-5 w-5 text-gray-400" />
                <span class="text-gray-700">{{ job.company }}</span>
              </div>
              <div class="inline-flex items-center">
                <CurrencyDollarIcon class="mr-2 h-5 w-5 text-gray-400" />
                <span class="font-medium text-green-600">${{ job.salary }}</span>
              </div>
            </div>

            <div class="mt-4">
              <h3 class="mb-2 text-sm font-semibold text-gray-900">Requirements:</h3>
              <ul class="space-y-1 pl-5">
                <li
                  v-for="requirement in job.requirements"
                  :key="requirement"
                  class="text-gray-600 before:absolute before:left-2 before:text-gray-400 before:content-['•']"
                >
                  {{ requirement }}
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-6 border-t border-gray-100 pt-4">
            <div class="flex items-center justify-between">
              <span class="flex items-center">
                <span
                  class="inline-block h-3 w-3 rounded-full mr-2"
                  :class="job.active ? 'bg-green-400' : 'bg-red-400'"
                ></span>
                <span
                  class="text-sm font-medium"
                  :class="job.active ? 'text-green-700' : 'text-red-700  px-4 py-2'"
                >
                  {{ job.active ? 'Activo' : 'Cerrado' }}
                </span>
              </span>
              <button
                v-if="job.active"
                class="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
              >
                Me interesa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
