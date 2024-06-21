#!/bin/bash

# Define paths and variables
CONTRACTS_DIR="contracts"
MOVE_COMPILER="move"
MOVE_STD_LIB="stdlib"
ACCOUNT_ADDRESS="0xYOURACCOUNTADDRESS"
NETWORK="devnet"  # Replace with your network name (e.g., mainnet, testnet)

# Deploy function for Move contract
deploy_contract() {
    local contract_name=$1

    echo "Deploying $contract_name..."

    # Compile the Move file
    $MOVE_COMPILER compile $CONTRACTS_DIR/$contract_name/$MOVE_STD_LIB/*.move $CONTRACTS_DIR/$contract_name/sources/*.move

    # Deploy the compiled Move bytecode
    $MOVE_COMPILER publish -n $NETWORK --signer $ACCOUNT_ADDRESS -p $CONTRACTS_DIR/$contract_name/sources/*.mv

    echo "Deployment of $contract_name completed."
}

# Deploy all contracts
deploy_all_contracts() {
    deploy_contract "MoveLottery"
    deploy_contract "AptosRandomnessModule"
    # Add more contracts as needed
}

# Main script execution starts here
echo "Starting deployment script..."

# Navigate to the contracts directory
cd $CONTRACTS_DIR

# Ensure Move compiler is installed
if ! command -v $MOVE_COMPILER &> /dev/null; then
    echo "Move compiler not found. Please install Move tools."
    exit 1
fi

# Deploy all contracts
deploy_all_contracts

echo "Deployment process completed successfully."

# Exit script
exit 0
