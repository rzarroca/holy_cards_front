import { serverReq } from 'lib/requests'
import useSWR from 'swr'
import { HolyCardState } from 'pages/holycards/[id]'

export default function useHolyCardReservations(holyCardId: number) {
	const { data, isLoading, error, mutate } = useSWR<
		HolyCardState['disabledDays']
	>(`/holycard-reservations/${holyCardId}`, fetcher)

	async function fetcher() {
		const response = await serverReq(`/holycard-reservations/${holyCardId}`)
		return response.data.data.map((day: any) => new Date(day)) as Date[]
	}

	return { disabledDays: data, isLoading, error, mutate }
}
