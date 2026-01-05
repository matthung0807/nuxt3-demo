<script setup>
import Sidebar from '~/components/Sidebar.vue'
import Header from '~/components/Header.vue'
</script>

<template>
  <div>
    <Header />

    <div style="display:flex">
      <Sidebar />

      <main style="padding:16px;flex:1">
        <slot />
      </main>
    </div>
  </div>
</template>