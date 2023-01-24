import React, { useContext, useEffect, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'

import './InputMessageBox.scss'
import Button from '../Button'
import { AttachedIcon, PictureIcon, SendIcon, SimleIcon } from '../../assets/images/svgicon'
import Input from '../Input'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { AuthContext } from '../../context/AuthContext'

const InputMessageBox = ({ chatId }) => {
	const [messageText, setMessageText] = useState('')
	const [attached, setAttached] = useState(null)
	const [photo, setPhoto] = useState(null)
	const [isShowEmojiBox, setIsShowEmojiBox] = useState(false)
	const { currentUser } = useContext(AuthContext)

	const handleEmojiClick = (emojiObject, event) => {
		setMessageText((prevState) => prevState + emojiObject.emoji)
	}
	const handleAttachedClick = () => {
		setAttached(document.querySelector('#attached')?.files)
	}
	const handlePhotoClick = () => {
		setPhoto(document.querySelector('#photo')?.files)
	}

	useEffect(() => {
		// console.log({ messageText, attached, photo })
	}, [messageText, attached, photo])

	const firebaseFnc = {
		addMessage: async (messageText, messageFiles) => {
			return await addDoc(collection(db, 'messages'), {
				createAt: serverTimestamp(),
				createBy: doc(db, 'users', currentUser.uid),
				messageText: messageText,
				messageFiles: messageFiles || [],
				chatId: chatId,
			})
		},
		updateChat: async (messageDocRef) => {
			await updateDoc(doc(db, 'chats', chatId), {
				lastMessage: messageDocRef,
				modifiedAt: serverTimestamp(),
			})
		},
	}

	const handleSend = async () => {
		const messageDocRef = await firebaseFnc.addMessage(messageText)
		await firebaseFnc.updateChat(messageDocRef)
		setMessageText('')
	}

	return (
		<div className="input-message-box">
			{isShowEmojiBox ? (
				<EmojiPicker
					width="280px"
					height="380px"
					onEmojiClick={handleEmojiClick}
					autoFocusSearch={false}
					previewConfig={{ showPreview: false }}
					emojiStyle="facebook"
					lazyLoadEmojis={true}
				/>
			) : null}
			<Button onClick={handleAttachedClick}>
				<label htmlFor="attached">
					<AttachedIcon />
					<input id="attached" type="file" name="attached" multiple className="d-none" />
				</label>
			</Button>
			<Button onClick={handlePhotoClick}>
				<label htmlFor="photo">
					<PictureIcon />
					<input id="photo" type="file" name="photo" accept="image/*" multiple className="d-none" />
				</label>
			</Button>
			<Button onClick={() => setIsShowEmojiBox(!isShowEmojiBox)}>
				<SimleIcon />
			</Button>
			<Input
				className="input-message-box__input"
				type="text"
				placeholder="Type a message..."
				value={messageText}
				onChange={(e) => setMessageText(e.target.value)}
				onKeyDown={(e) => {
					e.code === 'Enter' && handleSend()
				}}
			/>
			<Button onClick={handleSend}>
				<SendIcon />
			</Button>
		</div>
	)
}

export default InputMessageBox
