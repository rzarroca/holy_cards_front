import { MouseEvent, ReactNode } from 'react'

export interface Props {
	children: ReactNode
	onClick?: () => {} | void
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
			className="uppercase bg-primary rounded-md px-[3vw] py-[0.5vh] self-center fs-base text-black"
		>
			{children}
		</button>
	)
}
