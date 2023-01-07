import useSWR from 'swr'

export default function useHCReservations(id: number) {
	const { data, error, isLoading } = useSWR(`/api/reservations/${id}`, fetcher)

	return {
		reservations: data,
		error,
		isLoading,
	}
}

async function fetcher(url: string) {
	const res = await fetch(url)
	const data = await res.json()

	if (res.status !== 200) {
		throw new Error(data.message ?? 'Something went wrong. Please try again.')
	}

	return data.data
}
