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

import type { LoginResponse } from '~/types/auth'

const isLogin = useAuth()
const userState = useUser()
const username = ref('')
const password = ref('')

const login = async () => {
  try {
    const { success, token, user } = await $fetch<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: { username: username.value, password: password.value }
    })
    if (success && token && user) {
      isLogin.value = true
      userState.value = user
      navigateTo('/home')
    } else {
      alert('帳號或密碼錯誤')
    }
  } catch (err) {
    alert('登入失敗，請稍後再試')
  }
}
</script>