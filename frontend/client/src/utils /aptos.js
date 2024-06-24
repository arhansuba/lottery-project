// File: src/utils/aptos.js

import aptosConfig from '../config/aptosConfig';

const aptos = {
    // Function to get current lottery index
    async getCurrentLotteryIndex() {
        const endpoint = `${aptosConfig.network.fullnode}/current_lottery_index`;
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch current lottery index');
            }
            const data = await response.json();
            return data.index;
        } catch (error) {
            console.error('Error fetching current lottery index:', error);
            throw error;
        }
    },

    // Function to buy a lottery ticket
    async buyLotteryTicket(playerAddress, amount) {
        const endpoint = `${aptosConfig.network.fullnode}/buy_lottery_ticket`;
        const requestBody = {
            playerAddress: playerAddress,
            amount: amount,
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Failed to buy lottery ticket');
            }
        } catch (error) {
            console.error('Error buying lottery ticket:', error);
            throw error;
        }
    },

    // Function to draw a winner using Aptos randomness module
    async drawWinner() {
        const currentLotteryIndex = await this.getCurrentLotteryIndex();
        // Placeholder logic for demonstration purposes
        const randomNumber = currentLotteryIndex % 100; // Simplified example
        return randomNumber;
    },

    // Function to distribute prizes
    async distributePrizes(winnerAddress, prizeAmount) {
        const endpoint = `${aptosConfig.network.fullnode}/distribute_prizes`;
        const requestBody = {
            winnerAddress: winnerAddress,
            prizeAmount: prizeAmount,
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Failed to distribute prizes');
            }
        } catch (error) {
            console.error('Error distributing prizes:', error);
            throw error;
        }
    },
};

export default aptos;
