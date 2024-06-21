#!/bin/bash

# Define paths
CONTRACTS_DIR="./contracts/MoveLottery"
BUILD_DIR="./build"
TEST_SCRIPT="./scripts/test_all.sh"

# Create build directory if it doesn't exist
mkdir -p $BUILD_DIR

# Compile Move contracts (if not already compiled)
./build.sh

# Run Move contract tests
echo "Running Move contract tests..."

# Example test script (replace with actual test logic)
# Example assumes a test_all.sh script in scripts directory
$TEST_SCRIPT

# Print test success message
echo "Move contract tests completed successfully!"
