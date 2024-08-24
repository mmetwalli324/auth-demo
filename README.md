# Steps to run:

1. Create and edit .env in `/auth`:

```
LDAP_URL=
BASEDN=
DOMAIN=
```

2. Create and edit .env in '/frontend':

```
VITE_CLEINT_ID=
VITE_AUTHORITY=
```

3. Run the following commands:

In `/backend`:

```
py -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
flask --app server.py run
```

In `/auth` and `/frontend`:

```
npm install
npm run dev
```

Backend listens to port 5000, auth to 3000, and frontend to 5173
