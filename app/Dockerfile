# app/Dockerfile

# STAGE 1: Build Stage - Install dependencies
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production

# STAGE 2: Production Stage - Create the final lean image
FROM node:20-alpine
WORKDIR /app

# Copy installed dependencies and source code
COPY --from=builder /app/node_modules ./node_modules
COPY server.js .

# IMPORTANT: Port 8080 must match the PORT in server.js
EXPOSE 8080

CMD [ "npm", "start" ]