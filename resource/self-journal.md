#

## Challenges Faced
### bcrypt
### Prisma
Prisma is weird. In order to use it I have to generate the type first by running 

```bash
npx prisma generate
```
which lives in node_modules. So to use the app I have to generate the types first. This was troublesome in docker.

Coz in order to generate the types i need a connection url. So had to construct connection url based on environment it was running in. Example in docker or localhost.

```js
require('dotenv').config();

const username = process.env.PG_USER || process.env.DEAFULT_DB_USER;
const password = process.env.PG_PASSWORD || process.env.DEAFULT_DB_PASSWORD;
const databaseName = process.env.PG_DATABASE || process.env.DEAFULT_DB_DATABASE;
const port = process.env.PG_PORT || process.env.DEAFULT_DB_PORT;
const host = process.env.PG_HOST !== undefined ? process.env.PG_HOST : process.env.DEAFULT_DB_HOST; // Optional check for Docker environment (if applicable)

const connectionUrl = `postgresql://${username}:${password}@${host}:${port}/${databaseName}`;

console.log("Database connection string: ",connectionUrl);

exports.connectionUrl = connectionUrl;

```

Then also depending on environment the genereated types were different so had to configure that also using `binaryTargets`

```
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
}

```


But generating only type was not enough. Coz everytime I was starting the app for the very first time, I have to run the migration also. And running migrations requires a DATABASE_URL.

```js
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") 
}
```

And this url had to be specifically provided in the .env file. Tried to inject it through docker environment variable. Did  not work.

Tried to construct it dynamically, did not work.

```js
//utils/databaseUrlSetter.js

const { connectionUrl } = require('../db/connectionUrl');

require('dotenv').config();

process.env.DATABASE_URL = connectionUrl;
```

During migration it specifically read the string from `.env` file

```bash
DATABASE_URL="postgresql://postgres:admin@postgres-migrate:5432/cds_test_office" 
```

So for now, have to do it manually.

### Dockerizing Migration

#### Decision on how to do the migration
So how to run the migration?

Tried to do it during the build of the application. That created a lot of dependency issues and also it was inefficient.

So then decided on writing separate docker file for migration.
So at the start of application I run the migration once,
which apply the migration and additionally seed the database with some random data.And dont have to think about it again.

#### How to run the migration

Then again the problem was in order to execute the command 

`npx prisma migrate`

I needed the database up and running. But docker was on his own. It failed during the build stage. So had to write a script that wait for database service to start

```bash
#!/bin/sh
# wait-for-postgres.sh

set -e

host="$1"
user="$2"
shift
shift
cmd="$@"

until PGPASSWORD=$PG_PASSWORD psql -h "$host" -U "$user" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping $host $user $PG_PASSWORD"

  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd
```

It was also not enough. I also have to have some additonal program installed in the docker container specifically, `psql-client` to run the script properly.

```bash
RUN chmod +x ./prisma/wait-for-postgres.sh

RUN npx prisma generate
RUN apt update
RUN apt --assume-yes install postgresql-client

# Git will replace the LF line-endings with CRLF, causing issues while executing the wait-for-postgres shell script
# Install dos2unix and replace CRLF (\r\n) newlines with LF (\n)
RUN apt --assume-yes install dos2unix
RUN dos2unix ./prisma/wait-for-postgres.sh

CMD sh ./prisma/wait-for-postgres.sh ${PG_HOST} ${PG_USER} npx prisma migrate deploy && node ./utils/dataSeeder.js
```

#### Migration Database volume issue

Initially this migration compose file was in `./backend` folder. So when I ran the migration it created a volume `backend-pg-volume` and ran the migration there.

So when i started application which was in the root, it failed to access the database coz it was using its own litte volume `pg-volume`

So to solve this issue I moved back migration compsoe file to the root of project. Now both the application and migration used the same volume and data persisted.

