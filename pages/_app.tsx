import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { DefaultHead } from 'components/DefaultHead'
import { NextPage } from 'next/types'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page: ReactNode) => page)

	return getLayout(
		<>
			<DefaultHead />
			<Component {...pageProps} />
		</>
	)
}
