import React from 'react'
import Menu from '../../components/Menu'
import ChatContent from '../../components/ChatContent'
import UserChat from '../../components/UserChat'

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
		</div>
	)
}

export default Home
