# ROS backend

## Description
The backend server for a restaurant ordering platform using [Nest.js](https://github.com/nestjs/nest) framework with Typescript.

## Prerequisites
Copy the file `.env.example`  and rename it as `.env`, and fill in the required configurations.

## Running the app
```bash
# Install necessary and perform migration and seeding
npm i
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
```

```bash
# Build and start the server
npm run build
npm run start:prod
```
