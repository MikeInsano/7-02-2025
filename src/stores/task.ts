import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Task } from '@/interfaces/Types'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]'))
  const loading = ref(false)

  const completedTasks = computed(() => tasks.value.filter((task) => task.completed))
  const pendingTasks = computed(() => tasks.value.filter((task) => !task.completed))

  async function fetchTasks() {
    loading.value = true
    try {
      // Simulación de llamada API
      // const response = await fetch('/api/tasks')
      //tasks.value = await response.json()
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      loading.value = false
    }
  }

  function addTask(task: Omit<Task, 'id' | 'createdAt'>) {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    tasks.value.push(newTask)
  }

  // Revisa los cambios en la variable tasks y guarda en localStorage
  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem('tasks', JSON.stringify(newTasks))
    },
    { deep: true },
  )

  return {
    tasks,
    loading,
    completedTasks,
    pendingTasks,
    fetchTasks,
    addTask,
  }
})
