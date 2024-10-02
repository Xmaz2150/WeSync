# Use the official Python image from the Docker Hub
FROM node:22.9.0-alpine3.19 AS base

# Set the working directory in the container
WORKDIR /app
# Copy the entire frontend directory to the working directory
COPY frontend/ ./frontend/

# Change to the frontend directory and install Node.js dependencies
WORKDIR /app/frontend

RUN npm install

# Expose the port for React application
EXPOSE 3000

# Command to run both apps
CMD ["sh", "-c", "npm run start"]
