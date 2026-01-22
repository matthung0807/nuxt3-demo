<script setup lang="ts">
definePageMeta({
  middleware: 'check-order-id',
  requireAuth: true,
  roles: ['admin', 'user']
})

const router = useRouter()
const route = useRoute()
const orderId = route.params.orderId

function back() {
  router.push(`/home/export`)
}
</script>

<template>
  <div>
    <h1>訂單詳情 #{{ orderId }}</h1>
    <button @click="back">返回</button>
  </div>
</template>
