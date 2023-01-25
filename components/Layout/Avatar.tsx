import { useState } from 'react'
import useUser from 'hooks/useUser'
import { serverReq } from 'lib/requests'
import { useMediaQuery } from 'react-responsive'

export interface AvatarState {
	showUserMenu: boolean
}

export default function Avatar() {
	const [showUserMenu, setshowUserMenu] =
		useState<AvatarState['showUserMenu']>(false)

	const { user, mutateUser } = useUser({ redirectTo: '/' })
	const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

	async function logoutUser() {
		try {
			const response = await serverReq.post('/auth/logout')
			mutateUser(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<article className="relative inline-block">
			<button
				onClick={() => setshowUserMenu(!showUserMenu)}
				className="bg-gray text-white px-[2vw] py-[0.5vh] self-center rounded-md"
			>
				{isMobile ? user?.name.slice(0, 2) : user?.name} ⌄
			</button>
			<ul className="absolute z-10 mt-[1vh] w-full text-right flex flex-col gap-[0.5vh]">
				<li className="block ">
					{showUserMenu && (
						<button
							onClick={logoutUser}
							className="bg-gray text-white px-[2vw] py-[0.5vh] self-center rounded-md"
						>
							Logout
						</button>
					)}
				</li>
			</ul>
		</article>
	)
}
