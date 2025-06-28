import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../../Api'
import Spinner from './Spinner'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    const [isAuthorized, setIsAuthorized] = React.useState(null)
    const location = useLocation()

    useEffect(() => {
        auth().catch(() => setIsAuthorized(null))
    }, [])

    async function refreshToken() {
        const refreshToken = localStorage.getItem('refresh')
        if (!refreshToken) {
            setIsAuthorized(false)
            return
        }
        try {
            const response =
                await api.post('/auth/refresh/', { refresh: refreshToken });
            if (response.status === 200) {
                localStorage.setItem('access', response.data.access)
                setIsAuthorized(true)
            }
            else {
                setIsAuthorized(false)
                return
            }
        }
        catch (error) {
            console.error('Error refreshing token:', error)
            setIsAuthorized(false)
            return
        }
    }


    async function auth() {
        const token = localStorage.getItem('access')
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decodedToken = jwtDecode(token)
        const expiryDate = decodedToken.exp
        const currentTime = Math.floor(Date.now() / 1000)

        if (expiryDate < currentTime) {
            await refreshToken()
        }
        else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return <Spinner />
    }

    return (isAuthorized ? children : <Navigate to='/login' state={{ from: location }} replace />)

}

export default ProtectedRoute