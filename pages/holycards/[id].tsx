import type { ReactNode, ChangeEvent } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

import Image from 'next/image'
import Head from 'next/head'
import Layout from 'components/Layout'

interface HolyCard {
	id: number
	name: string
	description: string
	is_active: boolean
	image: string
}

const API_HOST = process.env.API_HOST

export default function HolyCards({
	holyCards,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter()
	const pathId = Number(router.query.id)

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
								selected={element.id === pathId}
							>
								{element.name}
							</option>
						))}
					</select>
				</nav>

				<article className="self-center border border-gray max-w-lg px-[2vw] py-[2vh] rounded-xl flex flex-col gap-[2vh] items-center text-center">
					<header>
						<h2 className="fs-md font-bold text-white">
							{holyCards[pathId - 1].name}
						</h2>
						<p className="fs-base text-gray">
							{holyCards[pathId - 1].description}
						</p>
					</header>
					<figure className="w-[60vw] max-w-xs">
						<Image
							src={`http://localhost:8000/api/v1/${
								holyCards[pathId - 1].image
							}`}
							alt={holyCards[pathId - 1].name}
							width="450"
							height="780"
							className="object-contain"
						/>
					</figure>
				</article>
			</main>
		</>
	)
}

HolyCards.getLayout = function getLayout(page: ReactNode) {
	return <Layout>{page}</Layout>
}

export async function getServerSideProps() {
	var myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append(
		'Authorization',
		'Bearer 3|9IKZ7qLQCheNRNvL4m4eE78uQPqgT6TcVLxSudlE'
	)

	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
	}

	const res = await fetch(`${API_HOST}/holycards/`, requestOptions).then(
		(response) => response.json()
	)

	const holyCards: HolyCard[] = res.data
	return {
		props: {
			holyCards,
		},
	}
}
