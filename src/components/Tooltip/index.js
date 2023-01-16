import React, { useEffect, useRef } from 'react'

import './Tooltip.scss'

const Tooltip = ({ children, html, component, content, trigger = 'hover', place }) => {
	const refTooltip = useRef()
	const refTooltipCotent = useRef()
	const refTooltipArrow = useRef()

	const handleShow = () => {
		refTooltip.current.classList.add('show')
		const childElm = refTooltip.current.parentNode.firstChild
		const tooltipRect = refTooltip.current.getBoundingClientRect()
		const childElmRect = childElm.getBoundingClientRect()

		refTooltip.current.style.top = childElmRect.height + 10 + 'px'

		// auto tooltip position (left or right)
		if (tooltipRect.right > window.innerWidth) {
			refTooltip.current.style.left = 'unset'
			refTooltip.current.style.right = 0
		}
		if (tooltipRect.left < 0) {
			refTooltip.current.style.right = 'unset'
			refTooltip.current.style.left = 0
		}

		// tooltip position (top)
		if (place === 'top') {
			refTooltip.current.style.top = 'unset'
			refTooltip.current.style.bottom = childElm.getBoundingClientRect().height + 16 + 'px'
			refTooltipArrow.current.style.bottom = '-6px'
			refTooltipArrow.current.style.top = 'unset'
			refTooltipArrow.current.style.transform = 'rotate(225deg)'
		}

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
