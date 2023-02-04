import React, { useContext, useEffect, useState } from 'react'

import './Message.scss'
import { MoreIcon2, ClockIcon, PlayIcon, CopyIcon, SaveIcon, TrashIcon, ShareIcon } from '../../assets/images/svgicon'
import { ModalContext } from '../../context/ModalContext'
import FilePreview from './filePreview'
import Dropdown, { DropdownItem, DropdownMenu, DropdownTonggle } from '../Dropdown'
import { AuthContext } from '../../context/AuthContext'
import { calculateElapsedTime, copyToClipboard } from '../../utils'
import { getUserById } from '../../firebase/service'

const Message = ({ isText, isPhoto, isVideo, isFile, myMessage, messageData }) => {
	const { setOpenModalPreview, setModalPreviewOptions } = useContext(ModalContext)
	const { currentUser } = useContext(AuthContext)
	const [UserObj, setUserObj] = useState({})

	useEffect(() => {
		if (!myMessage) {
			;(async () => {
				setUserObj(await getUserById(messageData.createBy.id))
			})()
		}
	}, [])

	const handleCopy = ({ text }) => {
		if (text) copyToClipboard(text)
	}

	return (
		<div className={`${myMessage ? 'my ' : ''}message`}>
			<div className="message__avatar">
				<img src={myMessage ? currentUser.photoURL : UserObj.photoURL} alt="" />
				<h5>{myMessage ? currentUser.displayName : UserObj.displayName}</h5>
			</div>
			<div className="message__content">
				<div className="message__content__wrapper">
					{isText ? (
						<div className="message__content__text">
							<p>{messageData?.text}</p>
						</div>
					) : null}
					{isPhoto ? (
						<div className="message__content__images">
							<ul className="list-image">
								{messageData?.images.map((image, index) => {
									return (
										<li
											key={index}
											className="list-image__item"
											onClick={() => {
												setOpenModalPreview(true)
												setModalPreviewOptions({
													title: image.name,
													srcImg: image.link,
												})
											}}
										>
											<img src={image.link} alt={image.name} />
										</li>
									)
								})}
							</ul>
						</div>
					) : null}
					{isVideo ? (
						<div className="message__content__videos">
							<div className="list-video">
								{messageData?.videos.map((video, index) => {
									return (
										<div
											key={index}
											className="list-video__item"
											onClick={() => {
												setOpenModalPreview(true)
												setModalPreviewOptions(
													video.isEmbed
														? {
																title: video.name,
																srcIframe: video.link,
														  }
														: {
																title: video.name,
																srcVideo: video.link,
														  },
												)
											}}
										>
											<div className="video-preview">
												<img
													className="video-preview__thumb"
													src="https://i.imgur.com/ZgDHEme.jpg"
													alt=""
												/>
												<div className="video-preview__icon-play">
													<PlayIcon />
												</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					) : null}
					{isFile ? (
						<div className="message__content__files">
							<div className="list-file">
								{messageData.files.map((file, index) => {
									return (
										<div key={index} className="list-file__item">
											<FilePreview file={file} />
										</div>
									)
								})}
							</div>
						</div>
					) : null}
					<div className="message__content__time">
						<ClockIcon width="1.1rem" height="1.1rem" />
						<span>{calculateElapsedTime(messageData.createAt?.toDate())}</span>
					</div>
				</div>
				<div className="message__content__action">
					<Dropdown place={`${myMessage ? 'left' : 'right'}`}>
						<DropdownTonggle>
							<MoreIcon2 height="2rem" width="2rem" style={{ transform: 'rotate(90deg)' }} />
						</DropdownTonggle>
						<DropdownMenu>
							<DropdownItem
								onClick={(e) => {
									e.preventDefault()
									handleCopy({
										text: messageData?.text,
									})
								}}
							>
								Copy <CopyIcon height="1.4rem" width="1.4rem" />
							</DropdownItem>
							<DropdownItem>
								Save <SaveIcon height="1.2rem" width="1.2rem" />
							</DropdownItem>
							<DropdownItem>
								Forward <ShareIcon height="1.3rem" width="1.3rem" />{' '}
							</DropdownItem>
							<DropdownItem>
								Delete <TrashIcon height="1.4rem" width="1.4rem" />
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		</div>
	)
}

export default Message
