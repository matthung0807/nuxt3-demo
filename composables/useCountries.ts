export function useCountries() {
  const countryMap = useState<Record<string, string> | null>(
    "countryMap",
    () => null
  );
  const pending = useState("countryMapPending", () => false);
  const error = useState<Error | null>("countryMapError", () => null);

  const loadCountries = async () => {
    if (countryMap.value) return; // 已有資料就不打API，直接回傳

    pending.value = true;
    error.value = null;

    try {
      countryMap.value = await $fetch("/api/countries");
    } catch (err) {
      error.value = err as Error;
    } finally {
      pending.value = false;
    }
  };

  return {
    countryMap,
    pending,
    error,
    loadCountries,
  };
}
