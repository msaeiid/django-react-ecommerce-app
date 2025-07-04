import React from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const BASE_URL = 'http://127.0.0.1:8000/'

const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access')

        if (token) {
            const decodedToken = jwtDecode(token)
            const expiryDate = decodedToken.exp
            const currentTime = Math.floor(Date.now() / 1000)
            if (expiryDate > currentTime) {
                config.headers.authorization = `Bearer ${token}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    })

export default api