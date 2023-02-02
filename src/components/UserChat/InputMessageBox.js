import React, { useContext, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'

import './InputMessageBox.scss'
import Button from '../Button'
import { AttachedIcon, PictureIcon, SendIcon, SimleIcon } from '../../assets/images/svgicon'
import Input from '../Input'
import { AuthContext } from '../../context/AuthContext'
import { addMessage, updateLastMessage } from '../../firebase/service'
import uploadFile from '../../services/uploadFile'

const InputMessageBox = ({ chatId }) => {
	const [messageText, setMessageText] = useState('')
	const [isShowEmojiBox, setIsShowEmojiBox] = useState(false)
	const { currentUser } = useContext(AuthContext)

	const handleEmojiClick = (emojiObject, event) => {
		setMessageText((prevState) => prevState + emojiObject.emoji)
	}
	const handleFilesSelect = async (e) => {
		const files = Array.prototype.map.bind(e.target.files)((file) => file)
		const response = await uploadFile(files)

		if (Array.isArray(response.data)) {
			const messageFiles = response.data.map((file) => ({
				directLink: file.url,
				name: file.name,
				size: file.size,
				mimeType: file.mimeType,
			}))

			const messageDocRef = await addMessage({ messageFiles, userId: currentUser.uid, chatId })
			await updateLastMessage({ chatId, messageDocRef })
		}
	}

	const handleSend = async () => {
		const messageDocRef = await addMessage({ messageText, userId: currentUser.uid, chatId })
		await updateLastMessage({ chatId, messageDocRef })
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
			<Button>
				<label htmlFor="attached">
					<AttachedIcon />
					<input
						id="attached"
						type="file"
						name="attached"
						multiple
						className="d-none"
						onChange={handleFilesSelect}
					/>
				</label>
			</Button>
			<Button>
				<label htmlFor="photo">
					<PictureIcon />
					<input
						id="photo"
						type="file"
						name="photo"
						accept="image/*"
						multiple
						className="d-none"
						onChange={handleFilesSelect}
					/>
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
