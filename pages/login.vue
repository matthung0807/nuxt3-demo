<template>
  <h1>登入</h1>
  <form @submit.prevent="login">
    <label>
      帳號：
      <input v-model="username" placeholder="帳號" />
    </label>
    <br>
    <label>
      密碼：
      <input v-model="password" type="password" placeholder="密碼" />
    </label>
    <br>
    <button type="submit">登入</button>
  </form>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const username = ref('')
const password = ref('')

const login = async () => {
  const success = await userStore.login(username.value, password.value)
  if (success) {
    navigateTo('/home')
  }
}
</script>