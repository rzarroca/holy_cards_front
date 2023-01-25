import { AxiosError } from 'axios'
import { apiReq } from 'lib/requests'
import { withSessionRoute } from 'lib/sessions'
import { NextApiRequest, NextApiResponse } from 'next'

export interface Reservation {
	holyCardId: number
	startDate: Date
	endDate: Date
}

export default withSessionRoute(async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' })
		return
	}

	const { holyCardId, startDate, endDate } = req.body
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
	try {
		const { data } = await apiReq.post(
			`/reservations`,
			{
				holy_card_id: holyCardId,
				start_date: new Date(startDate),
				end_date: new Date(endDate),
			},
			config
		)

		res.send(data.data)
	} catch (error) {
		if (error instanceof AxiosError) {
			res.status(error.response?.status as number).json({
				message: error.response?.data.message,
			})
		} else {
			res.status(500).json({
				message: 'Error making new reservation. Please try again later',
			})
		}
	}
})
