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

    <SkeletonList v-if="orderPending" :count="pageSize" />
    <p v-else-if="error" class="error">資料載入失敗</p>
    <p v-else-if="result.data.length === 0">沒有訂單資料</p>
    <ul v-else>
      <li v-for="order in result?.data" :key="order.id">
        <NuxtLink :to="`/home/export/${order.id}`">
          訂單 #{{ order.id }},
          狀態: {{ order.status }},
          出口國家：{{ countryMap?.[order.country] ?? order.country }}
        </NuxtLink>
      </li>
    </ul>

    <!-- 分頁按鈕 -->
    <button @click="prevPage" :disabled="orderPending || currentPage <= 1">上一頁</button>
    <span>第 {{ currentPage }} 頁 / 共 {{ totalPages }} 頁</span>
    <button @click="nextPage" :disabled="orderPending || currentPage >= totalPages">下一頁</button>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  requireAuth: true,
  roles: ['admin', 'user']
})

import type { OrdersResponse } from "~/types/api/orders"

const route = useRoute()
const router = useRouter()

const status = ref('')
const country = ref('')
const queryStatus = ref(route.query.status)
const queryCountry = ref(route.query.country)
// 分頁
const currentPage = ref(1)
const pageSize = 5
const queryPage = ref(route.query.page)
const queryPageSize = ref(route.query.pageSize)
const totalPages = ref(0)

const { data: result, pending: orderPending, error, refresh } = useFetch<OrdersResponse>('/api/orders', {
  query: {
    status: queryStatus,
    country: queryCountry,
    page: queryPage,
    pageSize: queryPageSize
  },
  default: () => ({ data: [], total: 0, totalPages: 0, page: 1, pageSize }),
})

// 當 result 改變時，把 totalPages 同步到 ref
watch(result, (newVal) => {
  if (newVal) {
    totalPages.value = newVal.totalPages
  }
}, { immediate: true })

watch(() => route.query, (query) => {
  status.value = (query.status as string) || ''
  country.value = (query.country as string) || ''
  currentPage.value = Number(query.page || 1)
}, { immediate: true })

const { countryMap, loadCountries } = useCountries()
loadCountries()

function search() {

  queryStatus.value = status.value
  queryCountry.value = country.value
  currentPage.value = 1
  queryPage.value = String(currentPage.value)
  queryPageSize.value = String(pageSize)

  pushQueryAndRefresh()
}

function prevPage() {
  if (currentPage.value <= 1) return
  currentPage.value--
  updatePageQueryAndRefresh()
}

function nextPage() {
  if (currentPage.value >= totalPages.value) return
  currentPage.value++
  updatePageQueryAndRefresh()
}

function updatePageQueryAndRefresh() {
  queryPage.value = String(currentPage.value)
  queryPageSize.value = String(pageSize)
  pushQueryAndRefresh()
}

function pushQueryAndRefresh() {
  const query: Record<string, string> = {}
  if (status.value) query.status = String(status.value)
  if (country.value) query.country = String(country.value)
  if (currentPage.value) query.page = String(currentPage.value)
  if (pageSize) query.pageSize = String(pageSize)
  router.push({ query })
  refresh()
}
</script>

<style scoped>
.error {
  color: red;
}
</style>