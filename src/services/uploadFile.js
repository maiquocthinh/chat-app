const uploadFile = async (files) => {
	const formData = new FormData()
	files.forEach((file) => {
		formData.append('files', file)
	})

	const response = await fetch('https://ruby-proud-xerus.cyclic.app/upload', {
		method: 'post',
		body: formData,
	}).then(async (response) => await response.json())

	return response
}
export default uploadFile
