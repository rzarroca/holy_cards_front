import { useState } from 'react'
import useUser from 'hooks/useUser'
import { serverReq } from 'lib/requests'

export interface AvatarState {
	showUserMenu: boolean
}

export default function Avatar() {
	const [showUserMenu, setshowUserMenu] =
		useState<AvatarState['showUserMenu']>(false)

	const { user, mutateUser } = useUser({ redirectTo: '/' })

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
			<button onClick={() => setshowUserMenu(!showUserMenu)}>
				{user?.name}
			</button>
			<ul className="absolute z-10 mt-[2vh] w-full text-right">
				<li className="block">
					{showUserMenu && <button onClick={logoutUser}>Logout</button>}
				</li>
			</ul>
		</article>
	)
}
