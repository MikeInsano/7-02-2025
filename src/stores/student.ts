import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IStudent } from '@/interfaces/IStudent'
import users83 from '@/data/users/83.json'
import type { Ref } from 'vue'

export const useStudentStore = defineStore('student', () => {
  const students: Ref<IStudent[]> = ref([])
  const studentsCount = computed(() => students.value.length)

  const getStudents = () => {
    students.value = users83 as IStudent[]
  }

  return {
    students,
    studentsCount,
    getStudents,
  }
})
