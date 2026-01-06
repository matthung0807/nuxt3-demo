<template>
  <div>
    <h1>出口業務</h1>

    <p v-if="pending">資料載入中...</p>
    <p v-else-if="error" class="error">資料載入失敗</p>
    <p v-else-if="orders.length === 0">沒有訂單資料</p>
    <ul v-else>
      <li v-for="order in orders" :key="order.id">
        <NuxtLink :to="`/home/export/${order.id}`">
          訂單 #{{ order.id }}, 狀態: {{ order.status }}
        </NuxtLink>
      </li>
    </ul>

  </div>
</template>

<script setup>
const { data: orders, pending, error } = useFetch('/api/orders?status=pending', {
  default: () => [],
})
</script>

<style scoped>
.error {
  color: red;
}
</style>