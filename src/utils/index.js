export const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object

export const calculateElapsedTime = (timeCreated) => {
	const created = new Date(timeCreated).getTime()
	let periods = {
		year: 365 * 30 * 24 * 60 * 60 * 1000,
		month: 30 * 24 * 60 * 60 * 1000,
		week: 7 * 24 * 60 * 60 * 1000,
		day: 24 * 60 * 60 * 1000,
		hour: 60 * 60 * 1000,
		minute: 60 * 1000,
	}
	let diff = Date.now() - created

	for (const key in periods) {
		if (diff >= periods[key]) {
			let result = Math.floor(diff / periods[key])
			return `${result} ${result === 1 ? key : key + 's'} ago`
		}
	}

	return 'Just now'
}

export const formatFileSize = (size) => {
	let i = Math.floor(Math.log(size) / Math.log(1024))

	return `${(size / Math.pow(1024, i)).toFixed(1)} ${['B', 'KB', 'MB', 'GB', 'TB'][i]}`
}

export const forceDownloadFile = (url, name = '') => {
	const anchor = document.createElement('a')
	anchor.href = url
	anchor.download = name || url
	anchor.style.display = 'none'
	document.body.appendChild(anchor)
	anchor.click()
	document.body.removeChild(anchor)
}

export const copyToClipboard = (text) => {
	try {
		if (navigator.clipboard && window.isSecureContext) {
			return navigator.clipboard.writeText(text)
		} else {
			let textArea = document.createElement('textarea')
			textArea.value = text
			textArea.style.position = 'fixed'
			textArea.style.left = '-999999px'
			textArea.style.top = '-999999px'
			document.body.appendChild(textArea)
			textArea.focus()
			textArea.select()
			return new Promise((res, rej) => {
				document.execCommand('copy') ? res() : rej()
				textArea.remove()
			})
		}
	} catch (error) {
		console.error(error)
	}
}
