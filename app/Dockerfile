# STAGE 1: Build Stage - Install dependencies
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY server.js .   # ✅ Copy your app code into build stage

# STAGE 2: Production Stage - Create the final lean image
FROM node:20-alpine
WORKDIR /app

# Copy installed dependencies and app code
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./   # ✅ Fix: include package.json
COPY --from=builder /app/server.js ./       # ✅ Fix: include server.js

# IMPORTANT: Port 8080 must match the PORT in server.js
EXPOSE 8080

# Run the app
CMD [ "npm", "start" ]
