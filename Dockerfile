# We need a Node.js runtime, Firebase CLI requires this
FROM node:14

# Firebase CLI
RUN npm install -g firebase-tools

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the Firebase Functions emulator port
EXPOSE 5001

# Start command
CMD ["firebase deploy --only functions"]
