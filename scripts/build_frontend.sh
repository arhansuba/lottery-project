#!/bin/bash

# Navigate to the frontend directory
cd frontend

# Ensure dependencies are up to date
echo "Installing dependencies..."
yarn install

# Build the Next.js application
echo "Building frontend..."
yarn build

# Display success message
echo "Frontend build completed successfully."

# Exit script
exit 0
