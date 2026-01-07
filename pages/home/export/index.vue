<template>
  <div>
    <h1>出口業務</h1>

    <label>
      訂單狀態：
      <input v-model="status" placeholder="pending/done">
    </label>

    <button @click="search">查詢</button>

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
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const status = ref(route.query.status || '')
const queryStatus = ref(route.query.status || '')

const { data: orders, pending, error, refresh } = useFetch('/api/orders', {
  query: {
    status: queryStatus,
  },
  default: () => [],
})

function search() {
  queryStatus.value = status.value

  router.push({
    query: {
      status: status.value || undefined,
    },
  })

  refresh()
}
</script>

<style scoped>
.error {
  color: red;
}
</style>