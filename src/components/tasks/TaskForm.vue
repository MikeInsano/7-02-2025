<template>
  <form
    @submit.prevent="handleSubmit"
    class="bg-white rounded-xl p-6 shadow-xl border border-gray-100 space-y-6"
  >
    <div class="space-y-1">
      <label for="title" class="block text-sm font-medium text-gray-700">
        Título <span class="text-red-500">*</span>
      </label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        required
        placeholder="Ingrese el título de la tarea"
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400 transition-all"
      />
    </div>

    <div class="space-y-1">
      <label for="description" class="block text-sm font-medium text-gray-700"> Descripción </label>
      <textarea
        id="description"
        v-model="form.description"
        rows="3"
        placeholder="Añade una descripción"
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400 transition-all"
      ></textarea>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-1">
        <label for="priority" class="block text-sm font-medium text-gray-700"> Prioridad </label>
        <div class="relative">
          <select
            id="priority"
            v-model="form.priority"
            class="w-full pl-4 pr-10 py-2.5 appearance-none rounded-lg border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          >
            <option value="low">Baja Prioridad</option>
            <option value="medium">Media Prioridad</option>
            <option value="high">Alta Prioridad</option>
          </select>
          <ChevronDownIcon
            class="h-5 w-5 absolute right-3 top-3.5 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      <div class="space-y-1">
        <label for="dueDate" class="block text-sm font-medium text-gray-700">
          Fecha de Vencimiento <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <input
            id="dueDate"
            v-model="form.dueDate"
            type="date"
            required
            class="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <CalendarIcon
            class="h-5 w-5 absolute right-3 top-3.5 text-gray-400 pointer-events-none"
          />
        </div>
      </div>
    </div>

    <div class="pt-6 border-t border-gray-100">
      <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <BaseButton
          type="button"
          variant="secondary"
          @click="resetForm"
          class="w-full sm:w-auto px-6 py-2.5"
        >
          Limpiar Formulario
        </BaseButton>
        <BaseButton type="submit" variant="primary" class="w-full sm:w-auto px-6 py-2.5">
          <PlusCircleIcon class="h-5 w-5 mr-2" />
          Crear Tarea
        </BaseButton>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ChevronDownIcon, CalendarIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import type { Task } from '@/types'
import BaseButton from '@/components/common/BaseButton.vue'

const emit = defineEmits<{
  (e: 'submit', task: Omit<Task, 'id' | 'createdAt'>): void
}>()

const initialForm = {
  title: '',
  description: '',
  priority: 'low' as const,
  dueDate: '',
  completed: false,
}

const form = reactive({ ...initialForm })

const handleSubmit = () => {
  emit('submit', {
    ...form,
    dueDate: new Date(form.dueDate),
  })
  resetForm()
}

const resetForm = () => {
  Object.assign(form, initialForm)
}
</script>
