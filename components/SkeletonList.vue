<template>
  <div class="skeleton">
    <div v-for="n in count" :key="n" class="skeleton-item"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  count: { type: Number, default: 5 }
})
</script>

<style scoped>
.skeleton {
  margin: 12px;
  width: 400px;
}

.skeleton-item {
  height: 18px;
  margin: 8px 0px;
  background: #ddd;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
</style>