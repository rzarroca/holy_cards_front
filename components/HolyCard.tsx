import { HolyCard as HCard } from 'pages/types'
import Image from 'next/image'

interface Props {
	holyCard: HCard
}

export default function HolyCard({ holyCard }: Props) {
	return (
		<article className="self-center border border-gray max-w-lg px-[2vw] py-[2vh] rounded-xl flex flex-col gap-[2vh] items-center text-center">
			<header>
				<h2 className="fs-md font-bold text-white">{holyCard.name}</h2>
				<p className="fs-base text-gray">{holyCard.description}</p>
			</header>
			<figure className="w-[60vw] max-w-xs">
				<Image
					src={`http://localhost:8000/api/v1/${holyCard.image}`}
					alt={holyCard.name}
					width="450"
					height="780"
					className="object-contain"
				/>
			</figure>
		</article>
	)
}
