<template>
  <div class="toast" :class="type">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
  type?: 'success' | 'error'
}>()
</script>

<style scoped>
.toast {
  padding: 12px 16px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 8px;
}

.toast.success {
  background-color: #16a34a;
}

.toast.error {
  background-color: #dc2626;
}
</style>