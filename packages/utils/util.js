export const isMobile = (() => {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.includes("android") || ua.includes("ios");
})();

export const isPc = !isMobile;

export const isWechat = window.navigator.userAgent
  .toLowerCase()
  .includes("micromessenger");

export function setDocumentTitle(title) {
  document.title = title
}
