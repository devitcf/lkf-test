# LKF Test
A restaurant order system for demo.

## Prerequisite
1. Fill in or change the env files in directory:

```
docker/env/postgres/local.env
docker/env/ros_backend/local.env
docker/env/ros_frontend/local.env
```
2. Install [Docker](https://docs.docker.com/get-docker/) if you do not have it already.

## Available Scripts
In the project directory, you can run:

### `npm run compose:up`
Runs the system in production mode using docker.
You can view it in the browser with the url [http://localhost:3000](http://localhost:3000)

### `npm run compose:down`
Shut down everything.
