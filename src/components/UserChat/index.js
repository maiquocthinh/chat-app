import React from 'react'

import { InfoIcon, LeftArrowIcon, LoadingIcon, Logo, MoreIcon2 } from '../../assets/images/svgicon'
import Button from '../Button'
import InputMessageBox from './InputMessageBox'
import Message from './Message'

const UserChat = () => {
	const handleClick = () => {
		const chatContentDoc = document.querySelector('.chat-content')
		chatContentDoc.classList.remove('mobile-d-none')
	}

	return (
		<div className="user-chat">
			<div className="user-chat__loader">
				<LoadingIcon height="6rem" width="6rem" className="loading-icon-svg" />
			</div>
			<div className="user-chat__welcome">
				<div className="user-chat__welcome__wrapper">
					<div className="logo-box">
						<Logo height="10rem" width="10rem" />
					</div>
					<div className="welcome-content">
						<p>Welcome to Chat App</p>
						<span>Select a chat to read message</span>
					</div>
				</div>
			</div>
			<div className="user-chat__header">
				<div className="header__icon-back desktop-d-none tablet-d-none" onClick={handleClick}>
					<LeftArrowIcon width="2.2rem" height="2.2rem" />
				</div>
				<div className="header__user">
					<div className="header__user__avatar">
						<img src="https://i.imgur.com/AOgo2uD.jpg" alt="abc" />
						<span className="user-status"></span>
					</div>
					<div className="header__user__info">
						<h5 className="header__user__info__name">Ossie Wilson</h5>
						<span className="header__user__info__status-text">Online</span>
					</div>
				</div>
				<div className="header__action">
					<Button>
						<InfoIcon />
					</Button>
					<Button>
						<MoreIcon2 />
					</Button>
				</div>
			</div>
			<div className="user-chat__body">
				<div className="messages">
					<Message isText />
					<Message isPhoto />
					<Message isVideo />
					<Message isFile myMessage />
					<Message isText myMessage />
					<Message isPhoto myMessage />
					<Message isVideo myMessage />
				</div>
			</div>
			<div className="user-chat__footer">
				<InputMessageBox />
			</div>
		</div>
	)
}

export default UserChat
