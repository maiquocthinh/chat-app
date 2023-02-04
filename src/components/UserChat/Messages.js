import React, { useContext, useEffect, useRef, useState } from 'react'
import { collection, getDocs, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Message from './Message'
import { AuthContext } from '../../context/AuthContext'

const Messages = ({ chatId }) => {
	const { currentUser } = useContext(AuthContext)
	const messagesElmRef = useRef()
	const scrollHeightOld = useRef(0)
	const [messages, setMessages] = useState([])
	const [lastKey, setLastKey] = useState()
	const [isLoadMoreMessages, setIsLoadMoreMessages] = useState(false)
	const [lastMess, setLastMess] = useState()
	const [isEndMessages, setIsEndMessages] = useState(false)

	const getLastMessage = () => {
		const q = query(
			collection(db, 'messages'),
			where('chatId', '==', chatId),
			orderBy('createAt', 'desc'),
			limit(1),
		)
		return onSnapshot(q, (querySnapshot) => {
			const doc = querySnapshot.docs[0]
			if (doc) {
				const _lastMess = { ...doc.data(), id: doc.id }
				if (_lastMess.createAt) {
					setLastMess(_lastMess)
					setMessages((preMessages) => [_lastMess, ...preMessages])
				}
			}
		})
	}

	const firstLoadMessagess = async () => {
		const q = query(
			collection(db, 'messages'),
			where('chatId', '==', chatId),
			orderBy('createAt', 'desc'),
			limit(7),
		)

		const querySnapshot = await getDocs(q)
		const _messages = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		setLastKey(_messages[_messages.length - 1].createAt)
		_messages.shift()
		setMessages((preMessages) => [..._messages, ...preMessages])
	}

	const nextLoadMessagess = async () => {
		if (!isEndMessages) {
			const q = query(
				collection(db, 'messages'),
				where('chatId', '==', chatId),
				orderBy('createAt', 'desc'),
				startAfter(lastKey),
				limit(7),
			)

			const querySnapshot = await getDocs(q)
			const _messages = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			if (_messages.length > 0) setLastKey(_messages[_messages.length - 1].createAt)
			else setIsEndMessages(true)

			setMessages([...messages, ..._messages])
			scrollHeightOld.current = messagesElmRef.current.parentElement.scrollHeight
		}
	}

	useEffect(() => {
		;(async () => {
			try {
				await firstLoadMessagess() // first load 4 messages lasted
				const unsub = getLastMessage() // listen a newest message
				return () => unsub()
			} catch (error) {
				console.log(error)
			}
		})()
		// Listen when scroll
		messagesElmRef.current.parentElement.onscroll = (e) => {
			// If scroll top load more messages
			if (e.target.scrollTop === 0) setIsLoadMoreMessages(true)
		}
	}, [chatId])

	useEffect(() => {
		messagesElmRef.current.parentElement.scrollTop =
			messagesElmRef.current.parentElement.scrollHeight - scrollHeightOld.current
	}, [messages])

	useEffect(() => {
		// Scroll into newest message
		messagesElmRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
	}, [lastMess])

	useEffect(() => {
		;(async () => {
			try {
				if (isLoadMoreMessages && !isEndMessages) {
					await nextLoadMessagess() // Load more 5 messages next
					setIsLoadMoreMessages(false)
				}
			} catch (error) {
				console.log(error)
			}
		})()
	}, [isLoadMoreMessages, isEndMessages])

	return (
		<div className="messages" ref={messagesElmRef}>
			{messages
				.map((message) => {
					if (message.messageFiles.length > 0) {
						if (message.messageFiles[0].mimeType.includes('image'))
							return (
								<Message
									key={message.id + Math.random() * 10}
									isPhoto
									setMessages={setMessages}
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
									key={message.id + Math.random() * 10}
									isVideo
									setMessages={setMessages}
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
									key={message.id + Math.random() * 10}
									isFile
									setMessages={setMessages}
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
								key={message.id + Math.random() * 10}
								isText
								setMessages={setMessages}
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
