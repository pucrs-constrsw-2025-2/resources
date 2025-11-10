# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./
# Copy lockfile if it exists, otherwise it will be generated
COPY package-lock.json* ./

# Try to install. If lockfile is out of sync, update it and install again
RUN npm install --legacy-peer-deps --no-audit --no-fund || \
    (npm install --package-lock-only --legacy-peer-deps --no-audit --no-fund && npm install --legacy-peer-deps --no-audit --no-fund)

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files
COPY package.json ./
COPY package-lock.json* ./

# Try to install production dependencies. If lockfile is out of sync, update it and install again
RUN npm install --omit=dev --legacy-peer-deps --no-audit --no-fund || \
    (npm install --package-lock-only --omit=dev --legacy-peer-deps --no-audit --no-fund && npm install --omit=dev --legacy-peer-deps --no-audit --no-fund)

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy .env file from root (will be available during build)
# Note: In docker-compose, environment variables are passed directly

# Expose the port
EXPOSE 8080

# Start the application
CMD ["node", "dist/main.js"]
