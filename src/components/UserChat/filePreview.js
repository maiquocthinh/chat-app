import React from 'react'

import './Message.scss'
import { DownloadIcon, FileIcon, MoreIcon2, ShareIcon } from '../../assets/images/svgicon'
import Dropdown, { DropdownTonggle, DropdownMenu, DropdownItem } from '../Dropdown'
import { forceDownloadFile, formatFileSize } from '../../utils'

const FilePreview = ({ file }) => {
	const handleDownload = ({ link, name }) => {
		forceDownloadFile(link, name)
	}

	return (
		<div className="file-preview">
			<div className="file-preview__icon">
				<FileIcon className="file-preview__icon__icon" />
			</div>
			<div className="file-preview__info">
				<h5 className="file-preview__info__name">{file.name}</h5>
				<p className="file-preview__info__size">{formatFileSize(file.size)}</p>
			</div>
			<Dropdown place="left">
				<DropdownTonggle>
					<div className="file-preview__action">
						<MoreIcon2 width="1.8rem" height="1.8rem" />
					</div>
				</DropdownTonggle>
				<DropdownMenu>
					<DropdownItem onClick={() => handleDownload(file)}>
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
