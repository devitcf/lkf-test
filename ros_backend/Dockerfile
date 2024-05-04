# syntax=docker/dockerfile:1.4
FROM node:22-slim AS base

RUN apt-get update -y && \
    apt-get install -y openssl

# Install dependencies only when needed
FROM base AS deps

WORKDIR /app

COPY --link package*.json ./

RUN npm ci

# Build the source code only when needed
FROM base AS builder

WORKDIR /app

COPY --from=deps --link /app/node_modules ./node_modules
COPY --link . .

RUN npx prisma generate
RUN npm run build

# remove devdependencies for reducing final node_modules size
ENV NODE_ENV=production
RUN npm ci

FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

EXPOSE 8000

CMD [ "npm", "run", "start:prod" ]
