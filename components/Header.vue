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
    </div>
  </header>
</template>

<script setup lang="ts">
const user = useUser()
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