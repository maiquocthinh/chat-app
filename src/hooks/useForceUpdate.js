import { useState } from 'react'

const useForceUpdate = () => {
	const setState = useState()[1]
	return () => {
		setState(Date.now() * Math.random())
	}
}
export default useForceUpdate
