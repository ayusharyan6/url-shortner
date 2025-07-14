export const generateLinks = async (entries) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const saved = JSON.parse(localStorage.getItem("storedLinks")) || {}
        const result = entries.map((item, idx) => {
          const key = item.alias || `short${idx + 1}`
          saved[key] = item.address
          return {
            original: item.address,
            short: `http://localhost:3000/${key}`,
            keyword: key,
            duration: "∞"
          }
        })
        localStorage.setItem("storedLinks", JSON.stringify(saved))
        resolve(result)
      }, 500)
    })
  }