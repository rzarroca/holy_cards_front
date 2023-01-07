import type { NextApiRequest, NextApiResponse } from 'next'
import { Day } from 'react-modern-calendar-datepicker'
import { parseCalendarDate, getListOfDates } from 'utils/dateUtils'

export type HCReservationsResponse = {
	status: string
	data?: Day[] | void
	message?: string
}

export default async function reservations(
	req: NextApiRequest,
	res: NextApiResponse<HCReservationsResponse>
) {
	const holyCardId = req.query.id

	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append(
		'Authorization',
		'Bearer 3|9IKZ7qLQCheNRNvL4m4eE78uQPqgT6TcVLxSudlE'
	)

	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
	}

	const reservations = await fetch(
		`http://localhost:8000/api/v1/holycards/${holyCardId}/reservations`,
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => {
			const listOfReservedDays: Day[] = []
			const reservations = result.data

			reservations.forEach((reservation: any) => {
				const reservedDays = getListOfDates(
					reservation.start_date,
					reservation.end_date
				)

				const parsedReservedDays = reservedDays.map((day) =>
					parseCalendarDate(day)
				)

				listOfReservedDays.push(...parsedReservedDays)
			})

			return listOfReservedDays
		})
		.catch((e) => {
			res.status(500).json({
				status: 'error',
				message: e.message ?? 'Error fetching data',
			})
		})

	res.status(200).json({
		status: 'success',
		data: reservations,
	})
}
