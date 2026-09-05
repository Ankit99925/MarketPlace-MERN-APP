FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && adduser -S api -u 1001

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=api:nodejs . .

USER api
EXPOSE 5000
CMD ["node", "app.js"]
