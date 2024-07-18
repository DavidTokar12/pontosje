# Use the official Node.js image from the Docker Hub
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /pontosje-frontend

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json* /pontosje-frontend/

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . /pontosje-frontend/

# Expose port 3000 to allow communication to/from server
EXPOSE 3000

# Command to run the React development server
CMD ["npm", "start"]
