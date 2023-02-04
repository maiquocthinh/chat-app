import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	serverTimestamp,
	startAfter,
	updateDoc,
	where,
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
	} catch (error) {}
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

export const loadMoreMessages = async ({ _limit, lastKey, chatId, setLastKey }) => {
	let q
	if (lastKey)
		q = query(
			collection(db, 'messages'),
			where('chatId', '==', chatId),
			orderBy('createAt', 'desc'),
			startAfter(lastKey),
			limit(_limit),
		)
	else
		q = query(collection(db, 'messages'), where('chatId', '==', chatId), orderBy('createAt', 'desc'), limit(_limit))
	const querySnapshot = await getDocs(q)
	const _messages = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
	if (_messages.length > 0) setLastKey(_messages[_messages.length - 1].createAt)
	if (lastKey) _messages.shift()
	return _messages
}
