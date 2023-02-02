import React, { useContext, useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../../firebase/config'
import UserMessageBoxWrapper from './UserMessageBoxWrapper'
import { AuthContext } from '../../context/AuthContext'

const RecentChats = () => {
	const [recentChats, setRecentChats] = useState([])
	const { currentUser } = useContext(AuthContext)

	// listen recent chat
	useEffect(() => {
		if (currentUser?.uid)
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
	}, [currentUser?.uid])

	const handleSelect = () => {
		const chatContentDoc = document.querySelector('.chat-content')
		chatContentDoc.classList.add('mobile-d-none')
	}

	return (
		<ul className="chat-message-list">
			{recentChats.map((chat, i) => (
				<li className="chat-message-item" key={i}>
					<UserMessageBoxWrapper onClick={handleSelect} dataChat={chat} />
				</li>
			))}
		</ul>
	)
}

export default RecentChats
