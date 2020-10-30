FROM node:lts

ENV NODE_ENV "production"

# Create app directory
WORKDIR /usr/src/app

# Yarn configurations
COPY .yarnrc ./

# Yarn cache and releases
COPY .yarn .yarn/

# App dependencies configurations
COPY package.json yarn.lock ./

# Check yarn configurations and cache
RUN yarn --frozen-lockfile --check-files

# Bundle app source
COPY . .

# Startup checks and graceful shutdown of Node.js services running in Kubernetes.
EXPOSE 9000

# Start the app
CMD yarn start
