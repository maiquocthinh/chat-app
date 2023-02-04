import { addDoc, collection, deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from './config'

export const getChatById = async (id) => {
	try {
		const docSnap = await getDoc(doc(db, 'chats', id))
		if (docSnap.exists()) return docSnap.data()
	} catch (error) {
		console.log(error)
	}
}
export const getUserById = async (id) => {
	try {
		const docSnap = await getDoc(doc(db, 'users', id))
		if (docSnap.exists()) return docSnap.data()
	} catch (error) {
		console.log(error)
	}
}

export const getMessageById = async (id) => {
	try {
		const docSnap = await getDoc(doc(db, 'messages', id))
		if (docSnap.exists()) return docSnap.data()
	} catch (error) {
		console.log(error)
	}
}
export const deleteMessageById = async (id) => {
	try {
		await deleteDoc(doc(db, 'messages', id))
	} catch (error) {
		console.log(error)
	}
}

export const addMessage = async ({ messageText, messageFiles, userId, chatId }) => {
	return await addDoc(collection(db, 'messages'), {
		createAt: serverTimestamp(),
		createBy: doc(db, 'users', userId),
		messageText: messageText || '',
		messageFiles: messageFiles || [],
		chatId,
	})
}
export const updateLastMessage = async ({ chatId, messageDocRef }) => {
	await updateDoc(doc(db, 'chats', chatId), {
		lastMessage: messageDocRef,
		modifiedAt: serverTimestamp(),
	})
}
