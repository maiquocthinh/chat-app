import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	updateDoc,
	where,
	writeBatch,
} from 'firebase/firestore'
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

export const deleteChat = async (chatId) => {
	try {
		const batch = writeBatch(db)
		const chatDoc = await getDoc(doc(db, 'chats', chatId))
		const chatDocData = chatDoc.data()
		const promises = []
		let q, querySnapshot

		// chat type private (2 person)
		if (chatDocData.type === 1) {
			// delete all document messages of chat
			q = query(collection(db, 'messages'), where('chatId', '==', chatId))
			querySnapshot = await getDocs(q)
			querySnapshot.forEach((doc) => batch.delete(doc.ref))

			// delete chatinfo in user document
			q = query(collection(db, 'users'), where('uid', 'in', chatDocData.members))
			querySnapshot = await getDocs(q)
			querySnapshot.forEach((doc) => {
				batch.update(doc.ref, {
					'chats.private': doc.data().chats.private.filter((privateItem) => privateItem.chat.id !== chatId),
				})
			})
			promises.push(batch.commit())

			// detele chat document
			promises.push(deleteDoc(chatDoc.ref))

			await Promise.all(promises)
		}
	} catch (error) {
		console.log(error)
	}
}
