<template>
  <BaseCard class="group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
    <div class="flex items-start justify-between p-5">
      <div class="flex flex-1 items-start gap-4">
        <div class="mt-1">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="$emit('toggle-complete', task.id)"
            class="h-5 w-5 rounded-full border-2 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-colors"
          />
        </div>

        <div class="flex-1 space-y-2">
          <div class="flex items-baseline gap-3">
            <h3
              class="text-lg font-semibold text-gray-900"
              :class="{ 'line-through text-gray-400': task.completed }"
            >
              {{ task.title }}
            </h3>
            <span
              :class="[
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
                priorityClass,
              ]"
            >
              <component :is="priorityIcon" class="h-4 w-4" />
              {{ task.priority }}
            </span>
          </div>

          <p
            class="text-gray-600 text-sm leading-relaxed"
            :class="{ 'opacity-75': task.completed }"
          >
            {{ task.description }}
          </p>

          <div class="flex items-center gap-2 text-sm text-gray-500">
            <CalendarIcon class="h-5 w-5 text-gray-400" />
            <time :datetime="task.dueDate">
              {{ formatDueDate(task.dueDate) }}
            </time>
          </div>
        </div>
      </div>

      <div class="ml-4 flex items-center gap-2">
        <BaseButton
          variant="ghost"
          @click="$emit('delete', task.id)"
          class="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600"
        >
          <TrashIcon class="h-5 w-5" />
        </BaseButton>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  CalendarIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import type { Task } from '@/interfaces/Types'
import BaseCard from '@/components/common/BaseCard.vue'

const props = defineProps<{
  task: Task
}>()

defineEmits<{
  (e: 'toggle-complete', id: string): void
  (e: 'delete', id: string): void
}>()

const priorityClass = computed(
  () =>
    ({
      low: 'bg-green-50 text-green-700',
      medium: 'bg-amber-50 text-amber-700',
      high: 'bg-red-50 text-red-700',
    })[props.task.priority],
)

const priorityIcon = computed(
  () =>
    ({
      low: CheckCircleIcon,
      medium: ExclamationTriangleIcon,
      high: ExclamationCircleIcon,
    })[props.task.priority],
)

const formatDueDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}
</script>
