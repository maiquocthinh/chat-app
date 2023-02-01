import React, { useContext, useEffect, useRef, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Message from './Message'
import { AuthContext } from '../../context/AuthContext'

const Messages = ({ chatId }) => {
	const { currentUser } = useContext(AuthContext)
	const messagesElmRef = useRef()
	const [messages, setMessages] = useState([])

	useEffect(() => {
		try {
			const q = query(collection(db, 'messages'), where('chatId', '==', chatId), orderBy('createAt', 'desc'))
			const unsub = onSnapshot(q, (querySnapshot) => {
				setMessages(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
			})

			return () => {
				unsub()
			}
		} catch (error) {
			console.log(error)
		}
	}, [chatId])

	useEffect(() => {
		messagesElmRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
	}, [messages])

	return (
		<div className="messages" ref={messagesElmRef}>
			{messages
				.map((message) => {
					if (message.messageFiles.length > 0) {
						if (message.messageFiles[0].mimeType.includes('image'))
							return (
								<Message
									key={message.id}
									isPhoto
									myMessage={currentUser.uid === message.createBy.id}
									messageData={{
										images: message.messageFiles.map((file) => ({
											name: file.name,
											link: file.directLink,
										})),
										...message,
									}}
								/>
							)
						else if (message.messageFiles[0].mimeType.includes('video'))
							return (
								<Message
									key={message.id}
									isVideo
									myMessage={currentUser.uid === message.createBy.id}
									messageData={{
										videos: message.messageFiles.map((file) => ({
											name: file.name,
											link: file.directLink,
										})),
										...message,
									}}
								/>
							)
						else
							return (
								<Message
									key={message.id}
									isFile
									myMessage={currentUser.uid === message.createBy.id}
									messageData={{
										files: message.messageFiles.map((file) => ({
											name: file.name,
											link: file.directLink,
											size: file.size,
										})),
										...message,
									}}
								/>
							)
					} else {
						return (
							<Message
								key={message.id}
								isText
								myMessage={currentUser.uid === message.createBy.id}
								messageData={{
									text: message.messageText,
									...message,
								}}
							/>
						)
					}
				})
				.reverse()}
		</div>
	)
}

export default Messages
