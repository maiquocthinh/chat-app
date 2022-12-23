import React from 'react'

import './UserMessageBox.scss'
import { MoreIcon } from '../../assets/images/svgicon'

const UserMessageBox = ({ ...props }) => {
	return (
		<div className="user-message-box" {...props}>
			<div className="user-message-box__avatar">
				<img src="https://i.imgur.com/Ox0n6HD.jpg" alt="" />
				<span className="user-status"></span>
			</div>
			<div className="user-message-box__info">
				<div className="details">
					<h5 className="user-name">Josephin water</h5>
					<p className="user-latest-message">
						Hi, i am josephin. How are you.. ! There are many variations of passages.
					</p>
				</div>
				<div className="date-and-actions">
					<span className="date">11:05 AM</span>
					<div className="action-toggle">
						<MoreIcon width="2rem" height="2rem" />
					</div>
					<div className="new-message-count">3</div>
				</div>
			</div>
		</div>
	)
}

export default UserMessageBox
