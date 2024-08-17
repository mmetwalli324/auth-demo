import './App.css'
import { ErrorBoundary } from 'react-error-boundary'
import InputField from './components/input'
import React from 'react'

export default function App() {

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

		event.preventDefault()

		const formElements = event.currentTarget.elements

		const userCredentials = {
			username: formElements.username.value,
			password: formElements.password.value,
		}

		fetch('http://localhost:3000/', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userCredentials)
		})

	}

	return (
		<ErrorBoundary 
			fallback={<p>Error encountered while submitting the form. Please, contact an administrator</p>}
		>
			<form onSubmit={handleSubmit}>

				<InputField label='username' placeholder='johndoe' />

				<InputField label='password' placeholder='Aa1!-_' />

				<button type='submit'>Log In</button>

			</form>

		</ErrorBoundary>
	)
}
