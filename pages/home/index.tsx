import type { NextPageWithLayout } from 'pages/_app'
import type { ReactNode } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/Layout'

const Home: NextPageWithLayout = () => {
	return (
		<>
			<Head>
				<title>Calima Holy Card - Home</title>
			</Head>
			<main className="h-[80vh] flex flex-col justify-center gap-[4vh]">
				<header>
					<h1 className="text-center fs-xl">Menu</h1>
				</header>

				<nav className="flex flex-col gap-[4vh] items-center">
					<Link
						href={'/holycards'}
						className="text-primary fs-lg underline hover:text-secondary"
					>
						HolyCards
					</Link>
					<Link
						href={'/user/calendar'}
						className="text-primary fs-lg underline hover:text-secondary"
					>
						My Calendar
					</Link>
				</nav>
			</main>
		</>
	)
}

Home.getLayout = function getLayout(page: ReactNode) {
	return <Layout>{page}</Layout>
}

export default Home
