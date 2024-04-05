# Overengineered FibCalculator

![System Diagram](./resource/sd.png)

## Overview

This repository contains an overengineered Fibonacci Calculator application, orchestrated using Docker Compose. It's designed to calculate Fibonacci numbers through various microservices connected via Docker containers.

The application architecture includes the following components:

- **PostgreSQL Database**: Containerized PostgreSQL database to store application data.
- **Redis**: Containerized Redis for caching purposes.
- **Nginx**: Containerized Nginx web server acting as a reverse proxy, serving the frontend React app.
- **RabbitMQ**: Containerized RabbitMQ message broker for inter-service communication.
- **Worker Service**: A .NET worker service that calculates Fibonacci numbers asynchronously.
- **Node.js Backend**: Node.js backend service responsible for interacting with the database and message broker.
- **React Frontend**: Frontend application built with React.js.

## Prerequisites

To run this application, you need to have Docker and Docker Compose installed on your machine.

## Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/overengineered-FibCalculator.git
cd overengineered-FibCalculator
```
## Running the App

To start the application, follow these steps:

1. Open a terminal.
2. Navigate to the root directory of the project.
3. Run the following command:

```bash
docker-compose up
