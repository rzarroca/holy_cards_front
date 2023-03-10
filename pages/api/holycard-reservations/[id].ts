import { apiReq } from 'lib/requests'
import { withSessionRoute } from 'lib/sessions'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getListOfDates } from 'utils/dateUtils'

export type HCReservationsResponse = {
	status: string
	data?: Date[] | void
	message?: string
}

export default withSessionRoute(async function reservations(
	req: NextApiRequest,
	res: NextApiResponse<HCReservationsResponse>
) {
	const holyCardId = req.query.id
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
		const response = await apiReq.get(
			`/holycards/${holyCardId}/reservations`,
			config
		)
		const reservations = response.data.data
		const listOfReservedDays: Date[] = []

		reservations.forEach((reservation: any) => {
			const reservedDays = getListOfDates(
				reservation.start_date,
				reservation.end_date
			)

			listOfReservedDays.push(...reservedDays)
		})

		res.status(200).json({
			status: 'success',
			data: listOfReservedDays,
		})
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: (error as Error).message ?? 'Error fetching data',
		})
	}
})
