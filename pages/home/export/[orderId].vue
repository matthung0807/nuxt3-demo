<script setup lang="ts">
definePageMeta({
  middleware: 'check-order-id',
  requireAuth: true,
  roles: ['admin', 'user']
})

const route = useRoute()
const orderId = route.params.orderId

</script>

<template>
  <div>
    <h1>訂單詳情 #{{ orderId }}</h1>
    <button @click="navigateTo('/home/export')">返回</button>
  </div>
</template>
