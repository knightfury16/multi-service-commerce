# Multi-Service Commerce

<!-- ![System Diagram](./resource/sd.png) -->

## Overview

This repository contains fully dockerized multi services E-commerce application, orchestrated using Docker Compose. It's a simple E-commerce site using various services connected via Docker containers.

The application architecture includes the following components:

- **PostgreSQL Database**: Containerized PostgreSQL database to store application data.
- **Redis**: Containerized Redis for caching purposes.
- **Nginx**: Containerized Nginx web server acting as a reverse proxy, serving the frontend React app and routing traffic to backend.
- **RabbitMQ**: Containerized RabbitMQ message broker for inter-service communication.
- **Rate Controller Worker Service**: A .NET worker service that calculates the logic for limiting a specific route to a specific user.
- **Node.js Backend**: Node.js backend service responsible for interacting with the database and message broker.
- **React Frontend**: Frontend application built with React.js.

## Prerequisites

To run this application, you need to have Docker and Docker Compose installed on your machine.

## Installation

1. Clone this repository:

```bash
git clone https://github.com/knightfury16/multi-service-commerce
cd multi-service-commerce
```
## Running the App

### If running for the first time, run the migration first
```bash
docker-compose -f .\docker-compose.migrate.yml up --build
```
After running migration, close the containers and start the application.

To start the application, run the following command:

```bash
docker-compose -f .\docker-compose.yml up --build
```

## Access the application:
Open your web browser and navigate to 
```bash
http://localhost:4000
``` 

## To Develop the app
### If for the first time run the migration first
```bash
docker-compose -f .\docker-compose.migrate.yml up --build
```
### Then to develop locally, run the command

```bash
docker-compose -f .\docker-compose.dev.yml up --build
```

This will start the necesarry services, specifically postgres, rabbitMq, redis
and the worker service.

Then run frontend locally

1. `cd ./backend`

2. `npm install`

3. `npm run dev`


To start the Backend

1. `cd ./backend`

2. `npm install`

3. `npx prisma generate`

4. `npm run dev`

Then to access the site go to
```bash
http://localhost:5173
``` 

### To change database name

Change the env variable of node service in the respective compose file

```bash
- PG_DATABASE=new-name
```

and for prisma issue also have to manually also change the name in 
`DATABASE_URL` string in `./backend/.env`


```
DATABASE_URL="postgresql://postgres:admin@postgres-migrate:5432/new-name"
```

Also on related note, if you want to do migration locally change this string,
according to your connection string.

To get a default connection string you can also run `./backend/db/connectionUrl.js` by running 

`node ./backend/db/connectionUrl.js`

It will spit out a string like

```
Database connection string:  postgresql://postgres:admin@localhost:5432/cds_test_office
```


 