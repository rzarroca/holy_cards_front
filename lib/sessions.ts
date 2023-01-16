import type { User } from 'pages/types'
import type { IronSessionOptions } from 'iron-session'

import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextApiHandler,
} from 'next'

export interface SessionUser {
	user: User | null
	token: string
	isLoggedIn: boolean
}

declare module 'iron-session' {
	interface IronSessionData {
		user?: SessionUser
	}
}

export const sessionOptions: IronSessionOptions = {
	password: process.env.SECRET_COOKIE_PASSWORD as string,
	cookieName: process.env.COOKIE_NAME as string,
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
}

export function withSessionRoute(handler: NextApiHandler) {
	return withIronSessionApiRoute(handler, sessionOptions)
}

export function withSessionSsr<
	P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
	handler: (
		context: GetServerSidePropsContext
	) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
	return withIronSessionSsr(handler, sessionOptions)
}
