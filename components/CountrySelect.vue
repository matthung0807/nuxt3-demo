<template>
  <select v-model="modelValue" :disabled="pending">
    <option value="">全部國家</option>
    <option v-for="(name, code) in countryMap" :key="code" :value="code">
      {{ name }} ({{ code }})
    </option>
  </select>
</template>

<script setup lang="ts">
const modelValue = defineModel();

const { countryMap, pending, loadCountries } = useCountries()

loadCountries()
</script>