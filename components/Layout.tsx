import { ReactNode } from 'react'
import Image from 'next/image'
import useUser from 'hooks/useUser'

type Props = {
	children: ReactNode
}

const Layout = ({ children = null }: Props) => {
	const { user } = useUser({ redirectTo: '/login' })

	return (
		<>
			<header className="flex justify-around items-center p-[2vh]">
				<figure className="w-[10vw] max-w-[60px] min-w-[32px]">
					<Image
						src="/calima_logo_small.png"
						alt="calima logo"
						width="508"
						height="352"
						className="object-contain"
					/>
				</figure>
				<h4 className="fs-md">HolyCards</h4>
			</header>
			{children}

			<footer className="fs-sm w-full text-center p-[2vh]">
				© calimadev team - 2023
			</footer>
		</>
	)
}

export default Layout
