# Use the official Python image from the Docker Hub
FROM python:3.12.6-bookworm AS base

# Set the working directory in the container
WORKDIR /app

# Copy the entire backend directory to the working directory
COPY backend/ ./backend/

# Copy the entire frontend directory to the working directory
COPY frontend/ ./frontend/

# Install the Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y nodejs npm && \
    rm -rf /var/lib/apt/lists/*

# Change to the frontend directory and install Node.js dependencies
WORKDIR /app/frontend
RUN npm install

# Expose the ports for Flask and React applications
EXPOSE 5000 3000

# Set the FLASK_APP path
ENV APP_DIR=../backend/app.py

# Command to run both apps
CMD ["sh", "-c", "IS_SU=su SECRET_KEY=the_secret JWT_SECRET_KEY=the_jwt_secret python3 $APP_DIR & npm run start"]
