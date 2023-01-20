import React, { useEffect, useRef, useState } from 'react'
import Input from '../Input'
import UserStatusBox from './UserStatusBox'
import UserMessageBox from './UserMessageBox'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config'

const ChatContent = () => {
	const chatContentHeaderRef = useRef()
	const chatContentBodyRef = useRef()
	const [searchText, setSearchText] = useState('')
	const [searchResults, setSearchResults] = useState([])

	useEffect(() => {
		chatContentBodyRef.current.style.height = `calc(100% - ${chatContentHeaderRef.current.offsetHeight}px)`
	}, [])

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
					{searchResults.length > 0 && (
						<ul className="chat-message-list">
							{searchResults.map((result, i) => (
								<li className="chat-message-item" key={i}>
									<UserMessageBox onClick={handleSelect} data={result} />
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	)
}

export default ChatContent
