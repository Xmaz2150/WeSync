# Use the official Python image from the Docker Hub
FROM python:3.12.6-bookworm AS base

# Set the working directory in the container
WORKDIR /app

# Copy the entire backend directory to the working directory
COPY backend/ ./backend/

# Change to the backend
WORKDIR /app/backend

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the ports for Flask
EXPOSE 5000

# Command to run both apps
CMD ["sh", "-c", "IS_SU=su SECRET_KEY=the_secret JWT_SECRET_KEY=the_jwt_secret WSYNC_PGSQL_HOST=134.122.119.145:5432 python3 app.py"]
