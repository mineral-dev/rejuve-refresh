# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local project files into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Add a non-root user
RUN addgroup -g 1001 -S appuser && adduser -u 1001 -S appuser -G appuser

# Change to the non-root user
USER appuser

# Uncomment the following lines to add a daily git pull cron job
# RUN echo "0 0 * * * cd /usr/src/app && git checkout . && git pull" > /etc/crontabs/appuser
# RUN crontab /etc/crontabs/appuser

# Uncomment the following line to create the log file
# RUN touch /var/log/cron.log

# Uncomment the following line to run the cron in the foreground
# CMD crond -f

# Run the Next.js application
CMD npm start