const BASE_URL = import.meta.env.VITE_SERVER_URL

const getUserDetails = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}`)
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error)
  }
}

export { getUserDetails }