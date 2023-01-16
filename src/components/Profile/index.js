import React from 'react'
import UserStatusDot from '../UserStatusDot'
import Tabs, { Tab } from '../Tabs'
import FilePreview from '../UserChat/filePreview'

import './Profile.scss'
const Profile = () => {
	return (
		<div className="profile">
			<div className="profile__header">
				<div className="profile__header__avatar" id="profile-avatar">
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
				<div className="profile__body__introduce">
					<p>
						<span>Introduce: </span>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolores, ea eligendi
						mollitia nesciunt numquam provident quia quidem. Sint, voluptate.
					</p>
				</div>
				<Tabs>
					<Tab label="About">
						<ul className="list-info-user">
							<li className="list-info-user__item">
								<p>
									<span>Name:</span> Mai Quoc Thinh
								</p>
							</li>
							<li className="list-info-user__item">
								<p>
									<span>Address:</span> BRVT / Viet Nam
								</p>
							</li>
							<li className="list-info-user__item">
								<p>
									<span>Website:</span> abc.com
								</p>
							</li>
						</ul>
					</Tab>
					<Tab label="Attached Files">
						<ul className="list-attached-file">
							<li className="list-attached-file__item">
								<FilePreview file={{ name: 'adb.zip', size: 224343 }} />
							</li>
							<li className="list-attached-file__item">
								<FilePreview file={{ name: 'package.json', size: 124323 }} />
							</li>
							<li className="list-attached-file__item">
								<FilePreview file={{ name: 'run.exe', size: 624343 }} />
							</li>
						</ul>
					</Tab>
				</Tabs>
			</div>
		</div>
	)
}

export default Profile
