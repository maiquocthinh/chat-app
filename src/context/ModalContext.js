import { createContext, useState } from 'react'

export const ModalContext = createContext()

export const ModalContextProvider = ({ children }) => {
	const [modalPreviewOptions, setModalPreviewOptions] = useState({})
	const [openModalPreview, setOpenModalPreview] = useState(false)
	const [modalOptions, setModalOptions] = useState({})
	const [openModal, setOpenModal] = useState(false)
	return (
		<ModalContext.Provider
			value={{
				modalPreviewOptions,
				setModalPreviewOptions,
				openModalPreview,
				setOpenModalPreview,
				modalOptions,
				setModalOptions,
				openModal,
				setOpenModal,
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}
