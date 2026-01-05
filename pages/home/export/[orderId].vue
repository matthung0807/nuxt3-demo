<script setup>
const route = useRoute()
const orderId = route.params.orderId
</script>

<template>
  <div>
    <h1>訂單詳情 #{{ orderId }}</h1>
    <NuxtLink to="/home/export">返回列表</NuxtLink>
  </div>
</template>
