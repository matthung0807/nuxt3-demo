<template>
  <select v-model="modelValue" :disabled="countriesStore.pending">
    <option value="">全部國家</option>
    <option v-for="(name, code) in countriesStore.countryMap" :key="code" :value="code">
      {{ name }} ({{ code }})
    </option>
  </select>
</template>

<script setup lang="ts">
import { useCountriesStore } from '~/stores/countries';

const modelValue = defineModel();

const countriesStore = useCountriesStore()
onMounted(() => {
  countriesStore.loadCountries()
})
</script>