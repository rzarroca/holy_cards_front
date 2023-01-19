import { withSessionRoute, SessionUser } from 'lib/sessions'
import { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(logout)

async function logout(req: NextApiRequest, res: NextApiResponse<SessionUser>) {
	req.session.destroy()
	res.json({
		isLoggedIn: false,
		token: '',
		user: null,
	})
}
