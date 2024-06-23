// File: components/Lottery.js

import React, { useState } from 'react';
import styles from '../styles/Lottery.module.css'; // Importing styles from Lottery.module.css

const Lottery = () => {
    const [ticketNumber, setTicketNumber] = useState(''); // State to store the ticket number entered by the user

    const handleTicketNumberChange = (event) => {
        setTicketNumber(event.target.value); // Update ticket number state when user types in the input field
    };

    const handleBuyTicket = () => {
        // Logic to handle buying a lottery ticket
        alert(`Buying ticket with number: ${ticketNumber}`);
        // Additional logic can be added here, like calling a function to interact with smart contracts
    };

    return (
        <div className={styles.lottery}>
            <h2>Buy Lottery Ticket</h2>
            <div className={styles.lotteryForm}>
                <label htmlFor="ticketNumber">Ticket Number:</label>
                <input
                    type="text"
                    id="ticketNumber"
                    value={ticketNumber}
                    onChange={handleTicketNumberChange}
                />
                <button onClick={handleBuyTicket}>Buy Ticket</button>
            </div>
        </div>
    );
};

export default Lottery;
