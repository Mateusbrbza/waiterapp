FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Expose port
EXPOSE 8080

# For development, we don't build - we run dev directly
# The build step will be handled by the dev server
CMD ["yarn", "dev"]
