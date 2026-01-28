import { defineStore } from "pinia";

export const useCountriesStore = defineStore("countries", {
  state: () => ({
    countryMap: null as Record<string, string> | null,
    pending: false,
    error: null as Error | null,
  }),
  actions: {
    async loadCountries() {
      if (this.countryMap) return; // 已有資料就不打API，直接回傳

      this.pending = true;
      this.error = null;
      try {
        this.countryMap = await $fetch<Record<string, string>>("/api/countries");
      } catch (err) {
        this.error = err as Error;
      } finally {
        this.pending = false;
      }
    },
  },
});
