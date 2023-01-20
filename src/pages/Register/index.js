import React from 'react'

import Button from '../../components/Button'
import Input from '../../components/Input'
import { facebookIcon, googleIcon, twitterIcon } from '../../assets/images'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../../firebase/config'
import { doc, setDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'

const Register = () => {
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		const { 0: email, 1: displayName, 2: password } = e.target

		try {
			const res = await createUserWithEmailAndPassword(auth, email.value, password.value)

			await updateProfile(res.user, {
				displayName: displayName.value,
				photoURL: 'https://i.imgur.com/p2Hnxjm.png', // default photoURL
			})

			await setDoc(doc(db, 'users', res.user.uid), {
				uid: res.user.uid,
				shortUid: nanoid(7),
				email: email.value,
				displayName: displayName.value,
				photoURL: 'https://i.imgur.com/p2Hnxjm.png', // default photoURL
				createdAt: res.user.metadata.createdAt,
			})

			navigate('/')
		} catch (error) {}
	}

	return (
		<div className="login">
			<div className="login-container">
				<div className="login-wrapper">
					<div className="header">
						<span className="title">Register</span>
					</div>
					<div className="body">
						<form className="form" onSubmit={handleSubmit}>
							<Input type="email" placeholder="Email" />
							<Input type="text" placeholder="Display Name" />
							<Input type="password" placeholder="Password" />
							<Button color="success" type="submit">
								Register
							</Button>
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
							Already have an account?{' '}
							<Link className="highlight" to="/login">
								Login
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
