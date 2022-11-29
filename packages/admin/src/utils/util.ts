// 获取当前站点设置的标题
export function getTitle(): string {
  return import.meta.env.VITE_APP_TITLE || "";
}
// 设置页面标题
export function setTitle(title: string): string {
  return (window.document.title = `${import.meta.env.VITE_APP_TITLE}-${
    title || ""
  }`);
}
// 是否微信环境
const isWechatEnv: boolean = window.navigator.userAgent
  .toLowerCase()
  .includes("micromessenger");

const isIOS: boolean = /ios|iphone|ipad|ipod/.test(
  navigator.userAgent.toLowerCase()
);

export { isIOS, isWechatEnv };
