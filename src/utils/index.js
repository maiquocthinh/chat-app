export const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object

export const timeChatConvert = (date) => {
	const isToday = new Date().toLocaleDateString() === date?.toLocaleDateString()
	return isToday
		? date?.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' })
		: date?.toLocaleDateString()
}
