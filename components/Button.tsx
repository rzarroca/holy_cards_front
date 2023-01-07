import { MouseEvent, ReactNode } from 'react'

export interface Props {
	children: ReactNode
	onClick?: () => {}
}

export default function Button({ children, onClick }: Props) {
	const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
		if (onClick) {
			onClick()
		}
	}
	return (
		<button
			onClick={handleMouseEvent}
			className="uppercase bg-primary rounded-md px-6 py-1 self-center fs-base text-black"
		>
			{children}
		</button>
	)
}
