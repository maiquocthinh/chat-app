import React from 'react'

import './Message.scss'
import { MoreIcon2, ClockIcon, PlayIcon, FileIcon } from '../../assets/images/svgicon'

const Message = ({ isText = false, isPhoto = false, isVideo = false, isFile = false, myMessage = false }) => {
	return (
		<div className={`${myMessage ? 'my ' : ''}message`}>
			<div className="message__avatar">
				<img src="https://i.imgur.com/AOgo2uD.jpg" alt="" />
				<h5>Ossie Wilson</h5>
			</div>
			<div className="message__content">
				<div className="message__content__wrapper">
					{isText ? (
						<div className="message__content__text">
							<p>hello kjdjjsd ijiqjiqj</p>
						</div>
					) : null}
					{isPhoto ? (
						<div className="message__content__images">
							<ul className="list-image">
								<li className="list-image__item">
									<img src="https://i.imgur.com/PBevzp8.jpg" alt="" />
								</li>
								<li className="list-image__item">
									<img src="https://i.imgur.com/o8gMKmy.jpg" alt="" />
								</li>
								<li className="list-image__item">
									<img src="https://i.imgur.com/AOgo2uD.jpg" alt="" />
								</li>
								<li className="list-image__item">
									<img src="https://i.imgur.com/rsDM7w7.jpg" alt="" />
								</li>
							</ul>
						</div>
					) : null}
					{isVideo ? (
						<div className="message__content__videos">
							<div className="list-video">
								<div className="list-video__item">
									<div className="video-preview">
										<img
											className="video-preview__thumb"
											src="https://i.ytimg.com/vi/PLSHmNSpfLU/maxresdefault.jpg"
											alt=""
										/>
										<div className="video-preview__icon-play">
											<PlayIcon />
										</div>
									</div>
								</div>
								<div className="list-video__item">
									<div className="video-preview">
										<img
											className="video-preview__thumb"
											src="https://i.ytimg.com/vi/PLSHmNSpfLU/maxresdefault.jpg"
											alt=""
										/>
										<div className="video-preview__icon-play">
											<PlayIcon />
										</div>
									</div>
								</div>
							</div>
						</div>
					) : null}
					{isFile ? (
						<div className="message__content__files">
							<div className="list-file">
								<div className="list-file__item">
									<div className="file-preview">
										<div className="file-preview__icon">
											<FileIcon className="file-preview__icon__icon" />
										</div>
										<div className="file-preview__info">
											<h5 className="file-preview__info__name">
												admin_v1.0_kndanooonnweuwqqo832743247b.zip
											</h5>
											<p className="file-preview__info__size">12.5 MB</p>
										</div>
										<div className="file-preview__action">
											<MoreIcon2 width="1.8rem" height="1.8rem" />
										</div>
									</div>
								</div>
							</div>
						</div>
					) : null}
					<div className="message__content__time">
						<ClockIcon width="1.1rem" height="1.1rem" />
						<span>12:32 AM</span>
					</div>
				</div>
				<div className="message__content__action">
					<MoreIcon2 height="2rem" width="2rem" />
				</div>
			</div>
		</div>
	)
}

export default Message
