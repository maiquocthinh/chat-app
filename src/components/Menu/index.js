import React, { useContext } from 'react'
import Button from '../Button'
import { chatsIcon, newchatIcon, usersIcon, profileIcon, settingIcon } from '../../assets/images'
import { Logo, LogoutIcon, ProfileIcon, SettingIcon } from '../../assets/images/svgicon'
import Dropdown, { DropdownItem, DropdownMenu, DropdownTonggle } from '../Dropdown'
import Profile from '../Profile'
import { ModalContext } from '../../context/ModalContext'
import { AuthContext } from '../../context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
	const { currentUser } = useContext(AuthContext)
	const { setOpenModal, setModalOptions } = useContext(ModalContext)
	const navigate = useNavigate()

	const showProfile = () => {
		setOpenModal(true)
		setModalOptions({
			title: 'Profile',
			children: (
				<Profile
					data={{
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
					}}
				/>
			),
		})
	}

	const handleLogout = () => {
		signOut(auth)
		navigate('/login')
	}

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
						<Button size="large" onClick={showProfile}>
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
									<img src={currentUser.photoURL} alt="Avatar" style={{ height: '100%' }} />
								</Button>
							</DropdownTonggle>
							<DropdownMenu>
								<DropdownItem onClick={showProfile}>
									Profile <ProfileIcon height="1.4rem" width="1.4rem" />{' '}
								</DropdownItem>
								<DropdownItem>
									Setting <SettingIcon height="1.4rem" width="1.4rem" />{' '}
								</DropdownItem>
								<DropdownItem onClick={handleLogout}>
									Log out <LogoutIcon height="1.4rem" width="1.4rem" />
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Menu
