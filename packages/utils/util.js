export const isMobile = (() => {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.includes("android") || ua.includes("ios");
})();

export const isPc = !isMobile;

export const isWechat = window.navigator.userAgent
  .toLowerCase()
  .includes("micromessenger");

export function setDocumentTitle(title) {
  document.title = title;
}

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path) => reg.test(path);

