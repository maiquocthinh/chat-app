import React, { useContext, useEffect, useRef, useState } from 'react'
import { collection, getDocs, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Message from './Message'
import { AuthContext } from '../../context/AuthContext'

const Messages = ({ chatId }) => {
	const { currentUser } = useContext(AuthContext)
	const messagesElmRef = useRef()
	const [messages, setMessages] = useState([])
	const [lastKey, setLastKey] = useState()
	const [isLoadMoreMessages, setIsLoadMoreMessages] = useState(false)
	const scrollHeight = useRef(0)
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
			const _lastMess = { ...doc.data(), id: doc.id }
			if (_lastMess.createAt) {
				setLastMess(_lastMess)
				setMessages((preMessages) => [_lastMess, ...preMessages])
			}
		})
	}

	const firstLoadMessagess = async () => {
		const q = query(
			collection(db, 'messages'),
			where('chatId', '==', chatId),
			orderBy('createAt', 'desc'),
			limit(5),
		)

		const querySnapshot = await getDocs(q)
		const _messages = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		setLastKey(_messages[_messages.length - 1].createAt)
		_messages.shift()
		setMessages((preMessages) => [..._messages, ...preMessages])
	}

	const nextLoadMessagess = async () => {
		if (!isEndMessages) {
			console.log(lastKey)
			const q = query(
				collection(db, 'messages'),
				where('chatId', '==', chatId),
				orderBy('createAt', 'desc'),
				startAfter(lastKey),
				limit(5),
			)

			const querySnapshot = await getDocs(q)
			const _messages = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			if (_messages.length > 0) setLastKey(_messages[_messages.length - 1].createAt)
			else {
				setIsEndMessages(true)
			}
			setMessages([...messages, ..._messages])
			scrollHeight.current = messagesElmRef.current.parentElement.scrollHeight
		}
	}

	useEffect(() => {
		;(async () => {
			try {
				await firstLoadMessagess()

				const unsub = getLastMessage()

				return () => {
					unsub()
				}
			} catch (error) {
				console.log(error)
			}
		})()
		messagesElmRef.current.parentElement.onscroll = (e) => {
			if (e.target.scrollTop === 0) setIsLoadMoreMessages(true)
		}
	}, [chatId])

	useEffect(() => {
		messagesElmRef.current.parentElement.scrollTop =
			messagesElmRef.current.parentElement.scrollHeight - scrollHeight.current
	}, [messages])

	useEffect(() => {
		messagesElmRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
	}, [lastMess])

	useEffect(() => {
		;(async () => {
			try {
				if (isLoadMoreMessages && !isEndMessages) {
					setIsLoadMoreMessages(false)
					await nextLoadMessagess()
				}
			} catch (error) {
				console.log(error)
			}
		})()
	})

	return (
		<div className="messages" ref={messagesElmRef}>
			{messages
				.map((message) => {
					if (message.messageFiles.length > 0) {
						if (message.messageFiles[0].mimeType.includes('image'))
							return (
								<Message
									key={message.id + Math.random() * 100}
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
									key={message.id + Math.random() * 100}
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
									key={message.id + Math.random() * 100}
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
								key={message.id + Math.random() * 100}
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
