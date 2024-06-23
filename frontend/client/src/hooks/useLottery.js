// File: src/hooks/useLottery.js

import { useState, useEffect } from 'react';
import aptosConfig from '../config/aptosConfig';

const useLottery = () => {
    const [ticketPrice, setTicketPrice] = useState(0);
    const [lotteryData, setLotteryData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLotteryData();
    }, []);

    const fetchLotteryData = async () => {
        setIsLoading(true);
        setError(null);

        const endpoint = `${aptosConfig.network.fullnode}/lottery_data`;
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch lottery data');
            }
            const data = await response.json();
            setLotteryData(data);
        } catch (error) {
            console.error('Error fetching lottery data:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const buyTicket = async (playerAddress, amount) => {
        setIsLoading(true);
        setError(null);

        const endpoint = `${aptosConfig.network.fullnode}/buy_ticket`;
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
                throw new Error('Failed to buy ticket');
            }

            // Update lottery data after buying ticket
            await fetchLotteryData();
        } catch (error) {
            console.error('Error buying ticket:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        ticketPrice,
        setTicketPrice,
        lotteryData,
        isLoading,
        error,
        fetchLotteryData,
        buyTicket,
    };
};

export default useLottery;
