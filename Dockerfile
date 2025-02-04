# Base image to use
FROM node:latest

# Create application directory
WORKDIR /usr/src/app

# Install application dependencies
# Copy across project configuration information
COPY package*.json ./

# Ask npm to install the dependencies
RUN npm install

# Copy across all our files
COPY . .

# Expose our application port (3000)
EXPOSE 3000

# On start, run the application using npm
ENTRYPOINT ["npm", "start"]
#-------------------------------------------^original code for SD2 
#--------------------------------------vnew code mimicing the gitlab example
# FROM nginx:1.17
# COPY . /usr/share/nginx/html
