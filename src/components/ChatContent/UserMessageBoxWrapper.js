import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'

import UserMessageBox from './UserMessageBox'
import Profile from '../Profile'
import { AuthContext } from '../../context/AuthContext'
import { ModalContext } from '../../context/ModalContext'
import { db } from '../../firebase/config'

const UserMessageBoxWrapper = ({ data, dataChat, ...props }) => {
	const { currentUser } = useContext(AuthContext)
	const { setOpenModal, setModalOptions } = useContext(ModalContext)
	const navigate = useNavigate()
	const [userProps, setUserProps] = useState({})
	const [roomProps, setRoomProps] = useState({})

	useEffect(() => {
		if (currentUser?.uid) {
			if (dataChat) {
				if (dataChat.type === 1) {
					;(async () => {
						// get data of firend chat
						const friendId = dataChat.members.filter((id) => id !== currentUser.uid)[0]
						const friendData = (await getDoc(doc(db, 'users', friendId))).data()
						// get data of lasted mess
						const latestMessageData = dataChat?.lastMessage
							? (await getDoc(dataChat.lastMessage)).data()
							: null

						let latestMessage = ''
						if (latestMessageData?.messageFiles?.length > 0) {
							if (latestMessageData.messageFiles[0].mimeType.includes('image'))
								latestMessage = 'Sended Image...'
							else if (latestMessageData.messageFiles[0].mimeType.includes('video'))
								latestMessage = 'Sended Video...'
							else latestMessage = 'Sended File...'
						} else {
							latestMessage = latestMessageData?.messageText
						}

						setRoomProps({
							photoURL: friendData.photoURL,
							displayName: friendData.displayName,
							latestMessage: latestMessage,
							lastMessageTime: latestMessageData?.createAt,
							isMakeNewChat: false,
							handleOnClick: () => {
								navigate(`/chat/${dataChat.id}`)
							},
							showProfile: (e) => {
								e.stopPropagation()
								setOpenModal(true)
								setModalOptions({
									title: 'Profile',
									children: (
										<Profile
											data={{
												displayName: friendData.displayName,
												photoURL: friendData.photoURL,
											}}
										/>
									),
								})
							},
						})
					})()
				}
			} else {
				let isChatted = false
				let ChatId = ''

				if (data?.chats?.private?.length > 0) {
					for (const privateChat of data.chats.private) {
						isChatted = privateChat?.user === currentUser.uid
						if (isChatted) {
							ChatId = privateChat.chat.id
							break
						}
					}
				}

				const handleOnClick = async () => {
					if (isChatted) {
						navigate(`/chat/${ChatId}`)
					} else {
						console.log('make new chat')
						const newChatID = await makeNewChat()
						navigate(`/chat/${newChatID}`)
					}
				}

				const makeNewChat = async () => {
					// create new doc chat

					const chatDocRef = await addDoc(collection(db, 'chats'), {
						type: 1,
						members: [currentUser.uid, data?.uid],
						createAt: serverTimestamp(),
						modifiedAt: serverTimestamp(),
					})

					// update chats private for currentUser
					await updateDoc(doc(db, 'users', currentUser.uid), {
						'chats.private': arrayUnion({
							chat: chatDocRef,
							user: data?.uid,
						}),
					})

					// update chats private for this user
					await updateDoc(doc(db, 'users', data.uid), {
						'chats.private': arrayUnion({
							chat: chatDocRef,
							user: currentUser?.uid,
						}),
					})

					ChatId = chatDocRef.id
					isChatted = true

					return chatDocRef.id
				}

				const showProfile = (e) => {
					e.stopPropagation()
					setOpenModal(true)
					setModalOptions({
						title: 'Profile',
						children: (
							<Profile
								data={{
									displayName: data.displayName,
									photoURL: data.photoURL,
								}}
							/>
						),
					})
				}

				setUserProps({
					photoURL: data.photoURL,
					displayName: data.displayName,
					isMakeNewChat: !isChatted,
					handleOnClick,
					showProfile,
				})
			}
		}
	}, [currentUser, data, dataChat])

	return <UserMessageBox dataProps={dataChat ? roomProps : userProps} {...props} />
}

export default UserMessageBoxWrapper
