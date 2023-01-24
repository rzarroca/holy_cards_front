import type { HolyCard } from 'pages/types'
import { apiReq } from 'lib/requests'
import { withSessionSsr } from 'lib/sessions'


export const getHolyCardsProps = withSessionSsr(async function handler({
	req,
	res,
}) {
	const sessionUser = req.session.user

	if (sessionUser === undefined || !sessionUser.isLoggedIn) {
		res.setHeader('location', '/')
		res.statusCode = 302
		res.end()
		return {
			props: {
				holyCards: [],
			},
		}
	}

	const config = {
		headers: { Authorization: `Bearer ${sessionUser.token}` },
	}
	const response = await apiReq.get('/holycards', config)
	const holyCards = response.data.data as HolyCard[]

	return {
		props: {
			holyCards,
		},
	}
})