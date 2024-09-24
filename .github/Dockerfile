# Use the official Python image from the Docker Hub
FROM python:3.12.6-bookworm AS base

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file to the working directory
COPY backend/requirements.txt ./backend/

# Install the Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy the entire backend directory to the working directory
COPY backend/ ./backend/

# Use the official Node.js image from the Docker Hub
# Install Node.js globally in the same image
RUN apt-get update && \
    apt-get install -y nodejs npm && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory in the container for the frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the entire frontend directory to the working directory
COPY frontend/ ./frontend/


# Expose the port your Flask app runs on
EXPOSE 5000 3000

# Command to run both apps
CMD ["sh", "-c", "IS_SU=su SECRET_KEY=the_secret JWT_SECRET_KEY=the_jwt_secret source env/bin/activate && flask run && npm run start"]
