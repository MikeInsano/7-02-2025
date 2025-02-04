<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Gestor de tareas</h1>
    </header>

    <div v-if="taskStore.loading" class="text-center p-8">
      <div
        class="animate-spin inline-block w-8 h-8 border-2 border-current border-t-transparent rounded-full mb-4"
      ></div>
      <p class="text-gray-600">Loading tasks...</p>
    </div>

    <template v-else>
      <TaskForm @submit="handleTaskSubmit" />

      <div class="grid gap-6 md:grid-cols-2 my-8">
        <section
          class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-h-96 overflow-y-auto"
        >
          <h2 class="text-xl font-semibold mb-6">Tareas pendientes</h2>
          <div v-if="taskStore.pendingTasks.length > 0" class="space-y-4">
            <TransitionGroup name="list" tag="div" class="space-y-4">
              <TaskItem
                v-for="task in taskStore.pendingTasks"
                :key="task.id"
                :task="task"
                @toggle-complete="toggleTaskComplete"
                @delete="deleteTask"
              />
            </TransitionGroup>
          </div>
          <div v-else class="text-gray-600 text-center p-4">No hay tareas pendientes.</div>
        </section>

        <section
          class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-h-96 overflow-y-auto"
        >
          <h2 class="text-xl font-semibold mb-6">Tareas completadas</h2>
          <div v-if="taskStore.completedTasks.length > 0" class="space-y-4">
            <TransitionGroup name="list" tag="div" class="space-y-4">
              <TaskItem
                v-for="task in taskStore.completedTasks"
                :key="task.id"
                :task="task"
                @toggle-complete="toggleTaskComplete"
                @delete="deleteTask"
              />
            </TransitionGroup>
          </div>
          <div v-else class="text-gray-600 text-center p-4">No hay tareas completadas.</div>
        </section>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/task'
import TaskForm from '@/components/tasks/TaskForm.vue'
import TaskItem from '@/components/tasks/TaskItem.vue'
import type { Task } from '@/interfaces/Types'

const taskStore = useTaskStore()

// Ciclo de vida de Vue 3 para cargar las tareas al montar el componente de forma asíncrona
onMounted(async () => {
  // Se utiliza el método fetchTasks del store de tareas que apuntaría a nuestro servicio de API
  await taskStore.fetchTasks()
})

//Manejo de eventos para agregar tareas evitando la recarga de la página y usando la Api
//de forma local(esto sin hacer cambios en la API)
function handleTaskSubmit(taskData: Omit<Task, 'id' | 'createdAt'>) {
  taskStore.addTask(taskData)
}

//Función para cambiar el estado de una tarea a completada o pendiente
// de forma local(esto sin hacer cambios en la API)
function toggleTaskComplete(taskId: string) {
  const task = taskStore.tasks.find((t) => t.id === taskId)
  if (task) {
    task.completed = !task.completed
  }
}
//Función para eliminar una tarea de forma local(esto sin hacer cambios en la API)
function deleteTask(taskId: string) {
  const index = taskStore.tasks.findIndex((t) => t.id === taskId)
  if (index !== -1) {
    taskStore.tasks.splice(index, 1)
  }
}
</script>
