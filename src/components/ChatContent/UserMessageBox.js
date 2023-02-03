import React from 'react'

import './UserMessageBox.scss'
import { ChatIcon, MoreIcon, ProfileIcon } from '../../assets/images/svgicon'
import Dropdown, { DropdownItem, DropdownMenu, DropdownTonggle } from '../Dropdown'
import { calculateElapsedTime } from '../../utils'

const UserMessageBox = ({ dataProps, onClick, ...props }) => {
	const { photoURL, displayName, latestMessage, lastMessageTime, handleOnClick, showProfile, isMakeNewChat } =
		dataProps
	return (
		<div
			className="user-message-box"
			onClick={() => {
				onClick()
				handleOnClick()
			}}
			{...props}
		>
			<div className="user-message-box__avatar">
				<img src={photoURL} alt="" />
				<span className="user-status"></span>
			</div>
			<div className="user-message-box__info">
				<div className="details">
					<h5 className="user-name">{displayName}</h5>
					{latestMessage && <p className="user-latest-message">{latestMessage}</p>}
				</div>
				<div className="date-and-actions">
					{lastMessageTime && <span className="date">{calculateElapsedTime(lastMessageTime.toDate())}</span>}
					<div className="action-toggle">
						<Dropdown place="left">
							<DropdownTonggle>
								<MoreIcon width="2rem" height="2rem" />
							</DropdownTonggle>

							<DropdownMenu>
								{isMakeNewChat && (
									<DropdownItem>
										New Chat <ChatIcon height="1.4rem" width="1.4rem" />
									</DropdownItem>
								)}
								<DropdownItem onClick={showProfile}>
									Profile <ProfileIcon height="1.4rem" width="1.4rem" />{' '}
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
					<div className="new-message-count">3</div>
				</div>
			</div>
		</div>
	)
}

export default UserMessageBox
