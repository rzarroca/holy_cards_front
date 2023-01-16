import { NextApiRequest, NextApiResponse } from 'next'
import { SessionUser, withSessionRoute } from 'lib/sessions'
import { apiReq } from 'lib/requests'
import { AxiosError } from 'axios'

export default withSessionRoute(login)

async function login(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { email, password } = await req.body
		const { data } = await apiReq.post('login', {
			email,
			password,
		})

		const user = {
			user: data.data,
			token: data.token,
			isLoggedIn: true
		} as SessionUser

		req.session.user = user
		await req.session.save()

		res.status(200).json(user)
	} catch (error) {
		if (error instanceof AxiosError) {
			res.status(error.response?.status as number).json({
				message: error.response?.data.message,
			})
		} else {
			res.status(500).json({ message: 'Error on login, please try again' })
		}
	}
}
