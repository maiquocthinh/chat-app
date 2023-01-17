import React from 'react'
import Button from '../Button'
import { chatsIcon, newchatIcon, usersIcon, profileIcon, settingIcon } from '../../assets/images'
import { Logo } from '../../assets/images/svgicon'
import Dropdown, { DropdownItem, DropdownMenu, DropdownTonggle } from '../Dropdown'

const Menu = () => {
	return (
		<div className="menu">
			<div className="logo-wrapper">
				<a href="/">
					<span>
						<Logo height="3rem" width="3rem" style={{ width: '100%' }} />
					</span>
				</a>
			</div>
			<div className="nav-wrapper">
				<ul className="nav-list">
					<li className="nav-item">
						<Button size="large" to="/chats">
							<img src={chatsIcon} alt="Chats" style={{ height: '80%' }} />
						</Button>
					</li>
					<li className="nav-item">
						<Button size="large">
							<img src={newchatIcon} alt="New Chat" style={{ height: '80%' }} />
						</Button>
					</li>
					<li className="nav-item">
						<Button size="large" to="/firends">
							<img src={usersIcon} alt="Friends" style={{ height: '80%' }} />
						</Button>
					</li>
				</ul>
			</div>
			<div className="tools-wrapper">
				<ul className="tools-list">
					<li className="tools-item">
						<Button size="large">
							<img src={profileIcon} alt="Profile" style={{ height: '80%' }} />
						</Button>
					</li>
					<li className="tools-item">
						<Button size="large">
							<img src={settingIcon} alt="Setting" style={{ height: '80%' }} />
						</Button>
					</li>
					<li className="tools-item">
						<Dropdown place="top left">
							<DropdownTonggle>
								<Button size="large">
									<img
										src="https://xsgames.co/randomusers/avatar.php?g=male"
										alt="Avatar"
										style={{ height: '100%' }}
									/>
								</Button>
							</DropdownTonggle>
							<DropdownMenu>
								<DropdownItem>Profile</DropdownItem>
								<DropdownItem>Setting</DropdownItem>
								<DropdownItem>Log out</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Menu
