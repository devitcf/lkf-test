# syntax=docker/dockerfile:1.4
FROM node:22-slim AS base

# Install dependencies only when needed
FROM base AS deps

WORKDIR /app
COPY --link package*.json ./

RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

COPY --from=deps --link /app/node_modules ./node_modules
COPY --link . .

RUN npm run build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=deps --link /app/node_modules ./node_modules
COPY --from=builder --link /app/.next ./.next

COPY --link .env* ./
COPY --link next.config.js ./
COPY --link package.json ./

EXPOSE 3000

CMD ["npm", "run", "start"]
