import React from 'react'

import './UserStatusBox.scss'

const UserStatusBox = ({ displayName, photoURL, busy }) => {
	return (
		<a href="/" className={`user-status-box ${busy ? 'busy' : ''}`}>
			<div className="user-status-box__avatar">
				<img src={photoURL} alt={displayName} />
				<span className="user-status"></span>
			</div>
			<h5 className="user-status-box__name">{displayName}</h5>
		</a>
	)
}

export default UserStatusBox
