# Use the official Python image from the Docker Hub
FROM python:3.12.6-bookworm AS backend

# Set the working directory in the container for the backend
WORKDIR /app/backend

# Copy the requirements.txt file to the working directory
COPY backend/requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend directory to the working directory
COPY backend/ .

# Expose the port your Flask app runs on
EXPOSE 5000

# Command to run the Flask app (update with your app's entry point)
CMD ["IS_SU=su", "SECRET_KEY=the_secret", "JWT_SECRET_KEY=the_jwt_secret","flask", "run"]

########

# Use the official Node.js image from the Docker Hub
FROM node:22 AS frontend

# Set the working directory in the container for the frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the entire frontend directory to the working directory
COPY frontend/ .

# Expose the port your frontend app runs on (usually 3000 for React apps)
EXPOSE 3000

# Command to run the frontend app (update with your app's entry point)
CMD ["npm", "run", "start"]
