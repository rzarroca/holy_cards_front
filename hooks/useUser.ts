import { useEffect } from 'react'
import Router from 'next/router'
import useSWR, { Key, Fetcher } from 'swr'
import { SessionUser } from 'lib/sessions'
import { serverReq } from 'lib/requests'

export default function useUser({
	redirectTo = '',
	redirectIfFound = false,
} = {}) {
	const { data: sessionUser, mutate: mutateUser } =
		useSWR<SessionUser>('/auth/user', fetcher)

		async function fetcher(url: string) {
			try {
				const res = await serverReq(url)
				return res.data as SessionUser
			} catch (error) {
				console.log(error)
				return {
					isLoggedIn: false,
					token: '',
					user: null
				}
			}
		}

	useEffect(() => {
		// if no redirect needed, just return (example: already on /dashboard)
		// if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
		if (!redirectTo || !sessionUser) return

		// If redirectTo is set, redirect if the user was not found.
		// OR If redirectIfFound is also set, redirect if the user was found
		if (
			(redirectTo && !redirectIfFound && !sessionUser?.isLoggedIn) ||
			(redirectIfFound && sessionUser?.isLoggedIn)
		) {
			Router.push(redirectTo)
		}
	}, [sessionUser, redirectIfFound, redirectTo])

	return { user: sessionUser?.user, mutateUser }
}
