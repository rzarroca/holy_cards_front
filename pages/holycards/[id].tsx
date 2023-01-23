import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import { useState } from 'react'
import { InferGetServerSidePropsType} from 'next'
import { useRouter } from 'next/router'

import type { ReactNode, ChangeEvent } from 'react'
import type { HolyCard } from 'pages/types'

import { addMonths, parseCalendarDate } from 'utils/dateUtils'

import Head from 'next/head'
import Layout from 'components/Layout'
import Card from 'components/HolyCard'
import Button from 'components/Button'
import { Calendar, DayRange, Day } from 'react-modern-calendar-datepicker'
import { withSessionSsr } from 'lib/sessions'
import { apiReq } from 'lib/requests'
import useHolyCardReservations from 'hooks/useHolyCardReservations'
export interface HolyCardState {
	selectedDayRange: DayRange
	disabledDays: Day[]
}
export default function HolyCards({
	holyCards,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {	
	const router = useRouter()
	const holyCardId = Number(router.query.id)

	const [selectedDayRange, setSelectedDayRange] = useState<
	HolyCardState['selectedDayRange']
	>({
		from: null,
		to: null,
	})

	const {disabledDays, isLoading, error} = useHolyCardReservations(holyCardId)	
	console.log({disabledDays, isLoading, error});
		

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
								selected={element.id === holyCardId}
							>
								{element.name}
							</option>
						))}
					</select>
				</nav>

				<section className="self-center flex gap-[6vw] flex-wrap items-center justify-around">
					<Card
						holyCard={holyCards.filter((element) => element.id === holyCardId)[0]}
					/>

					<article className="border border-gray max-w-lg px-[2vw] py-[2vh] rounded-xl flex flex-col gap-[2vh] items-center text-center">
						<h3 className="fs-md font-bold text-white">Pick your Dates</h3>

 					{!isLoading && !error && <Calendar
							value={selectedDayRange}
							onChange={setSelectedDayRange}
							minimumDate={parseCalendarDate(new Date())}
							maximumDate={parseCalendarDate(addMonths(3))}
							disabledDays={disabledDays}
							colorPrimary="#fbbf24"
							colorPrimaryLight="#f59e0b"
							shouldHighlightWeekends
						/>}
						

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

export const getServerSideProps = withSessionSsr(async function handler({req , res}) {

	const sessionUser = req.session.user;
	
  if (sessionUser === undefined || !sessionUser.isLoggedIn) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        holyCards: []
      },
    };
	}
	
	const config = {
    headers: { Authorization: `Bearer ${sessionUser.token}` }
};
	const response = await apiReq.get('/holycards', config)
	const holyCards = response.data.data as HolyCard[]
	
	return {
		props: {
			holyCards,
		},
	}
})