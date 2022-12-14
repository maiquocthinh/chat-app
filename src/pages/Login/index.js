import React from 'react'

import Button from '../../components/Button'
import Input from '../../components/Input'
import { googleIcon, facebookIcon, twitterIcon } from '../../assets/images'

const Login = () => {
	return (
		<div className="login">
			<div className="login-container">
				<div className="login-wrapper">
					<div className="header">
						<span className="title">Login</span>
					</div>
					<div className="body">
						<form className="form">
							<Input type="email" placeholder="Email" />
							<Input type="password" placeholder="Password" />
							<Button disabled to="/" color="success">
								Login
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
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
