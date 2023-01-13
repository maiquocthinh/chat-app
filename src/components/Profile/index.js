import React from 'react'
import UserStatusDot from '../UserStatusDot'
import Tabs, { Tab } from '../Tabs'

import './Profile.scss'
const Profile = () => {
	return (
		<div className="profile">
			<div className="profile__header">
				<div className="profile__header__avatar">
					<img src="https://i.imgur.com/AOgo2uD.jpg" alt="avatar" />
				</div>
				<div className="profile__header__name">
					<span>Ossie Wilson</span>
				</div>
				<div className="profile__header__status">
					<UserStatusDot />
					<span>Online</span>
				</div>
			</div>
			<div className="profile__body">
				<Tabs>
					<Tab label="Tab 1">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam commodi eos fugit incidunt
						laborum modi mollitia quas ut voluptates!
					</Tab>
					<Tab label="Tab 2">BBBBBB</Tab>
					<Tab label="Tab 3">CCCCCC</Tab>
					<Tab label="Tab 4">DDDDDD</Tab>
					<Tab label="Tab 5">EEEEEE</Tab>
				</Tabs>
			</div>
		</div>
	)
}

export default Profile
