<script setup>
const route = useRoute()
const path = computed(() =>
  '/' + route.params.slug.join('/')
)
</script>

<template>
    <h1>Catch All Route</h1>
    <p>找不到對應頁面，路由：{{ path }}</p>
</template>