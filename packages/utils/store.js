const store = {
  get(key){
    const val = localStorage.getItem(key)
    const expireKey = `expire_${key}`
    const deadAt = +localStorage.getItem(expireKey)
    if (deadAt) {
      if (Date.now() > deadAt) {
        this.del(key)
        return null
      } else{
        return val
      }
    } 
    return val
    
  },
  set(key, val, expire){
    console.log(key, val, expire)
    if (expire) {
      if (isNaN(expire)) {
        return `过期时间不合法`
      }
      if (expire < 0) {
        this.del(key)
      } else {
        const expireKey = `expire_${key}`
        const deadAt = Date.now() + expire * 1000
        localStorage.setItem(key, val)
        localStorage.setItem(expireKey, deadAt)
      }
    } else {
      localStorage.setItem(key, val)
    }
  },
  del(key) {
    localStorage.removeItem(key)
    localStorage.removeItem(`expire_${key}`)
  }
}

export default store

