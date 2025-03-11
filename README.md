# Decentralized Lottery System

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technical Components](#technical-components)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview
The Decentralized Lottery System is a blockchain-based application developed using the Move language for smart contracts and the Aptos module for randomness and yield generation. It allows participants to engage in a risk-free lottery while ensuring transparency and security through blockchain technology.

## Features
- **100% Return to Player (RTP):** Participants receive their principal amount back.
- **Yield Generation:** Lottery funds are invested in yield farming protocols.
- **Actively Validated Service (AVS):** Ensures funds are managed according to lottery rules.
- **Randomness:** Uses the Aptos randomness module for fair lottery drawings.
- **Frontend Interface:** Web interface built with Next.js for seamless user interaction.

## Technical Components

### Smart Contracts (Move Language)
The core logic of the lottery system is implemented in Move language:
- **Lottery Contract:** Manages ticket purchases, prize distributions, and yield investments.
- **Randomness Module:** Implements random number generation using the Aptos module.

### Frontend (Next.js)
The frontend provides a user-friendly interface to interact with the lottery system:
- **Components:** Header, Footer, and Lottery display components.
- **Pages:** Index, About, and dynamic lottery details pages.
- **Styling:** Global styles and component-specific CSS Modules.

### Backend (Node.js)
- **API Integration:** Fetches lottery data from the blockchain using REST API.

## Installation

Clone the repository:
```bash
git clone https://github.com/arhansuba/lottery-project.git
cd lottery-project
```

Install dependencies:

### Install frontend dependencies
```bash
cd frontend
npm install
```

### Install backend dependencies (if applicable)
```bash
cd ../backend
npm install
```

Configure environment variables:

Create a `.env` file in the frontend directory and set necessary variables.
```plaintext
NEXT_PUBLIC_API_URL=https://your-api-url
```

Build the frontend:
```bash
npm run build
```

## Usage

Start the development server:
```bash
npm run dev
```

Access the application:
Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Testing

To run tests for Move contracts and frontend components, execute the following:

### Run Move contract tests
```bash
./scripts/test.sh
```

### Run frontend tests
```bash
cd frontend
npm test
```

## Deployment

Deploy your application using your preferred hosting platform. Ensure to set up environment variables and configure your deployment pipeline accordingly.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request with your enhancements.

## License

This project is licensed under the MIT License.
