## Claveille - Math En Jeans

First set the environment variables:

```sh
NODE_ENV=development / production
PORT=3000 # optional

DATABASE_URL="mysql://user:pass@host/dbname"
DATABASE_DIALECT=mysql

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=<user>
MAIL_PASSWORD=<password>
MAIL_FROM="user@example.com"

JWT_KEY=<jsonwebtoken key>
JWT_TIME=<jsonwebtoken time>

SITE_URL=<url of the site>
SITE_NAME="Math En Jeans Claveille"
FULL_ADMIN=["user@domain.com"]

MAX_QUERY_LIMIT=30 # article request limit
```

Update the option in ```/api/config```  for your database and your smtp server.

Install dependencies:

```npm
npm install
```

Run the development server:

```npm
npm run dev
```


## Deployment

Set environment to:
```sh
NODE_ENV=production
```

With docker:
```docker
docker-compose up -d
```

Or:

```npm
npm run build
npm run export 
npm start
```
