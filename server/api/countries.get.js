export default defineEventHandler(async () => {
  await new Promise((r) => setTimeout(r, 1000)); // 模擬延遲

  const countryMap = {
    US: "美國",
    JP: "日本",
    CN: "中國",
    KR: "韓國",
    VN: "越南",
  };
  return countryMap;
});
