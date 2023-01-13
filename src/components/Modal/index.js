import React, { useContext } from 'react'
import { CloseIcon } from '../../assets/images/svgicon'
import { ModalContext } from '../../context/ModalContext'

import Button from '../Button'
import './Modall.scss'
const Modal = ({ children, title, onModalOpen, onModalClose }) => {
	const { openModal, setOpenModal, modalOptions } = useContext(ModalContext)

	if (openModal && onModalOpen) onModalOpen()
	if (!openModal && onModalClose) onModalClose()

	return (
		<div className={`modal ${openModal ? '' : 'd-none'}`}>
			<div className="modal-overplay" onClick={() => setOpenModal(false)}></div>
			<div className="modal-dialog">
				<div className="modal-dialog__header">
					<h2 className="modal-dialog__header__title">{title || modalOptions?.title}</h2>
					<button className="modal-dialog__header__btn-close" onClick={() => setOpenModal(false)}>
						<CloseIcon height="2rem" width="2rem" />
					</button>
				</div>
				<div className="modal-dialog__body">{children || modalOptions?.children}</div>
				<div className="modal-dialog__footer">
					<Button
						color="danger"
						onClick={() => {
							setOpenModal(false)
						}}
					>
						Cancel
					</Button>
					<Button>Oke</Button>
				</div>
			</div>
		</div>
	)
}

const ModalPreview = ({ children, title, isShowState, srcImg, srcVideo, srcIframe }) => {
	const { openModalPreview, setOpenModalPreview, modalPreviewOptions } = useContext(ModalContext)

	return (
		<div className={`modal-preview ${openModalPreview ? '' : 'd-none'}`}>
			<div className="modal-preview__header">
				<h2 className="modal-preview__header__title">{title || modalPreviewOptions?.title}</h2>
				<button
					className="modal-preview__header__btn-close"
					onClick={() => {
						setOpenModalPreview(false)
					}}
				>
					<CloseIcon width="1.8rem" height="1.8rem" />
				</button>
			</div>
			<div className="modal-preview__body">
				<div className="modal-preview__wrapper">
					{srcImg || modalPreviewOptions?.srcImg ? (
						<img src={srcImg || modalPreviewOptions?.srcImg} alt="" />
					) : srcIframe || modalPreviewOptions?.srcIframe ? (
						<div className="modal-preview-video__wrapper">
							<iframe
								allowFullScreen="allowfullscreen"
								src={srcIframe || modalPreviewOptions?.srcIframe}
								title="Video Iframe"
							></iframe>
						</div>
					) : (
						<div className="modal-preview-video__wrapper">
							<video src={srcVideo || modalPreviewOptions?.srcVideo} controls></video>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Modal
export { ModalPreview }
