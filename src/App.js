import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import './assets/scss/global.scss'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	)
}

export default App
