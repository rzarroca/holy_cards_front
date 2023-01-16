import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { SessionUser } from 'lib/sessions'

export default function useUser({
	redirectTo = '',
	redirectIfFound = false,
} = {}) {
	const { data: sessionUser, mutate: mutateUser } = useSWR<SessionUser>('/api/user')
	const user = sessionUser?.user

	useEffect(() => {
		// if no redirect needed, just return (example: already on /dashboard)
		// if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
		if (!redirectTo || !sessionUser) return

		if (
			// If redirectTo is set, redirect if the user was not found.
			(redirectTo && !redirectIfFound && !sessionUser) ||
			// If redirectIfFound is also set, redirect if the user was found
			(redirectIfFound && sessionUser)
		) {
			Router.push(redirectTo)
		}
	}, [user, redirectIfFound, redirectTo])

	return { user, mutateUser }
}
