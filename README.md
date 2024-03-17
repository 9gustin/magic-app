## Magic app 🔮

### Requisites
- Install Node v18
- Install postgresql
If you have docker can create a container with the following command
```BASH
docker run --name magic-db -e POSTGRES_USER=magic -e POSTGRES_PASSWORD=magic -e POSTGRES_DB=magic-db -p 5432:5432 -d postgres
```
And here are you DATABASE_URL `postgresql://magic:magic@localhost:5432/magic-db`
- Install nodemailer
- Create an account on [Resend](https://resend.com/) and get an API key
- Create an account on [Uploadthing](https://uploadthing.com/) and get your credentials

### Getting started

```BASH
git clone git@github.com:9gustin/magic-app.git
```

```BASH
cd magic-app && vi .env.local
```

Add your credentials
```ENV
WEBAPP_URL=http://localhost:3000
DATABASE_URL=postgresql://DB_USER:DB_PASSWORD@localhost:5432/DB_NAME
RESEND_API_KEY=
NODEMAILER_LOCAL_USER=
NODEMAILER_LOCAL_PASS=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```
and then run
```BASH
npm install && npm run db:migrate
```

And its ready to go ;)
```BASH
npm run dev
```

### Features
 - Signup 
 - Login
 - Forgot password (email with resend)
 - User email verification (email with resend)
 - Public profile (username, name, bio, avatar and cover image)
 - Edit user info
 - 
