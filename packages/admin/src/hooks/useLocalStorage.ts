export default function useLocalStorage() {
  function setItem(key: string, value: any, expire?: number): void {
    if (expire && isNaN(expire)) {
      throw new Error("过期时间不合法");
    } else if (expire && expire <= 0) {
      removeItem(key);
    } else if (expire && expire > 0) {
      const expireAt = new Date().getTime() + expire * 1000;
      const expireKey = `expire_${key}`;
      window.localStorage.setItem(key, JSON.stringify(value));
      window.localStorage.setItem(expireKey, `${expireAt}`);
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  function getItem(key: string) {
    const now = new Date().getTime();
    const expireKey = getExpireKey(key);
    const expireAt: number = parseInt(
      window.localStorage.getItem(expireKey) || ""
    );

    if (expireAt && expireAt > now) {
      return window.localStorage.getItem(key);
    } else if (expireAt && expireAt < now) {
      removeItem(key);
      return undefined;
    }
    const res = window.localStorage.getItem(key);
    return res ? JSON.parse(res) : undefined;
  }

  function removeItem(key: string): void {
    window.localStorage.removeItem(key);
    const expireKey = getExpireKey(key);
    window.localStorage.removeItem(expireKey);
  }

  function getExpireKey(key: string): string {
    return `expire_${key}`;
  }

  return { setItem, getItem, removeItem };
}
