#!/bin/bash

# MLOps Project Setup Script
# This script sets up the virtual environment and installs dependencies

set -e  # Exit on error

echo "=================================================="
echo "MLOps CI/CD Pipeline Setup"
echo "=================================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

echo ""
echo "Step 1: Creating virtual environment..."
python3 -m venv venv

echo ""
echo "Step 2: Activating virtual environment..."
source venv/bin/activate

echo ""
echo "Step 3: Upgrading pip..."
pip install --upgrade pip

echo ""
echo "Step 4: Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "Step 5: Setting up project directories..."
mkdir -p data models reports tests

echo ""
echo "=================================================="
echo "Setup Complete!"
echo "=================================================="
echo ""
echo "Virtual environment is now activated."
echo ""
echo "Next steps:"
echo "  - Run the pipeline: make pipeline"
echo "  - Train model: make train"
echo "  - Run tests: make test"
echo ""
echo "To activate the virtual environment in the future:"
echo "  source venv/bin/activate"
echo ""
echo "To deactivate:"
echo "  deactivate"
echo "=================================================="
