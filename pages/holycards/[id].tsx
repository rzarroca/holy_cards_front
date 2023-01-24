import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { useState } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from 'components/Layout'
import Card from 'components/HolyCard'
import Button from 'components/Button'
import { withSessionSsr } from 'lib/sessions'
import { apiReq, serverReq } from 'lib/requests'
import useHolyCardReservations from 'hooks/useHolyCardReservations'
import { DateRange } from 'react-date-range'
import { addMonths } from 'utils/dateUtils'

import type { ReactNode, ChangeEvent } from 'react'
import type { HolyCard } from 'pages/types'
import type { Reservation } from 'pages/api/reservations'
export interface HolyCardState {
	selectedDays: [
		{
			startDate: Date
			endDate: Date
			key: string
		}
	]
	disabledDays: Date[]
}

const INITIAL_SELECTED_DAYS = {
	startDate: new Date(),
	endDate: new Date(),
	key: 'selection',
}

export default function HolyCards({
	holyCards,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter()
	const holyCardId = Number(router.query.id)

	const [selectedDays, setselectedDays] = useState<
		HolyCardState['selectedDays']
	>([INITIAL_SELECTED_DAYS])

	const { disabledDays, isLoading, error, mutate } =
		useHolyCardReservations(holyCardId)

	function handleChange(e: ChangeEvent<HTMLSelectElement>) {
		router.push(`/holycards/${e.target.value}`)
	}

	async function performReservation() {
		const newReservation: Reservation = {
			holyCardId,
			startDate: selectedDays[0].startDate,
			endDate: selectedDays[0].endDate,
		}

		const response = await serverReq.post('/reservations', newReservation)

		mutate()
		setselectedDays([INITIAL_SELECTED_DAYS])
	}

	return (
		<>
			<Head>
				<title>Calima HolyCards - Choose your Saint!!!</title>
			</Head>

			<main className="flex flex-col justify-center gap-[6vh] px-[10vw]">
				<nav className="flex flex-col gap-[2vh] items-center">
					<label htmlFor="saints" className="font-bold fs-md">
						Gotta Catch ’Em All!
					</label>
					<select
						id="saints"
						name="saints"
						onChange={handleChange}
						className="border border-gray bg-black px-[2vw] py-[1vh] rounded-md overflow-hidden focus:border-primary block"
					>
						{holyCards.map((element) => (
							<option
								key={element.id}
								value={element.id}
								selected={element.id === holyCardId}
							>
								{element.name}
							</option>
						))}
					</select>
				</nav>

				<section className="self-center flex gap-[6vw] flex-wrap items-center justify-around">
					<Card
						holyCard={
							holyCards.filter((element) => element.id === holyCardId)[0]
						}
					/>

					<article className="border border-gray max-w-lg px-[2vw] py-[2vh] rounded-xl flex flex-col gap-[2vh] items-center text-center">
						<h3 className="fs-md font-bold text-white">Pick your Dates</h3>

						{!isLoading && !error && (
							<DateRange
								onChange={(item: any) => setselectedDays([item.selection])}
								ranges={selectedDays}
								disabledDates={disabledDays}
								minDate={new Date()}
								maxDate={addMonths(3)}
							/>
						)}

						<Button onClick={performReservation}>Make reservation</Button>
					</article>
				</section>
			</main>
		</>
	)
}

HolyCards.getLayout = function getLayout(page: ReactNode) {
	return <Layout>{page}</Layout>
}

export const getServerSideProps = withSessionSsr(async function handler({
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
