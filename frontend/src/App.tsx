import './App.css'
import { ErrorBoundary } from 'react-error-boundary'
import InputField from './components/input'
import React, { useState, useEffect } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import { loginRequest } from './auth-config'
import { callMsGraph } from './graph'
import SSO from './components/sso'
import { useIsAuthenticated } from '@azure/msal-react'

// Handle LDAP username and password submission to auth layer.
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

export default function App() {
	const { instance, accounts } = useMsal()
	const [graphData, setGraphData] = useState(null)
	const isAuthenticated = useIsAuthenticated()

	function requestProfileData() {

		instance.acquireTokenSilent({
			...loginRequest,
			account: accounts[0]
		})
		.then((response) => {
			callMsGraph(response.accessToken)
			.then((response) => {
				setGraphData(response)

				const upn = response.userPrincipalName

				const username = upn.split('@')[0]

				fetch(`http://localhost:5000/?username=${username}`, {
					method: 'get',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				})
			})
			}
		     )
	}


	return (

		<div role='presentation' className='main-container'>

			<ErrorBoundary 
				fallback={<p>Error encountered while submitting the form. Please, contact an administrator</p>}
			>

				<form onSubmit={handleSubmit}>

					<InputField label='username' placeholder='johndoe' />

					<InputField label='password' placeholder='Aa1!-_' />

					<button type='submit'>Log In</button>

				</form>

			</ErrorBoundary>

			<SSO>

					<AuthenticatedTemplate>

						{isAuthenticated && graphData? <h5>Welcome, {graphData.givenName}!</h5> : <button onClick={requestProfileData}>Request Profile Data</button>}
					</AuthenticatedTemplate>

					<UnauthenticatedTemplate>

						<h5>Please sign in to view your profile information.</h5>
					</UnauthenticatedTemplate>

			</SSO>

		</div>

	)

}
