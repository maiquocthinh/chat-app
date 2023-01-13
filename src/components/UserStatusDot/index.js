import React from 'react'

import './UserStatusDot.scss'
const UserStatusDot = ({ status = 'online', size = 'normal' }) => {
	return <span className={`user-status-dot ${status} ${size}`}></span>
}

export default UserStatusDot
