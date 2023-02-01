import React, { useContext, useEffect, useRef, useState } from 'react'
import Input from '../Input'
import UserStatusBox from './UserStatusBox'
import UserMessageBoxWrapper from './UserMessageBoxWrapper'
import { collection, query, where, getDocs, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { AuthContext } from '../../context/AuthContext'

const ChatContent = () => {
	const { currentUser } = useContext(AuthContext)
	const chatContentHeaderRef = useRef()
	const chatContentBodyRef = useRef()
	const [searchText, setSearchText] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [recentChats, setRecentChats] = useState([])

	useEffect(() => {
		chatContentBodyRef.current.style.height = `calc(100% - ${chatContentHeaderRef.current.offsetHeight}px)`
	}, [])

	useEffect(() => {
		if (!searchText && currentUser?.uid)
			try {
				const q = query(
					collection(db, 'chats'),
					where('members', 'array-contains', currentUser.uid),
					orderBy('modifiedAt', 'desc'),
				)
				const unsub = onSnapshot(q, (querySnapshot) => {
					setRecentChats(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
				})
				return () => {
					unsub()
				}
			} catch (error) {
				console.log(error)
			}
	}, [currentUser, searchText])

	const handleSearch = async () => {
		if (!searchText) {
			setSearchResults([])
			return
		}

		const q = query(
			collection(db, 'users'),
			where('displayName', '>=', searchText),
			where('displayName', '<=', searchText + '\uf8ff'),
		)
		try {
			const querySnapshot = await getDocs(q)
			let searchRes = []
			querySnapshot.forEach((doc) => {
				searchRes = [...searchRes, doc.data()]
			})
			setSearchResults(searchRes)
		} catch (error) {}
	}

	const handleKey = (e) => {
		e.code === 'Enter' && handleSearch()
	}

	const handleSelect = () => {
		const chatContentDoc = document.querySelector('.chat-content')
		chatContentDoc.classList.add('mobile-d-none')
	}

	console.log(recentChats)

	return (
		<div className="chat-content">
			<div className="chat-content__header" ref={chatContentHeaderRef}>
				<div className="search-box">
					<Input
						type="text"
						placeholder="Search"
						className="search-box__input"
						onChange={(e) => setSearchText(e.target.value)}
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
					{!searchText ? (
						<ul className="chat-message-list">
							{recentChats.map((chat, i) => (
								<li className="chat-message-item" key={i}>
									<UserMessageBoxWrapper onClick={handleSelect} dataChat={chat} />
								</li>
							))}
						</ul>
					) : (
						searchResults.length > 0 && (
							<ul className="chat-message-list">
								{searchResults.map((result, i) => (
									<li className="chat-message-item" key={i}>
										<UserMessageBoxWrapper onClick={handleSelect} data={result} />
									</li>
								))}
							</ul>
						)
					)}
				</div>
			</div>
		</div>
	)
}

export default ChatContent
