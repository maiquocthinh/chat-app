import React from 'react'
import Tooltip from '../Tooltip'

import './Dropdown.scss'

const Dropdown = ({ children, ...props }) => {
	console.log(children)
	return (
		<Tooltip {...props} trigger="click" component={children[1]}>
			{children[0]}
		</Tooltip>
	)
}

const DropdownTonggle = ({ children, ...props }) => (
	<div className="dropdown-toggle" {...props}>
		{children}
	</div>
)
const DropdownMenu = ({ children }) => <div className="dropdown-menu">{children}</div>
const DropdownItem = ({ children }) => <div className="dropdown-item">{children}</div>

export default Dropdown
export { DropdownTonggle, DropdownMenu, DropdownItem }
