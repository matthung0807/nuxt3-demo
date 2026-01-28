<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li v-for="item in visibleItems">
          <NuxtLink :key="item.path" :to="item.path" active-class="active">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import type { SidebarItem } from '~/types/sidebar'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

// Sidebar 功能清單
const sidebarItems: SidebarItem[] = [
  { label: '會員設定', path: '/home/member', roles: ['admin'] },
  { label: '出口業務', path: '/home/export', roles: ['admin', 'user'] },
]

const userStore = useUserStore()
const { role } = storeToRefs(userStore)

// 依角色過濾可見項目
const visibleItems = computed(() => {
  const r = role.value
  if (!r) return []

  return sidebarItems.filter(item => item.roles.includes(r))
})
</script>