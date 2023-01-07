import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState, ChangeEvent } from 'react'

import Image from 'next/image'
import Button from 'components/Button'
interface AppState {
	form: {
		email: string
		password: string
	}
}

const Index: NextPage = () => {
	const router = useRouter()

	//TODO add validation
	const [form, setform] = useState<AppState['form']>({
		email: '',
		password: '',
	})

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setform({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	function submitForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		router.push('/home')
	}
	return (
		<>
			<header className="flex flex-col gap-[5vh] items-center p-[8vh]  text-white">
				<figure className="w-[60vw] max-w-md">
					<Image
						src="/calima_logo.png"
						alt="calima logo"
						width="622"
						height="124"
						className="object-contain"
					/>
				</figure>
				<h1 className="fs-xl">HolyCards</h1>
				<h2 className="fs-lg">Reservation App</h2>
			</header>

			<main className="flex flex-col items-center">
				<form
					onSubmit={submitForm}
					className="flex flex-col gap-[2vh] w-[75vw] max-w-xl"
				>
					<label htmlFor="email" className="flex flex-col gap-[1vh]">
						<p className="text-gray fs-sm">Email</p>
						<input
							type="email"
							id="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							pattern=".*@calimasolutions.com"
							placeholder="mrduck@calimasolutions.com"
							required
							className="border border-gray rounded-md p-1 fs-base bg-black"
						/>
					</label>

					<label htmlFor="password" className="flex flex-col gap-[1vh]">
						<p className="text-gray fs-sm">Password</p>
						<input
							type="password"
							id="password"
							name="password"
							value={form.password}
							onChange={handleChange}
							min={8}
							max={50}
							required
							className="border border-gray rounded-md p-1 fs-base bg-black"
						/>
					</label>

					<Button>Login</Button>
				</form>
			</main>
		</>
	)
}

export default Index
