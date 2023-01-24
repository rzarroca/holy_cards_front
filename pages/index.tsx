import { FormEvent, useState, ChangeEvent } from 'react'
import { AxiosError } from 'axios'
import { serverReq } from 'lib/requests'
import Button from 'components/Button'
import Image from 'next/image'
import type { NextPage } from 'next'
import useUser from 'hooks/useUser'
export interface AppState {
	form: {
		email: string
		password: string
	}
	errorMsg: string
}

const Index: NextPage = () => {
	const [errorMsg, setErrorMsg] = useState<AppState['errorMsg']>('')
	const [form, setform] = useState<AppState['form']>({
		email: '',
		password: '',
	})

	const { mutateUser } = useUser({
		redirectTo: '/home',
		redirectIfFound: true,
	})

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setform({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
			const response = await serverReq.post('/auth/login', {
				email: form.email,
				password: form.password,
			})

			mutateUser(response.data)
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 422) {
				setErrorMsg('Error on credentials, check email or password')
			} else {
				setErrorMsg('Error on login, please try again')
			}
		}
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
					onSubmit={handleSubmit}
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
							minLength={8}
							maxLength={50}
							required
							className="border border-gray rounded-md p-1 fs-base bg-black"
							autoComplete="current-password"
						/>
					</label>

					<p className="text-secondary fs-sm text-center">{errorMsg}</p>
					<Button>Login</Button>
				</form>
			</main>
		</>
	)
}

export default Index
