require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const ActiveDirectory = require('activedirectory')

app.use(cors())
app.use(bodyParser.json())

app.post('/', (req, res) => {

	//
	// Authenticate AD user.
	// Runs only when path receives a post request.
	//

	// Create configuration object.
	const config = {
		url: process.env.LDAP_URL,
		baseDN: process.env.BASEDN
	}

	// Pass configuration object to get a callable Active Directory instance.
	const ad = new ActiveDirectory(config);

	// Call authenticate with user credentials and a callback function.
	ad.authenticate(`${req.body.username}@${process.env.DOMAIN}`, req.body.password, function(err, auth) {
		if (err) { 
			console.log('ERROR: '+JSON.stringify(err));
			return
		}

		// Send request to backend ONLY if user is successfully authenticated.

		if (auth) {

			console.log(`${req.body.username} authenticated. Fetching data from backend...`);

			fetch(`http://localhost:5000/?username=${req.body.username}`, {
				method: 'get',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			})

			return
		}
	})
})

app.listen(port, () => {
	console.log(`Auth listening on port ${port}`)
})
