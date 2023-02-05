import React, { useContext, useEffect, useState } from 'react'

import {
	AttachedIcon,
	InfoIcon,
	LeftArrowIcon,
	LoadingIcon,
	Logo,
	MoreIcon2,
	MuteIcon,
	ProfileIcon,
	TrashIcon,
} from '../../assets/images/svgicon'
import Button from '../Button'
import InputMessageBox from './InputMessageBox'
import Profile from '../Profile'
import { ModalContext } from '../../context/ModalContext'
import { AuthContext } from '../../context/AuthContext'
import Dropdown, { DropdownItem, DropdownMenu, DropdownTonggle } from '../Dropdown'
import { useNavigate, useParams } from 'react-router-dom'
import { isEmptyObject } from '../../utils'
import Messages from './Messages'
import { deleteChat, getChatById, getUserById } from '../../firebase/service'

const UserChat = () => {
	const { setOpenModal, setModalOptions } = useContext(ModalContext)
	const { currentUser } = useContext(AuthContext)
	const { id: chatId } = useParams()
	const [UserObj, setUserObj] = useState({})
	const navigate = useNavigate()

	useEffect(() => {
		if (!isEmptyObject(currentUser) && chatId) {
			// hidden chatcontent on mobile
			document.querySelector('.chat-content')?.classList.add('mobile-d-none')
			;(async () => {
				const Chat = await getChatById(chatId)
				if (Chat?.type === 1) {
					const uid = Chat?.members.filter((val) => val !== currentUser.uid)[0]
					const userSnapData = await getUserById(uid)
					if (UserObj?.uid !== userSnapData.uid) setUserObj(userSnapData)
				}
			})()
		}
	}, [currentUser, UserObj, chatId])

	const showProfile = () => {
		setOpenModal(true)
		setModalOptions({
			title: 'Profile',
			children: (
				<Profile
					data={{
						displayName: UserObj.displayName,
						photoURL: UserObj.photoURL,
						introduce: 'lorem20',
						address: 'BRVT/VN',
						website: 'abc.com',
						files: [
							{ name: 'adb.zip', size: 224343 },
							{ name: 'package.json', size: 124323 },
							{ name: 'run.exe', size: 624343 },
						],
					}}
				/>
			),
		})
	}

	const handleBack = () => {
		const chatContentDoc = document.querySelector('.chat-content')
		chatContentDoc.classList.remove('mobile-d-none')
		navigate('/')
	}

	const handleDeleteChat = async (e) => {
		e.preventDefault()
		if (window.confirm('Do you want delete this chat room?')) {
			await deleteChat(chatId)
			navigate('/')
		}
	}

	return (
		<div className="user-chat">
			{false && (
				<div className="user-chat__loader">
					<LoadingIcon height="6rem" width="6rem" className="loading-icon-svg" />
				</div>
			)}
			{!!chatId || (
				<div className="user-chat__welcome">
					<div className="user-chat__welcome__wrapper">
						<div className="logo-box">
							<Logo height="10rem" width="10rem" />
						</div>
						<div className="welcome-content">
							<p>Welcome to Chat App</p>
							<span>Select a chat to read message</span>
						</div>
					</div>
				</div>
			)}
			{chatId && (
				<>
					<div className="user-chat__header">
						<div className="header__icon-back desktop-d-none tablet-d-none" onClick={handleBack}>
							<LeftArrowIcon width="2.2rem" height="2.2rem" />
						</div>
						<div className="header__user">
							<div className="header__user__avatar">
								<img src={UserObj.photoURL} alt="avatar" />
								<span className="user-status"></span>
							</div>
							<div className="header__user__info">
								<h5 className="header__user__info__name">{UserObj.displayName}</h5>
								<span className="header__user__info__status-text">Online</span>
							</div>
						</div>
						<div className="header__action">
							<Button onClick={showProfile}>
								<InfoIcon />
							</Button>
							<Dropdown>
								<DropdownTonggle>
									<Button>
										<MoreIcon2 />
									</Button>
								</DropdownTonggle>
								<DropdownMenu>
									<DropdownItem onClick={showProfile}>
										View profile <ProfileIcon height="1.4rem" width="1.4rem" />{' '}
									</DropdownItem>
									<DropdownItem>
										Archive <AttachedIcon height="1.4rem" width="1.4rem" />{' '}
									</DropdownItem>
									<DropdownItem>
										Muted <MuteIcon height="1.4rem" width="1.4rem" />{' '}
									</DropdownItem>
									<DropdownItem onClick={handleDeleteChat}>
										Delete <TrashIcon height="1.4rem" width="1.4rem" />{' '}
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					</div>
					<div className="user-chat__body">
						<Messages chatId={chatId} />
					</div>
					<div className="user-chat__footer">
						<InputMessageBox chatId={chatId} />
					</div>
				</>
			)}
		</div>
	)
}

export default UserChat
