import { ReactElement } from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import SignInButton from './signin-button'
import SignOutButton from './signout-button'

interface SSOProps {
	children:  Array<ReactElement>
}

export default function SSO ({ children }: SSOProps) {

	const isAuthenticated = useIsAuthenticated()

	return (
		<div role='presentation' className='sso-container'>
			<div role='presentation'>
				{isAuthenticated ? <SignOutButton /> : <SignInButton />}
			</div>

			{children}
		</div>
	)
}
