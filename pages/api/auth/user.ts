import { withSessionRoute, SessionUser } from 'lib/sessions'
import { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(userRoute)

async function userRoute(
	req: NextApiRequest,
	res: NextApiResponse<SessionUser>
) {
	if (req.session.user) {
		res.json({
			...req.session.user,
			isLoggedIn: true
		})
	} else {
		res.json({
			isLoggedIn: false,
			token: '',
			user: null
		})
	}
}
