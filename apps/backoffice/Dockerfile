# # #
# STAGE 1

# Setup a stage to install the necessary packages
# and build the project using the turbo monorepo tool.

FROM node:lts-alpine AS base

# Set the project slug to be used
# as the directory source for the build files.

ENV PROJECT=backoffice

ARG ENVIRONMENT

ENV ENVIRONMENT=${ENVIRONMENT}
ENV NEXT_PUBLIC_ENVIRONMENT=${ENVIRONMENT}



# # #
# STAGE 2

FROM base AS pruner

WORKDIR /app

# Install the necessary linux packages for this stage
# as well as the turbo monorepo tool globally.
# Set the environment variable to production.

RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo@^2

# Make the full repository available to the build step.
# Use the turbo prune command to extract only the unnecessary
# files from the current project and its dependencies.

COPY package.json ./

COPY . .

RUN turbo prune --scope=@carrismetropolitana/website-${PROJECT} --docker



# # #
# STAGE 3

FROM base AS builder

WORKDIR /app

# Install the necessary linux packages for this stage
# as well as the turbo monorepo tool globally.
# Set the environment variable to production.

RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo@^2

# Copy the pruned json declarations to the out directory
# and install the necessary packages with npm.

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json

RUN npm ci

# Copy the pruned project files to the out directory,
# bump the package version to the current date and
# actually build the project using the turbo monorepo tool.

COPY --from=pruner /app/out/full/ .

RUN npx @tmlmobilidade/repo-version --output=/app/apps/${PROJECT}/package.json

RUN turbo run build --filter=@carrismetropolitana/website-${PROJECT}



# # #
# STAGE 4

FROM base AS runner

WORKDIR /app

# Create the nodejs and nextjs group and user
# for the application to run under.

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

# Copy the necessary files from the builder stage
# to the final image. This includes the node_modules
# directory, the public directory, the standalone
# server, and the static files.

# COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT}/public ./apps/${PROJECT}/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT}/.next/static ./apps/${PROJECT}/.next/static

ENV NODE_ENV=production

CMD node /app/apps/${PROJECT}/server.js
