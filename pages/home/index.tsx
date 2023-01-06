import type { NextPageWithLayout } from 'pages/_app'
import type { ReactNode } from 'react'

import Head from 'next/head'
import Layout from 'components/Layout'
import Link from 'components/Link'

const Home: NextPageWithLayout = () => {
	return (
		<>
			<Head>
				<title>Calima HolyCards - Home</title>
			</Head>
			<main className="h-[80vh] flex flex-col justify-center gap-[4vh]">
				<header>
					<h1 className="text-center fs-xl">Menu</h1>
				</header>

				<nav className="flex flex-col gap-[4vh] items-center">
					<Link href={'/holycards/1'}>HolyCards</Link>
					<Link href={'/user/calendar'}>My Calendar</Link>
				</nav>
			</main>
		</>
	)
}

Home.getLayout = function getLayout(page: ReactNode) {
	return <Layout>{page}</Layout>
}

export default Home
