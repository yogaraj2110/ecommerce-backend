FROM node

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application files to the container
COPY . .

# Expose the port that the Next.js app will run on (default is 3000)
EXPOSE 3000

# Run the Next.js app in development mode
CMD ["npm", "run", "dev"]
