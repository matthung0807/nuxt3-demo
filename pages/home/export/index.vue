<template>
  <div>
    <h1>出口業務</h1>
    <ul>
      <li v-for="order in orders" :key="order.id">
        <NuxtLink :to="`/home/export/${order.id}`">
          訂單 #{{ order.id }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const orders = [
  { id: 10001 },
  { id: 10002 },
  { id: 10003 },
]
</script>