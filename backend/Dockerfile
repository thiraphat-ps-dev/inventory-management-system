# Use official Node.js image as the base image
FROM node:latest

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files from the current directory to the container
COPY . .

# Expose port
EXPOSE 3000

# Start the backend server with nodemon
CMD ["npx", "nodemon", "index.js"]
