import React from 'react'
import Menu from '../../components/Menu'
import ChatContent from '../../components/ChatContent'
import UserChat from '../../components/UserChat'
import { ModalPreview } from '../../components/Modal'
const Home = () => {
	return (
		<div className="home">
			<div className="home-container">
				<div className="home-wrapper">
					<Menu></Menu>
					<ChatContent></ChatContent>
					<UserChat></UserChat>
				</div>
			</div>
			<ModalPreview />
		</div>
	)
}

export default Home
