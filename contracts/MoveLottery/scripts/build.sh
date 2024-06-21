#!/bin/bash

# Define paths
CONTRACTS_DIR="./contracts/MoveLottery"
BUILD_DIR="./build"

# Create build directory if it doesn't exist
mkdir -p $BUILD_DIR

# Compile Move contracts
echo "Compiling Move contracts..."

# Compile Lottery.move
move compile $CONTRACTS_DIR/sources/Lottery.move --output $BUILD_DIR/Lottery.mv

# Compile AVS.move (if needed)
# move compile $CONTRACTS_DIR/sources/AVS.move --output $BUILD_DIR/AVS.mv

# Compile other contracts as needed
# move compile $CONTRACTS_DIR/sources/other_contracts.move --output $BUILD_DIR/other_contracts.mv

# Optionally, compile tests (if any)
# move compile $CONTRACTS_DIR/tests/Lottery.test.move --output $BUILD_DIR/Lottery.test.mv
# move compile $CONTRACTS_DIR/tests/AVS.test.move --output $BUILD_DIR/AVS.test.mv

# Print success message
echo "Move contracts compiled successfully!"
