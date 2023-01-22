import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

import './UserMessageBox.scss'
import { ChatIcon, MoreIcon, ProfileIcon } from '../../assets/images/svgicon'
import Dropdown, { DropdownItem, DropdownMenu, DropdownTonggle } from '../Dropdown'
import Profile from '../Profile'
import { AuthContext } from '../../context/AuthContext'
import { ModalContext } from '../../context/ModalContext'

const UserMessageBox = ({ data, onClick: onClickProp, ...props }) => {
	const { currentUser } = useContext(AuthContext)
	const { setOpenModal, setModalOptions } = useContext(ModalContext)
	const navigate = useNavigate()
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

	const handleOnClick = () => {
		if (isChatted) {
			navigate(`/chat/${ChatId}`)
		} else {
			console.log('make new chat')
			makeNewChat()
		}
	}

	const makeNewChat = async () => {
		// create new doc chat

		const chatDocRef = await addDoc(collection(db, 'chats'), {
			type: 1,
			members: [currentUser.uid, data?.uid],
			createAt: serverTimestamp(),
			modifiedAtAt: serverTimestamp(),
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

	return (
		<div className="user-message-box" onClick={handleOnClick} {...props}>
			<div className="user-message-box__avatar">
				<img src={data?.photoURL} alt="" />
				<span className="user-status"></span>
			</div>
			<div className="user-message-box__info">
				<div className="details">
					<h5 className="user-name">{data?.displayName}</h5>
					{/* <p className="user-latest-message">
						Hi, i am josephin. How are you.. ! There are many variations of passages.
					</p> */}
				</div>
				<div className="date-and-actions">
					<span className="date">11:05 AM</span>
					<div className="action-toggle">
						<Dropdown place="left">
							<DropdownTonggle>
								<MoreIcon width="2rem" height="2rem" />
							</DropdownTonggle>

							<DropdownMenu>
								{isChatted || (
									<DropdownItem>
										New Chat <ChatIcon height="1.4rem" width="1.4rem" />
									</DropdownItem>
								)}
								<DropdownItem onClick={showProfile}>
									Profile <ProfileIcon height="1.4rem" width="1.4rem" />{' '}
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
					<div className="new-message-count">3</div>
				</div>
			</div>
		</div>
	)
}

export default UserMessageBox
