#!/bin/bash

# Define paths
CONTRACTS_DIR="./contracts/MoveLottery"
BUILD_DIR="./build"
DEPLOYMENT_SCRIPT="./scripts/deploy_contracts.sh"

# Create build directory if it doesn't exist
mkdir -p $BUILD_DIR

# Compile Move contracts (if not already compiled)
./build.sh

# Deploy Move contracts
echo "Deploying Move contracts..."

# Example deployment script (replace with actual deployment logic)
# Example assumes a deploy_contracts.sh script in scripts directory
$DEPLOYMENT_SCRIPT

# Print deployment success message
echo "Move contracts deployed successfully!"
