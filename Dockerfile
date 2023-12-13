# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install SSH client and Git
RUN apk --no-cache add openssh-client git

# Copy SSH keys into the container (adjust the paths accordingly)
COPY  ./id_rsa /root/.ssh/id_rsa
COPY  ./known_hosts /root/.ssh/known_hosts

# Set correct permissions on the SSH keys
RUN chmod 600 /root/.ssh/id_rsa

# Set the Git user configuration (optional)
RUN git config --global user.email "rejuve-refresh@rejuve.co.id" && \
    git config --global user.name "Rejuve Refresh"

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

# Change the ownership of the application files to the non-root user
RUN chown -R appuser:appuser /usr/src/app

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
CMD ["sh", "-c", "git config --global --add safe.directory /usr/src/app && npm start"]