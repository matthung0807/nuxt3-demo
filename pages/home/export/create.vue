<template>
  <div>
    <h1>新增訂單</h1>
  </div>
  <form @submit.prevent="save">
    <label>
      訂單狀態：
      <input v-model="status" placeholder="pending/done" />
    </label>
    <br />
    <label>
      出口國家：
      <CountrySelect v-model="country" />
    </label>
    <br />
    <button type="submit">儲存</button>
    <button type="button" @click="navigateTo('/home/export')">返回</button>
  </form>
</template>
<script setup lang="ts">
definePageMeta({
  requireAuth: true,
  roles: ['admin', 'user']
})

import type { CreateOrderResponse } from "~/types/api/orders";
import { useToast } from '~/composables/useToast'

const toast = useToast()
const status = ref("");
const country = ref("");

async function save() {
  if (!status.value || !country.value) {
    alert("請填寫所有欄位");
    return;
  }

  const response = await $fetch<CreateOrderResponse>("/api/orders", {
    method: "POST",
    body: {
      status: status.value,
      country: country.value,
    },
  });

  if (response.success) {
    toast.showToast('新增訂單成功！', 'success')
    navigateTo("/home/export");
  }
}
</script>
