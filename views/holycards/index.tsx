import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import Head from 'next/head'
import Card from 'components/HolyCard'
import Button from 'components/Button'
import { DateRange } from 'react-date-range'
import { addMonths } from 'utils/dateUtils'
import { HolyCardsProps } from 'pages/holycards/[id]'
import { useHook } from './useHook'

export function HolyCards({ holyCards }: HolyCardsProps) {
	const {
		handlePageChange,
		setselectedDays,
		performReservation,
		holyCardId,
		isLoading,
		error,
		selectedDays,
		disabledDays,
		msg,
	} = useHook()

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
						onChange={handlePageChange}
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
						<p className="text-secondary fs-sm text-center">{msg}</p>
					</article>
				</section>
			</main>
		</>
	)
}
