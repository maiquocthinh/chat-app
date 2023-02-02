import React, { useEffect, useRef } from 'react'
import Input from '../Input'
import UserStatusBox from './UserStatusBox'
import SearchUser from './SearchUser'
import RecentChats from './RecentChats'
import useForceUpdate from '../../hooks/useForceUpdate'

const ChatContent = () => {
	const chatContentHeaderRef = useRef()
	const chatContentBodyRef = useRef()
	const searchText = useRef('')
	const forceUpdate = useForceUpdate()

	useEffect(() => {
		chatContentBodyRef.current.style.height = `calc(100% - ${chatContentHeaderRef.current.offsetHeight}px)`
	}, [])

	const handleKey = (e) => {
		e.code === 'Enter' && forceUpdate()
	}

	return (
		<div className="chat-content">
			<div className="chat-content__header" ref={chatContentHeaderRef}>
				<div className="search-box">
					<Input
						type="text"
						placeholder="Search"
						className="search-box__input"
						onChange={(e) => {
							searchText.current = e.target.value
						}}
						onKeyDown={handleKey}
					/>
				</div>
				<div className="online-users">
					{false && (
						<ul
							className="online-users__list"
							onWheel={(e) => (e.target.closest('.online-users__list').scrollLeft += e.deltaY)}
						>
							{Array(6)
								.fill(0)
								.map((v, i) => (
									<li className="online-users__item" key={i}>
										<UserStatusBox displayName="Thinh" photoURL="https://i.imgur.com/5WRVkx9.jpg" />
									</li>
								))}
						</ul>
					)}
				</div>
			</div>
			<div className="chat-content__body" ref={chatContentBodyRef}>
				<h5 className="chat-content__body__header">{searchText ? 'Search Results: ' : 'Recent'}</h5>
				<div className="chat-content__body__content">
					{searchText.current ? <SearchUser searchText={searchText.current} /> : <RecentChats />}
				</div>
			</div>
		</div>
	)
}

export default ChatContent
