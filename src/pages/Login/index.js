import React from 'react'

import Button from '../../components/Button'
import Input from '../../components/Input'
import { googleIcon, facebookIcon, twitterIcon } from '../../assets/images'
import {
	FacebookAuthProvider,
	getAdditionalUserInfo,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	TwitterAuthProvider,
} from 'firebase/auth'
import { auth, db } from '../../firebase/config'
import { Link, useNavigate } from 'react-router-dom'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'

const Login = () => {
	const navigate = useNavigate()
	const ggProvider = new GoogleAuthProvider()
	const fbProvider = new FacebookAuthProvider()
	const twProvider = new TwitterAuthProvider()

	const handleSubmit = async (e) => {
		e.preventDefault()
		const { 0: email, 1: password } = e.target

		try {
			await signInWithEmailAndPassword(auth, email.value, password.value)
			navigate('/')
		} catch (error) {}
	}

	const handleGgLogin = async () => {
		const data = await signInWithPopup(auth, ggProvider)
		const additionalUserInfo = getAdditionalUserInfo(data)
		const { user } = data

		if (additionalUserInfo?.isNewUser) {
			await setDoc(doc(db, 'users', user.uid), {
				uid: user.uid,
				shortUid: nanoid(7),
				email: user.email,
				displayName: user.displayName,
				photoURL: user.photoURL,
				providerId: additionalUserInfo.providerId,
				createAt: serverTimestamp(),
			})
		}
	}

	const handleFbLogin = async () => {
		const data = await signInWithPopup(auth, fbProvider)
		const additionalUserInfo = getAdditionalUserInfo(data)
		const { user } = data

		if (additionalUserInfo?.isNewUser) {
			await setDoc(doc(db, 'users', user.uid), {
				uid: user.uid,
				shortUid: nanoid(7),
				email: user.email,
				displayName: user.displayName,
				photoURL: user.photoURL,
				providerId: additionalUserInfo.providerId,
				createAt: serverTimestamp(),
			})
		}
	}

	const handleTwLogin = async () => {
		const data = await signInWithPopup(auth, twProvider)
		const additionalUserInfo = getAdditionalUserInfo(data)
		const { user } = data

		if (additionalUserInfo?.isNewUser) {
			await setDoc(doc(db, 'users', user.uid), {
				uid: user.uid,
				shortUid: nanoid(7),
				email: user.email,
				displayName: user.displayName,
				photoURL: user.photoURL,
				providerId: additionalUserInfo.providerId,
				createAt: serverTimestamp(),
			})
		}
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
							<Button color="success" onClick={handleGgLogin}>
								<img src={googleIcon} alt="Google" style={{ height: '24px' }} />
							</Button>
							<Button variant="outlined" color="warning" onClick={handleFbLogin}>
								<img src={facebookIcon} alt="Facebook" style={{ height: '24px' }} />
							</Button>
							<Button color="violet" onClick={handleTwLogin}>
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
