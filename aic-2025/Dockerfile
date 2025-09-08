# syntax=docker/dockerfile:1.7

# 1) Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install OS deps (optional but useful for sharp/next/image etc.)
RUN apk add --no-cache libc6-compat

# Copy root package manager files if monorepo is used (not needed here)

# Copy app source
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# 2) Runtime stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

CMD ["node", "server.js"]


