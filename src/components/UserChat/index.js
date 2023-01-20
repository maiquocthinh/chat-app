import React, { useContext } from 'react'

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
import Message from './Message'
import Profile from '../Profile'
import { ModalContext } from '../../context/ModalContext'
import Dropdown, { DropdownItem, DropdownMenu, DropdownTonggle } from '../Dropdown'

const UserChat = () => {
	const { setOpenModal, setModalOptions } = useContext(ModalContext)

	const showProfile = () => {
		setOpenModal(true)
		setModalOptions({
			title: 'Profile',
			children: (
				<Profile
					data={{
						displayName: 'quoc thinh',
						photoURL:
							'https://www.gravatar.com/avatar/64f5dc909e0616a0f62882517b6170b4?s=64&d=identicon&r=PG&f=1',
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

	const handleClick = () => {
		const chatContentDoc = document.querySelector('.chat-content')
		chatContentDoc.classList.remove('mobile-d-none')
	}

	return (
		<div className="user-chat">
			<div className="user-chat__loader">
				<LoadingIcon height="6rem" width="6rem" className="loading-icon-svg" />
			</div>
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
			<div className="user-chat__header">
				<div className="header__icon-back desktop-d-none tablet-d-none" onClick={handleClick}>
					<LeftArrowIcon width="2.2rem" height="2.2rem" />
				</div>
				<div className="header__user">
					<div className="header__user__avatar">
						<img src="https://i.imgur.com/AOgo2uD.jpg" alt="abc" />
						<span className="user-status"></span>
					</div>
					<div className="header__user__info">
						<h5 className="header__user__info__name">Ossie Wilson</h5>
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
							<DropdownItem>
								Delete <TrashIcon height="1.4rem" width="1.4rem" />{' '}
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
			<div className="user-chat__body">
				{/**
				messageData
				{
					text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
					images:[
						{
							name:'sasas',
							link:'https://i.imgur.com/PBevzp8.jpg'
						},
						{
							name:'sasas',
							link:'https://i.imgur.com/o8gMKmy.jpg'
						},
						{
							name:'sasas',
							link:'https://i.imgur.com/AOgo2uD.jpg'
						},
						{
							name:'sasas',
							link:'https://i.imgur.com/rsDM7w7.jpg'
						},
					],
					videos:[
						{
						name:'iframe',
						link:'https://www.youtube-nocookie.com/embed/c5nhWy7Zoxg',
						isEmbed: true,
						},
						{
						name:'direct link',
						link:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
						isEmbed: false,
						},
					],
					files:[
						{
							name: 'admin_v1.0_kndanooonnweuwqqo832743247b.zip',
							link: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip',
							size: 505988
						},{
							name: 'admin_v1.0.zip',
							link: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample.tar',
							size: 2244608
						}
					]
				}
				*/}
				<div className="messages">
					<Message
						isText
						messageData={{
							text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
						}}
					/>
					<Message
						isPhoto
						messageData={{
							images: [
								{
									name: 'sasas',
									link: 'https://i.imgur.com/PBevzp8.jpg',
								},
								{
									name: 'sasas',
									link: 'https://i.imgur.com/o8gMKmy.jpg',
								},
								{
									name: 'sasas',
									link: 'https://i.imgur.com/AOgo2uD.jpg',
								},
								{
									name: 'sasas',
									link: 'https://i.imgur.com/rsDM7w7.jpg',
								},
							],
						}}
					/>
					<Message
						isVideo
						messageData={{
							videos: [
								{
									name: 'iframe',
									link: 'https://www.youtube-nocookie.com/embed/c5nhWy7Zoxg',
									isEmbed: true,
								},
								{
									name: 'direct link',
									link: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
									isEmbed: false,
								},
							],
						}}
					/>
					<Message
						isFile
						myMessage
						messageData={{
							files: [
								{
									name: 'admin_v1.0_kndanooonnweuwqqo832743247b.zip',
									link: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip',
									size: 505988,
								},
								{
									name: 'admin_v1.0.zip',
									link: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample.tar',
									size: 2244608,
								},
							],
						}}
					/>
					<Message
						isText
						myMessage
						messageData={{
							text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
						}}
					/>
					<Message
						isPhoto
						myMessage
						messageData={{
							images: [
								{
									name: 'sasas',
									link: 'https://i.imgur.com/PBevzp8.jpg',
								},
								{
									name: 'sasas',
									link: 'https://i.imgur.com/o8gMKmy.jpg',
								},
								{
									name: 'sasas',
									link: 'https://i.imgur.com/AOgo2uD.jpg',
								},
								{
									name: 'sasas',
									link: 'https://i.imgur.com/rsDM7w7.jpg',
								},
							],
						}}
					/>
					<Message
						isVideo
						myMessage
						messageData={{
							videos: [
								{
									name: 'iframe',
									link: 'https://www.youtube-nocookie.com/embed/c5nhWy7Zoxg',
									isEmbed: true,
								},
								{
									name: 'direct link',
									link: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
									isEmbed: false,
								},
							],
						}}
					/>
				</div>
			</div>
			<div className="user-chat__footer">
				<InputMessageBox />
			</div>
		</div>
	)
}

export default UserChat
