import { useMsal } from '@azure/msal-react'

export default function SignOutButton () {
	const { instance } = useMsal()

	function handleLogout () {
		instance.logoutRedirect({
			postLogoutRedirect: '/',
		})
	}

	return (
		<button onClick={handleLogout}>
			Sign Out
		</button>
	)
}
