<script setup>
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
    <!-- <NuxtLink to="/home/export">返回列表</NuxtLink> -->

    <button @click="back">返回</button>
  </div>
</template>
