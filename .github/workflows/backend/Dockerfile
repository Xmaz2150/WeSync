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
CMD ["sh", "-c", "python3 app.py"]
