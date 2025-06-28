import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect } from 'react'
import api from '../../Api'

export const AuthContext = createContext(false)

export function AuthProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const [user, setUser] = React.useState(null)

    const handleAuth = () => {
        const token = localStorage.getItem('access')
        if (token) {
            const decodedToken = jwtDecode(token)
            const currentTime = Date.now() / 1000 // Convert to seconds
            const expiryTime = decodedToken.exp
            if (expiryTime >= currentTime) {
                setIsAuthenticated(true)
            } else {
                localStorage.removeItem('token')
                setIsAuthenticated(false)
            }
        }
    }

    function get_user() {
        api.get('user/profile')
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.data)
                }
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error)
            })
    }


    useEffect(() => {
        handleAuth()
        get_user()
    }, [])
    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, user, get_user }} >
            {children}
        </AuthContext.Provider>
    )
}


