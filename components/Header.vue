<template>
  <header class="header">
    <nav class="nav-left">
      <ul>
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about">About</NuxtLink>
        </li>
      </ul>
    </nav>
    <!-- 右上角使用者資訊 -->
    <div class="nav-right" v-if="user">
      {{ user.name }} ({{ user.role }})
      <button @click="logout">登出</button>
    </div>
    <div v-else>guest
      <button @click="login">登入</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const logout = async () => {
  await userStore.logout()
  navigateTo('/login')
}

const login = () => {
  navigateTo('/login')
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 8px 16px;
}

.nav-left ul {
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-right {
  font-weight: bold;
}
</style>