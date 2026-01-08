<template>
  <div>
    <h1>出口業務</h1>

    <label>
      訂單狀態：
      <input v-model="status" placeholder="pending/done">
    </label>
    <br>
    <label>
      出口國家：
      <CountrySelect v-model="country" />
    </label>
    <br>

    <button @click="search">查詢</button>

    <p v-if="orderPending">資料載入中...</p>
    <p v-else-if="error" class="error">資料載入失敗</p>
    <p v-else-if="orders.length === 0">沒有訂單資料</p>
    <ul v-else>
      <li v-for="order in orders" :key="order.id">
        <NuxtLink :to="`/home/export/${order.id}`">
          訂單 #{{ order.id }},
          狀態: {{ order.status }},
          出口國家：{{ countryMap[order.country] }}
        </NuxtLink>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const status = ref(route.query.status || '')
const country = ref(route.query.country || '')
const queryStatus = ref(route.query.status)
const queryCountry = ref(route.query.country)

const { data: orders, pending: orderPending, error, refresh } = useFetch('/api/orders', {
  query: {
    status: queryStatus,
    country: queryCountry,
  },
  default: () => [],
})

const { countryMap, loadCountries } = useCountries()
loadCountries()

function search() {

  queryStatus.value = status.value
  queryCountry.value = country.value

  const query = {}
  if (status.value) {
    query.status = status.value
  }
  if (country.value) {
    query.country = country.value
  }
  router.push({
    query
  })

  refresh()
}
</script>

<style scoped>
.error {
  color: red;
}
</style>