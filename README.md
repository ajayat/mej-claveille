## Caveille Math En Jeans

First set the environment variables:

````environment
NODE_ENV ( development or production )
PORT ( optional default 3000 )

DATABASE_URL ( exemple : mysql://user:pass@host/dbname )
DATABASE_DIALECT ( exemple : mysql )

MAIL_HOST ( mail host like smtp.gmail.com )
MAIL_PORT ( smtp port like 25, 587 )
MAIL_USER ( smtp login )
MAIL_PASSWORD= ( smtp pasword )
MAIL_FROM = ( mail from header )

JWT_KEY ( jsonwebtoken key )
JWT_TIME ( jsonwebtoken time )

SITE_URL ( url of the site  )
SITE_NAME ( name of the site )
FULL_ADMIN ( email of the admin in json exemple ["user@domain.com"] )

MAX_QUERY_LIMIT ( article request limit default 30 )
````

Update the option in ````/api/config````  for your database and your smtp server.

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```


## Deploy

Set environment to:
````environment
NODE_ENV=production
````

With docker:
```bash
docker-compose up -d
```

Or:

```bash
npm run build
npm run export 
npm start
```
