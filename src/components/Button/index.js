import React from 'react'
import { Link } from 'react-router-dom'

import './Button.scss'

const Button = ({ children, variant, color, size, disabled, to, href, ...props }) => {
	let ButtonComponent = 'button'

	let classNameList = []
	classNameList.push(color ? color : 'primary')
	classNameList.push(variant ? variant : 'contained')
	classNameList.push(size ? size : 'medium')

	// disabled all event of button
	if (disabled) {
		Object.keys(props).forEach((key) => {
			if (key.startsWith('on') && typeof props[key] === 'function') {
				delete props[key]
			}
		})
		props = { ...props, disabled }
	} else {
		if (to) {
			props.to = to
			ButtonComponent = Link
		} else if (href) {
			props.href = href
			ButtonComponent = 'a'
		}
	}

	return (
		<ButtonComponent className={`button ${classNameList.join(' ')}`} {...props}>
			{children}
		</ButtonComponent>
	)
}

export default Button
