import React from 'react'

import Button from '../../components/Button'
import Input from '../../components/Input'
import { googleIcon, facebookIcon, twitterIcon } from '../../assets/images'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		const { 0: email, 1: password } = e.target

		try {
			await signInWithEmailAndPassword(auth, email.value, password.value)
			navigate('/')
		} catch (error) {}
	}

	return (
		<div className="login">
			<div className="login-container">
				<div className="login-wrapper">
					<div className="header">
						<span className="title">Login</span>
					</div>
					<div className="body">
						<form className="form" onSubmit={handleSubmit}>
							<Input type="email" placeholder="Email" />
							<Input type="password" placeholder="Password" />
							<Button color="success">Login</Button>
						</form>

						<p className="seperate"></p>
						<div className="oauth-group">
							<Button color="success">
								<img src={googleIcon} alt="Google" style={{ height: '24px' }} />
							</Button>
							<Button variant="outlined" color="warning">
								<img src={facebookIcon} alt="Facebook" style={{ height: '24px' }} />
							</Button>
							<Button color="violet">
								<img src={twitterIcon} alt="Twitter" style={{ height: '24px' }} />
							</Button>
						</div>
						<p className="mini-text">
							Don't have an account?{' '}
							<Link className="highlight" to="/register">
								Register now
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
