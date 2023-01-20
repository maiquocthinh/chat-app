import React, { createContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const [currentUser, setcurrentUser] = useState({})

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName, photoURL } = user
				setcurrentUser({ uid, email, displayName, photoURL })
				if (location.pathname == '/login' || location.pathname == '/register') navigate('/')
			} else {
				if (location.pathname !== '/login' && location.pathname !== '/register') navigate('/login')
			}
		})

		return () => {
			unsub()
		}
	}, [])

	return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>
}

export default AuthProvider
export { AuthContext }
