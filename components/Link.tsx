import { URL } from 'node:url'
import { ReactNode } from 'react'
import { default as NextLink } from 'next/link'

interface LinkProps {
	href: URL | string
	children: ReactNode
}

const Link = ({ href, children = null }: LinkProps) => {
	return (
		<NextLink
			href={href}
			className="border border-gray p-[3vw] rounded-xl hover:bg-slate-900 font-bold fs-md"
		>
			{children}
		</NextLink>
	)
}

export default Link
