import React from 'react'
import UserStatusDot from '../UserStatusDot'
import Tabs, { Tab } from '../Tabs'
import FilePreview from '../UserChat/filePreview'
import { userDefaultIcon } from '../../assets/images'

import './Profile.scss'

const Profile = ({ data }) => {
	return (
		<div className="profile">
			<div className="profile__header">
				<div className="profile__header__avatar" id="profile-avatar">
					<img src={data?.photoURL || userDefaultIcon} alt="avatar" />
				</div>
				<div className="profile__header__name">
					<span>{data?.displayName || 'unknown'}</span>
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
						{data?.introduce ||
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolores, ea eligendi mollitia nesciunt numquam provident quia quidem. Sint, voluptate.'}
					</p>
				</div>
				<Tabs>
					<Tab label="About">
						<ul className="list-info-user">
							<li className="list-info-user__item">
								<p>
									<span>Name:</span>
									{data?.displayName || 'unknown'}
								</p>
							</li>
							<li className="list-info-user__item">
								<p>
									<span>Address:</span> {data?.address || 'unknown'}
								</p>
							</li>
							<li className="list-info-user__item">
								<p>
									<span>Website:</span> {data?.website || 'unknown'}
								</p>
							</li>
						</ul>
					</Tab>
					{data?.files && (
						<Tab label="Attached Files">
							<ul className="list-attached-file">
								{data.files.map((file, idx) => (
									<li className="list-attached-file__item" key={idx}>
										<FilePreview file={{ name: file.name, size: file.size }} />
									</li>
								))}
							</ul>
						</Tab>
					)}
				</Tabs>
			</div>
		</div>
	)
}

export default Profile
