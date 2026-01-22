<template>
  <h1>會員設定</h1>
</template>

<script setup lang="ts">
definePageMeta({
  requireAuth: true,
  roles: ['admin']
})
</script>