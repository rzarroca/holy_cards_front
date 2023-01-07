import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import { useState, useEffect } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import type { ReactNode, ChangeEvent } from 'react'
import type { HolyCard } from 'pages/types'
import { addMonths, parseCalendarDate, getListOfDates } from 'utils/dateUtils'

import Head from 'next/head'
import Layout from 'components/Layout'
import Card from 'components/HolyCard'
import { Calendar, Day, DayRange } from 'react-modern-calendar-datepicker'

// TODO: extract button to component
export default function HolyCards({
	holyCards,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter()
	const pathId = Number(router.query.id)

	const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
		from: null,
		to: null,
	})
	const [disabledDays, setDisabledDays] = useState([])

	useEffect(() => {
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

		fetch(
			`http://localhost:8000/api/v1/holycards/${pathId}/reservations`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				const listOfReservedDays: any = []
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

				setDisabledDays(listOfReservedDays)
			})
	}, [pathId])

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

						<Calendar
							value={selectedDayRange}
							onChange={setSelectedDayRange}
							minimumDate={parseCalendarDate(new Date())}
							maximumDate={parseCalendarDate(addMonths(3))}
							disabledDays={disabledDays}
							colorPrimary="#fbbf24"
							colorPrimaryLight="#f59e0b"
							shouldHighlightWeekends
						/>

						<button className="uppercase bg-primary rounded-md px-6 py-1 self-center fs-base text-black">
							Make reservation
						</button>
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
