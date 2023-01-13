import React, { useState } from 'react'

import './Tabs.scss'

const Tabs = ({ children }) => {
	const [activeTab, setActiveTab] = useState(0)
	return (
		<div className="tabs">
			<div className="tabs-header">
				<ul className="tabs-label">
					{children
						.filter((el) => el.type.name === 'Tab')
						.map((el, idx) => (
							<li
								key={idx}
								className={`tabs-label__item ${activeTab === idx ? 'active' : ''}`}
								onClick={() => setActiveTab(idx)}
							>
								{el.props?.label}
							</li>
						))}
				</ul>
			</div>
			<div className="tabs-content">
				{children
					.filter((el) => el.type.name === 'Tab')
					.map((el, idx) => (
						<div key={idx} className={`tabs-content__item ${activeTab === idx ? 'active' : ''}`}>
							{el.props?.children}
						</div>
					))}
			</div>
		</div>
	)
}
const Tab = () => <></>

export default Tabs
export { Tab }
