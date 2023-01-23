import { serverReq } from 'lib/requests'
import useSWR from 'swr'
import { Day } from 'react-modern-calendar-datepicker'
import { HolyCardState } from 'pages/holycards/[id]'

export default function useHolyCardReservations(holyCardId: number) {

  const {data, isLoading, error} =
		useSWR<HolyCardState['disabledDays']>(`/holycard-reservations/${holyCardId}`, fetcher)

	async function fetcher() {
		const response = await serverReq(`/holycard-reservations/${holyCardId}`)		
		return response.data.data as Day[]
		}

    return{ disabledDays: data, isLoading, error}
}