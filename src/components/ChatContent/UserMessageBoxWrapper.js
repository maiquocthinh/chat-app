import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'

import UserMessageBox from './UserMessageBox'
import Profile from '../Profile'
import { AuthContext } from '../../context/AuthContext'
import { ModalContext } from '../../context/ModalContext'
import { db } from '../../firebase/config'

const UserMessageBoxWrapper = ({ dataUser, dataChat, ...props }) => {
	const { currentUser } = useContext(AuthContext)
	const { setOpenModal, setModalOptions } = useContext(ModalContext)
	const navigate = useNavigate()
	const [userProps, setUserProps] = useState({})
	const [roomProps, setRoomProps] = useState({})

	useEffect(() => {
		if (currentUser?.uid) {
			if (dataChat) {
				// private chat
				if (dataChat.type === 1) {
					;(async () => {
						// get data of firend chat
						const friendId = dataChat.members.filter((id) => id !== currentUser.uid)[0]
						const friendData = (await getDoc(doc(db, 'users', friendId))).data()
						// get data of lasted message
						const latestMessageData = dataChat?.lastMessage && (await getDoc(dataChat.lastMessage)).data()

						let latestMessage = ''
						if (latestMessageData?.messageFiles?.length > 0) {
							if (latestMessageData.messageFiles[0].mimeType.includes('image')) latestMessage = '🖼️ Image'
							else if (latestMessageData.messageFiles[0].mimeType.includes('video'))
								latestMessage = '🎬 Video'
							else latestMessage = '📎 File'
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

				if (dataUser?.chats?.private?.length > 0) {
					for (const privateChat of dataUser.chats.private) {
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
						const newChatID = await makeNewChat()
						navigate(`/chat/${newChatID}`)
					}
				}

				const makeNewChat = async () => {
					// create new doc chat
					const chatDocRef = await addDoc(collection(db, 'chats'), {
						type: 1,
						members: [currentUser.uid, dataUser.uid],
						createAt: serverTimestamp(),
						modifiedAt: serverTimestamp(),
					})

					// update chats private for currentUser
					await updateDoc(doc(db, 'users', currentUser.uid), {
						'chats.private': arrayUnion({
							chat: chatDocRef,
							user: dataUser?.uid,
						}),
					})

					// update chats private for this user
					await updateDoc(doc(db, 'users', dataUser.uid), {
						'chats.private': arrayUnion({
							chat: chatDocRef,
							user: currentUser?.uid,
						}),
					})

					ChatId = chatDocRef.id
					isChatted = true

					return ChatId
				}

				const showProfile = (e) => {
					e.stopPropagation()
					setOpenModal(true)
					setModalOptions({
						title: 'Profile',
						children: (
							<Profile
								data={{
									displayName: dataUser.displayName,
									photoURL: dataUser.photoURL,
								}}
							/>
						),
					})
				}

				setUserProps({
					photoURL: dataUser.photoURL,
					displayName: dataUser.displayName,
					isMakeNewChat: !isChatted,
					handleOnClick,
					showProfile,
				})
			}
		}
	}, [currentUser, dataUser, dataChat])

	return <UserMessageBox dataProps={dataChat ? roomProps : userProps} {...props} />
}

export default UserMessageBoxWrapper
