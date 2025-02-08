import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IStudent } from '@/interfaces/IStudents'
import type { Ref } from 'vue'

export const useStudentStore = defineStore('student', () => {
  const students: Ref<IStudent[]> = ref([])
  const studentsCount = computed(() => students.value.length)

  return {
    students,
    studentsCount,
  }

})
