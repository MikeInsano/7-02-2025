<template>
  <div>
    <h1>Estudiantes del 83</h1>
    <div>
      <div v-for="(student, index) in student.students" :key="index">
        {{ student.name }}
      </div>
    </div>>
  </div>
</template>
<script lang="ts" setup>
import { useStudentStore } from '@/stores/student';
import { onMounted } from 'vue';

const student = useStudentStore()
onMounted(() => {
  student.getStudents()
})
</script>
