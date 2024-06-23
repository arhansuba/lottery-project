import React, { useRef, useState } from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet, InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import "./App.css";

// Configure Aptos SDK
const aptosConfig = new AptosConfig({ network: Network.CUSTOM }); // Adjust Network as needed
const aptos = new Aptos(aptosConfig);

function App() {
  const { signAndSubmitTransaction, account } = useWallet();
  const nameRef = useRef<HTMLInputElement>(null);
  const ticketPriceRef = useRef<HTMLInputElement>(null);

  const [transactionStatus, setTransactionStatus] = useState("");

  async function buyTicket() {
    if (!account) {
      alert("Please connect your wallet.");
      return;
    }

    const ticketPrice = ticketPriceRef.current?.value;
    if (!ticketPrice) {
      alert("Please enter a ticket price.");
      return;
    }

    const transaction: InputTransactionData = {
      data: {
        function: "Lottery::LotteryContract::buy_ticket",
        functionArguments: [ticketPrice],
      },
    };

    try {
      const response = await signAndSubmitTransaction(transaction);
      setTransactionStatus(`Ticket bought successfully! Transaction hash: ${response.hash}`);
    } catch (error: any) {
      setTransactionStatus(`Error buying ticket: ${error.toString()}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lottery DApp</h1>
        <WalletSelector />
        <div>
          <label>
            Ticket Price:
            <input ref={ticketPriceRef} type="number" />
          </label>
          <button onClick={buyTicket}>Buy Ticket</button>
        </div>
        {transactionStatus && <p>{transactionStatus}</p>}
      </header>
    </div>
  );
}

export default App;
