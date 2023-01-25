import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useUser from 'hooks/useUser'
import Avatar from './Avatar'
import BackButton from './BackButton'

type Props = {
	children: ReactNode
}

const Layout = ({ children = null }: Props) => {
	const { user } = useUser({ redirectTo: '/' })

	return (
		<>
			<header className="flex justify-around items-end p-[2vh]">
				<BackButton />
				<Link href={user ? '/home' : '/'}>
					<figure className="w-[10vw] max-w-[60px] min-w-[32px]">
						<Image
							src="/calima_logo_small.png"
							alt="calima logo"
							width="508"
							height="352"
							className="object-contain"
						/>
					</figure>
				</Link>

				<h4 className="fs-md">HolyCards</h4>

				<Avatar />
			</header>

			{children}

			<footer className="fs-sm w-full text-center p-[2vh]">
				© calimadev team - 2023
			</footer>
		</>
	)
}

export default Layout
