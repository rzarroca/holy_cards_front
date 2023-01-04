import type { NextPage } from 'next'
import Image from 'next/image'
import { FormEvent, useState, ChangeEvent } from 'react'

interface AppState {
	form: {
		email: string
		password: string
	}
}

const Index: NextPage = () => {
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
						className="object-cointain"
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
							className="border border-gray rounded-md p-1 text-white fs-base bg-black"
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
							className="border border-gray rounded-md p-1 text-white fs-base bg-black"
						/>
					</label>

					<button className="uppercase bg-primary rounded-md px-6 py-1 self-center fs-base">
						Login
					</button>
				</form>
			</main>
		</>
	)
}

export default Index
