#!/bin/bash

# Define paths and variables
CONTRACTS_DIR="contracts"
MOVE_COMPILER="move"
MOVE_STD_LIB="stdlib"
NETWORK="devnet"  # Replace with your network name (e.g., mainnet, testnet)
FRONTEND_DIR="frontend"
FRONTEND_SCRIPT="npm"
DEV_SERVER_PORT=3000  # Replace with your desired port number

# Function to compile Move contracts
compile_contracts() {
    echo "Compiling Move contracts..."

    # Compile all Move contracts in the contracts directory
    $MOVE_COMPILER compile $CONTRACTS_DIR/*/sources/*.move $CONTRACTS_DIR/*/sources/$MOVE_STD_LIB/*.move

    echo "Move contract compilation completed."
}

# Function to start frontend development server
start_frontend() {
    echo "Starting frontend development server..."

    # Navigate to frontend directory
    cd $FRONTEND_DIR

    # Install dependencies
    $FRONTEND_SCRIPT install

    # Start development server
    $FRONTEND_SCRIPT start -- --port $DEV_SERVER_PORT

    echo "Frontend development server started on port $DEV_SERVER_PORT."
}

# Main script execution starts here
echo "Starting development environment setup..."

# Ensure Move compiler is installed
if ! command -v $MOVE_COMPILER &> /dev/null; then
    echo "Move compiler not found. Please install Move tools."
    exit 1
fi

# Compile Move contracts
compile_contracts

# Start frontend development server
start_frontend

# Exit script
exit 0
