<template>
  <div>
    <h1>出口業務</h1>
    <ul v-if="orders && orders.length">
      <li v-for="order in orders" :key="order.id">
        <NuxtLink :to="`/home/export/${order.id}`">
          訂單 #{{ order.id }}
        </NuxtLink>
      </li>
    </ul>

    <p v-else>沒有訂單資料</p>
  </div>
</template>

<script setup>
const { data: orders } = await useFetch('/api/orders', {
  default: () => [], // 預設值為空陣列
})
</script>