#Dockerize React Front End 

#Use Node.js (version 20) on Alpine Linux.
FROM node:20-alpine 

#Work on the /app directory in the container.
WORKDIR /app

#Copy package.json and package-lock.json to the /app directory in the container.
COPY package*.json ./

#Install Packages
RUN npm install

#Copy the rest of the application code to the /app directory in the container.
COPY . .

#Expose port 5173 to allow external access to the application.
EXPOSE 4200

#Start Nginx when the container runs.
CMD ["npm", "run", "dev"]
