# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --production

# Copy rest of the app
COPY . .

# Build Next.js app
RUN npm run build

# Expose port (default Next.js port)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
