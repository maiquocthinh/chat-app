import React from 'react'

import './Message.scss'
import { DownloadIcon, FileIcon, MoreIcon2, ShareIcon } from '../../assets/images/svgicon'
import Dropdown, { DropdownTonggle, DropdownMenu, DropdownItem } from '../Dropdown'
const FilePreview = ({ file }) => {
	return (
		<div className="file-preview">
			<div className="file-preview__icon">
				<FileIcon className="file-preview__icon__icon" />
			</div>
			<div className="file-preview__info">
				<h5 className="file-preview__info__name">{file.name}</h5>
				<p className="file-preview__info__size">{file.size + ` Bytes`}</p>
			</div>
			<Dropdown place="left">
				<DropdownTonggle>
					<div className="file-preview__action">
						<MoreIcon2 width="1.8rem" height="1.8rem" />
					</div>
				</DropdownTonggle>
				<DropdownMenu>
					<DropdownItem>
						Download <DownloadIcon height="1.4rem" width="1.4rem" />
					</DropdownItem>
					<DropdownItem>
						Forward <ShareIcon height="1.3rem" width="1.3rem" />{' '}
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	)
}

export default FilePreview
