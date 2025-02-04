<script lang="ts" setup>
import AppMenu from './components/AppMenu.vue'
import GlobalConfigPanel from './components/layout/GlobalConfigPanel.vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <AppMenu class="sticky top-0 z-50 bg-white shadow-sm" />
  <RouterView class="mx-auto p-4 text-center" />
  <GlobalConfigPanel />
</template>

<style>
/* Transiciones para Vue Router */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
