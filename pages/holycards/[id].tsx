import Layout from 'components/Layout'
import { getHolyCardsProps } from 'ssr/holycards'
import { HolyCards } from 'views/holycards'
import type { HolyCard } from 'pages/types'
import type { ReactNode } from 'react'
export interface HolyCardsState {
	selectedDays: [
		{
			startDate: Date
			endDate: Date
			key: string
		}
	]
	disabledDays: Date[]
	message: string
}

export interface HolyCardsProps {
	holyCards: HolyCard[]
}

export const INITIAL_SELECTED_DAYS = {
	startDate: new Date(),
	endDate: new Date(),
	key: 'selected_days',
}

export default HolyCards

HolyCards.getLayout = function getLayout(page: ReactNode) {
	return <Layout>{page}</Layout>
}

export const getServerSideProps = getHolyCardsProps
