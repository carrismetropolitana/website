
# # # # # # # # #

FROM node:18-alpine AS base

# # # # # # # # #


# PHASE 1
# Install dependencies only when needed.

FROM base AS dependencies

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci


# # # # # # # # #


# PHASE 2
# Rebuild the source code only when needed.

FROM base AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build


# # # # # # # # #


# PHASE 3
# Setup the final Docker image with only the required files.

FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir -p ./exports
RUN chown -R nextjs:nodejs ./exports
RUN chmod -R 755 ./exports

USER nextjs

EXPOSE 3000
ENV PORT 3000

RUN ls

CMD ["node", "server.js"]