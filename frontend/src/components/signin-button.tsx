import React from 'react'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../auth-config'

export default function SignInButton() {
	const { instance } = useMsal();

	function handleLogin() {
		instance.loginRedirect(loginRequest)
		.catch(error => {
			console.log(error)
		})
	}

	return (
		<button onClick={handleLogin}>
			SAML Sign In
		</button>
	)
}
