import { ReactNode } from 'react'
import Image from 'next/image'

type Props = {
	children: ReactNode
}

const Layout = ({ children = null }: Props) => (
	<>
		<header className="flex justify-around items-center pt-[2vh]">
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

		<footer className="fs-sm absolute bottom-0 w-full text-center pb-[2vh]">
			© calimadev team - 2023
		</footer>
	</>
)

export default Layout
