import React, { useEffect, useRef } from 'react'

import './Tooltip.scss'

const Tooltip = ({ children, html, component, content, trigger = 'hover', place = 'bottom left' }) => {
	const refTooltip = useRef()
	const refTooltipCotent = useRef()
	const refTooltipArrow = useRef()

	const handleShow = (e) => {
		e.stopPropagation()
		refTooltip.current.classList.add('show')
		const childElm = refTooltip.current.parentNode.firstChild
		const childElmRect = childElm.getBoundingClientRect()

		// place
		switch (place) {
			case 'top': {
				refTooltip.current.style.top = 'unset'
				refTooltip.current.style.bottom = childElm.getBoundingClientRect().height + 16 + 'px'
				refTooltipArrow.current.style.bottom = '-6px'
				refTooltipArrow.current.style.top = 'unset'
				refTooltipArrow.current.style.transform = 'rotate(225deg)'
				break
			}
			case 'bottom': {
				refTooltip.current.style.top = childElmRect.height + 10 + 'px'
				break
			}
			case 'left': {
				refTooltip.current.style.left = 'unset'
				refTooltip.current.style.right = childElmRect.width + 10 + 'px'
				refTooltipArrow.current.style.transform = 'rotate(135deg)'
				refTooltipArrow.current.style.left = 'unset'
				refTooltipArrow.current.style.right = '-6px'
				refTooltipArrow.current.style.top = '4px'

				break
			}
			case 'right': {
				refTooltip.current.style.right = 'unset'
				refTooltip.current.style.left = childElmRect.width + 10 + 'px'
				refTooltipArrow.current.style.transform = 'rotate(-45deg)'
				refTooltipArrow.current.style.left = '-6px'
				refTooltipArrow.current.style.rigth = 'unset'
				refTooltipArrow.current.style.top = '4px'
				break
			}
			default: {
				if (place?.includes('bottom')) {
					refTooltip.current.style.top = childElmRect.height + 10 + 'px'
				} else if (place?.includes('top')) {
					refTooltip.current.style.top = 'unset'
					refTooltip.current.style.bottom = childElm.getBoundingClientRect().height + 16 + 'px'
					refTooltipArrow.current.style.bottom = '-6px'
					refTooltipArrow.current.style.top = 'unset'
					refTooltipArrow.current.style.transform = 'rotate(225deg)'
				}
				if (place?.includes('left')) {
					refTooltip.current.style.left = 'unset'
					refTooltip.current.style.right = 0
				} else if (place?.includes('right')) {
					refTooltip.current.style.right = 'unset'
					refTooltip.current.style.left = 0
				}
			}
		}

		const tooltipRect = refTooltip.current.getBoundingClientRect()

		// auto arrow position (mid of childrenELm)
		if (childElmRect.left < tooltipRect.right && childElmRect.right > tooltipRect.left) {
			const midPoint = childElmRect.left + childElmRect.width / 2
			if (midPoint > tooltipRect.left && midPoint < tooltipRect.right) {
				refTooltipArrow.current.style.left = midPoint - tooltipRect.left - 10 + 'px'
			}
		}
	}

	const handleHidden = () => {
		setTimeout(() => {
			if (refTooltip.current.matches(':hover')) return
			refTooltip.current.classList.remove('show')
		}, 300)
	}

	useEffect(() => {
		if (!component) {
			if (html) refTooltipCotent.current.innerHTML = html
			else if (content) refTooltipCotent.current.textContent = content
		}
		refTooltip.current.onmouseleave = handleHidden
	})

	return (
		<div className="tooltip-wrapper">
			{React.cloneElement(children, {
				onClick: trigger === 'click' ? handleShow : null,
				onMouseOver: trigger === 'hover' ? handleShow : null,
				onMouseLeave: handleHidden,
			})}
			<div ref={refTooltip} className="tooltip">
				<div ref={refTooltipCotent} className="tooltip-content">
					{component?.render ? component.render() : component}
				</div>
				<div ref={refTooltipArrow} className="tooltip-arrow"></div>
			</div>
		</div>
	)
}

export default Tooltip
