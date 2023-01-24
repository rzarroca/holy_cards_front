import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { serverReq } from 'lib/requests'
import useHolyCardReservations from 'hooks/useHolyCardReservations'
import { AxiosError } from 'axios'
import type { Reservation } from 'pages/api/reservations'
import type { ChangeEvent } from 'react'
import { HolyCardsState, INITIAL_SELECTED_DAYS } from 'pages/holycards/[id]'

export function useHook() {
	const router = useRouter()
	const holyCardId = Number(router.query.id)

	const [selectedDays, setselectedDays] = useState<
		HolyCardsState['selectedDays']
	>([INITIAL_SELECTED_DAYS])
	const [msg, setMsg] = useState<HolyCardsState['message']>('')

	const { disabledDays, isLoading, error, mutate } =
		useHolyCardReservations(holyCardId)

	function handlePageChange(e: ChangeEvent<HTMLSelectElement>) {
		router.push(`/holycards/${e.target.value}`)
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setMsg('')
		}, 3000)
		return () => clearTimeout(timer)
	}, [msg])

	async function performReservation() {
		const newReservation: Reservation = {
			holyCardId,
			startDate: selectedDays[0].startDate,
			endDate: selectedDays[0].endDate,
		}
		try {
			await serverReq.post('/reservations', newReservation)
			mutate()
			setselectedDays([INITIAL_SELECTED_DAYS])
			setMsg('Your reservation was saved')
		} catch (error) {
			console.log(error)

			if (error instanceof AxiosError && error.response?.status === 409) {
				setMsg('There is a conflict on your selected days')
			} else {
				setMsg('Error saving your reservation, please try again later')
			}
		}
	}

	return {
		handlePageChange,
		holyCardId,
		isLoading,
		error,
		setselectedDays,
		selectedDays,
		disabledDays,
		msg,
		performReservation,
	}
}
