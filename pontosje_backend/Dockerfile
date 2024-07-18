# Use the official Python image from the Docker Hub
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /pontosje_backend

# Install dependencies
COPY requirements.txt /pontosje_backend/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project code into the container
COPY . /pontosje_backend/

# Expose port 8000 to allow communication to/from server
EXPOSE 8000
