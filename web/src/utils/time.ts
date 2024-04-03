export const getJstISOString = () => {
  const now = new Date();
  const jstOffset = 9 * 60; // JSTのUTCオフセットは+9時間
  const jstTime = new Date(now.getTime() + jstOffset * 60000); // ミリ秒単位でオフセットを適用
  const isoString = jstTime.toISOString();
  return isoString;
};
