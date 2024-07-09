# Base stage
FROM node:18-alpine AS base
WORKDIR /app

# Dependency stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json ./
COPY package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "package-lock.json not found." && exit 1; \
  fi

# Builder stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Runner stage
FROM base AS runner

ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set the correct permission for Next.js cache
RUN chown -R nextjs:nodejs ./.next

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
# Base stage