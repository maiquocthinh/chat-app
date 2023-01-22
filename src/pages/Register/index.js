import React from 'react'

import Button from '../../components/Button'
import Input from '../../components/Input'
import { facebookIcon, googleIcon, twitterIcon } from '../../assets/images'
import {
	createUserWithEmailAndPassword,
	FacebookAuthProvider,
	getAdditionalUserInfo,
	GoogleAuthProvider,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth'
import { auth, db } from '../../firebase/config'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'

const Register = () => {
	const navigate = useNavigate()
	const ggProvider = new GoogleAuthProvider()
	const fbProvider = new FacebookAuthProvider()

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

	const handleTwitterLogin = async () => {
		alert('Developing....')
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
							<Button color="success" onClick={handleGgLogin}>
								<img src={googleIcon} alt="Google" style={{ height: '24px' }} />
							</Button>
							<Button variant="outlined" color="warning" onClick={handleFbLogin}>
								<img src={facebookIcon} alt="Facebook" style={{ height: '24px' }} />
							</Button>
							<Button color="violet" onClick={handleTwitterLogin}>
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
