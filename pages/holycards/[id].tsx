import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import { useState } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

import type { ReactNode, ChangeEvent } from 'react'
import type { HolyCard } from 'pages/types'

import { addMonths, parseCalendarDate } from 'utils/dateUtils'
import useHCReservations from 'hooks/useHCReservations'

import Head from 'next/head'
import Layout from 'components/Layout'
import Card from 'components/HolyCard'
import Button from 'components/Button'
import { Calendar, DayRange, Day } from 'react-modern-calendar-datepicker'

export interface State {
	selectedDayRange: DayRange
	disabledDays: Day[]
}
export default function HolyCards({
	holyCards,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter()
	const pathId = Number(router.query.id)

	const [selectedDayRange, setSelectedDayRange] = useState<
		State['selectedDayRange']
	>({
		from: null,
		to: null,
	})

	const { reservations, error, isLoading } = useHCReservations(pathId)

	function handleChange(e: ChangeEvent<HTMLSelectElement>) {
		router.push(`/holycards/${e.target.value}`)
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
								selected={element.id === pathId}
							>
								{element.name}
							</option>
						))}
					</select>
				</nav>

				<section className="self-center flex gap-[6vw] flex-wrap items-center justify-around">
					<Card
						holyCard={holyCards.filter((element) => element.id === pathId)[0]}
					/>

					<article className="border border-gray max-w-lg px-[2vw] py-[2vh] rounded-xl flex flex-col gap-[2vh] items-center text-center">
						<h3 className="fs-md font-bold text-white">Pick your Dates</h3>

						{error && (
							<p>{error?.message ?? 'Error on calendar. Please try again.'}</p>
						)}
						{isLoading && <p>Loading calendar...</p>}
						{reservations && (
							<Calendar
								value={selectedDayRange}
								onChange={setSelectedDayRange}
								minimumDate={parseCalendarDate(new Date())}
								maximumDate={parseCalendarDate(addMonths(3))}
								disabledDays={reservations ?? []}
								colorPrimary="#fbbf24"
								colorPrimaryLight="#f59e0b"
								shouldHighlightWeekends
							/>
						)}

						<Button>Make reservation</Button>
					</article>
				</section>
			</main>
		</>
	)
}

HolyCards.getLayout = function getLayout(page: ReactNode) {
	return <Layout>{page}</Layout>
}

export async function getServerSideProps() {
	const API_HOST = process.env.API_HOST

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

	const res = await fetch(`${API_HOST}/holycards/`, requestOptions).then(
		(response) => response.json()
	)

	const holyCards: Array<HolyCard> = res.data
	return {
		props: {
			holyCards,
		},
	}
}
