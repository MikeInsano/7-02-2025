<template>
  <div>
    <h1>{{ student }}</h1>
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
