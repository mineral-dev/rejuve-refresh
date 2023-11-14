# Use an official Node.js runtime as a parent image
FROM node:18

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

# Add cron job for git pull once a day
# RUN echo "0 0 * * * cd /usr/src/app && git checkout . && git pull" > /etc/cron.d/git-pull-cron

# Give execution rights to the cron job
# RUN chmod 0644 /etc/cron.d/git-pull-cron

# Apply cron job
# RUN crontab /etc/cron.d/git-pull-cron

# Create the log file to redirect the cron job output
# RUN touch /var/log/cron.log

# Run the cron in the foreground
# CMD cron && npm start
CMD npm start