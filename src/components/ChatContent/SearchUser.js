import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config'
import UserMessageBoxWrapper from './UserMessageBoxWrapper'

const SearchUser = ({ searchText }) => {
	const [searchResults, setSearchResults] = useState([])

	useEffect(() => {
		const q = query(
			collection(db, 'users'),
			where('displayName', '>=', searchText),
			where('displayName', '<=', searchText + '\uf8ff'),
		)
		try {
			;(async () => {
				const querySnapshot = await getDocs(q)
				setSearchResults(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
			})()
		} catch (error) {}
	}, [searchText])

	const handleSelect = () => {
		const chatContentDoc = document.querySelector('.chat-content')
		chatContentDoc.classList.add('mobile-d-none')
	}

	return (
		<ul className="chat-message-list">
			{searchResults.map((searchResult, i) => (
				<li className="chat-message-item" key={i}>
					<UserMessageBoxWrapper onClick={handleSelect} dataUser={searchResult} />
				</li>
			))}
		</ul>
	)
}

export default SearchUser
