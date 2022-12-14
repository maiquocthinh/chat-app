import React from 'react'
import Input from '../Input'
import UserStatusBox from './UserStatusBox'
import UserMessageBox from './UserMessageBox'

const ChatContent = () => {
	const handleClick = () => {
		const chatContentDoc = document.querySelector('.chat-content')
		chatContentDoc.classList.add('mobile-d-none')
	}

	return (
		<div className="chat-content">
			<div className="chat-content__header">
				<div className="search-box">
					<Input type="text" placeholder="Search" className="search-box__input" />
				</div>
				<div className="online-users">
					<ul
						className="online-users__list"
						onWheel={(e) => (e.target.closest('.online-users__list').scrollLeft += e.deltaY)}
					>
						{Array(6)
							.fill(0)
							.map((v, i) => (
								<li className="online-users__item" key={i}>
									<UserStatusBox
										displayName="Thinh"
										photoURL="http://chatvia-dark.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
									/>
								</li>
							))}
					</ul>
				</div>
			</div>
			<div className="chat-content__body">
				<h5 className="chat-content__body__header">Recent</h5>
				<div className="chat-content__body__content">
					<ul className="chat-message-list">
						{Array(6)
							.fill(0)
							.map((v, i) => (
								<li className="chat-message-item" key={i}>
									<UserMessageBox onClick={handleClick} />
								</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default ChatContent
