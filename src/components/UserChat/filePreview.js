import React from 'react'

import './Message.scss'
import { FileIcon, MoreIcon2 } from '../../assets/images/svgicon'
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
			<div className="file-preview__action">
				<MoreIcon2 width="1.8rem" height="1.8rem" />
			</div>
		</div>
	)
}

export default FilePreview
