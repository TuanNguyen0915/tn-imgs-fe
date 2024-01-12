// import * as tokenService from "./token"
const SERVER_URL = import.meta.env.VITE_SERVER_URL

const Auth = async (formData) => {
  try {
    const res = await fetch(`${SERVER_URL}/user/google-oauth`, {
      method:'post',
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const json = await res.json()
    
    return json
  } catch (error) {
    throw new Error(error)
  }
}

const login = async (formData) => {
  try {
    const res = await fetch(`${SERVER_URL}/user/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error)
  }
}

const register = async (formData) => {
  try {
    const res = await fetch(`${SERVER_URL}/user/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error)
  }
}

export {Auth, login, register}