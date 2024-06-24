
"use client";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { AptosChangeNetworkOutput } from "@aptos-labs/wallet-adapter-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react/dist/useWallet";
import { useRef, useState } from "react";
import { useAutoConnect } from "./components /AutoConnectProvider";
import Footer from "./components /Footer";
import Header from "./components /Header";
import { LabelValueGrid, DisplayValue } from "./components /LabelValueGrid";
import Lottery from "./components /Lottery";
import { ThemeToggle } from "./components /ThemeToggle";
import { WalletProvider } from "./components /WalletProvider";
import { MultiAgent } from "./components /transactionFlows/MultiAgent";
import { SingleSigner } from "./components /transactionFlows/SingleSigner";
import { Sponsor } from "./components /transactionFlows/Sponsor";
import { TransactionParameters } from "./components /transactionFlows/TransactionParameters";
import { Alert } from "./components /ui/alert";
import { Button } from "./components /ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components /ui/card";
import { Label } from "./components /ui/label";
import { RadioGroup, RadioGroupItem } from "./components /ui/radio-group";
import { isMainnet } from "./utils ";

 // Initialize Aptos SDK and configure network
const aptosConfig = new AptosConfig({ network: Network.CUSTOM }); // Adjust Network as needed
const aptos = new Aptos(aptosConfig);

export default function App() {
  const { account, connected, network, wallet, changeNetwork, signAndSubmitTransaction } = useWallet();
  const ticketPriceRef = useRef<HTMLInputElement>(null);
  const { autoConnect, setAutoConnect } = useAutoConnect();
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

    const transaction = {
      data: {
        function: "Lottery::LotteryContract::buy_ticket",
        functionArguments: [ticketPrice],
      },
    };

    try {
      const response = await signAndSubmitTransaction(transaction);
      setTransactionStatus(`Ticket bought successfully! Transaction hash: ${response.hash}`);
    } catch (error) {
      setTransactionStatus(`Error buying ticket: ${error.toString()}`);
    }
  }

  // Example wallets configuration
  const wallets = [
    {
      id: "wallet1",
      name: "Wallet 1",
      provider: "Provider 1",
      network: "Mainnet",
      address: "0x123...",
    },
    {
      id: "wallet2",
      name: "Wallet 2",
      provider: "Provider 2",
      network: "Testnet",
      address: "0x456...",
    },
  ];

  function handleNetworkChange(network: Network): Promise<AptosChangeNetworkOutput> {
    // Implement your logic for network change
    // Example: return aptos.changeNetwork(network);
    throw new Error("Function not implemented.");
  }

  const isValidNetworkName = () => {
    if (isMainnet(connected, network?.name)) {
      return Object.values<string | undefined>(Network).includes(network?.name);
    }
    return true;
  };

  const isNetworkChangeSupported = wallet?.name === "Nightly";

  return (
    <div className="App">
      <Header />
      <main className="flex flex-col w-full max-w-[1000px] p-6 pb-12 md:px-8 gap-6">
        <div className="flex justify-between gap-6 pb-10">
          <div className="flex flex-col gap-2 md:gap-3">
            <h1 className="text-xl sm:text-3xl font-semibold tracking-tight">
              Lottery DApp
              {network?.name ? ` — ${network.name}` : ""}
            </h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Wallet Selection */}
        <WalletProvider Wallet={wallets}>
          <div className="flex flex-wrap gap-6 pt-6 pb-12 justify-between items-center">
            <div className="flex flex-col gap-4 items-center">
              <div className="text-sm text-muted-foreground">shadcn/ui</div>
              <WalletSelector />
            </div>
            <div className="flex flex-col gap-4 items-center">
              <div className="text-sm text-muted-foreground">Ant Design</div>
              <WalletSelector />
            </div>
            <div className="flex flex-col gap-4 items-center">
              <div className="text-sm text-muted-foreground">Material UI</div>
              <WalletSelector />
            </div>
          </div>
        </WalletProvider>

        {/* Wallet Connection Section */}
        {connected && (
          <Card>
            <CardHeader>
              <CardTitle>Wallet Connection</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-10 pt-6">
              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-medium">Wallet Details</h4>
                <LabelValueGrid
                  items={[
                    {
                      label: "Icon",
                      value: wallet?.icon ? <img src={wallet.icon} alt={wallet.name} width={24} height={24} /> : "Not Present",
                    },
                    {
                      label: "Name",
                      value: <p>{wallet?.name ?? "Not Present"}</p>,
                    },
                    {
                      label: "URL",
                      value: wallet?.url ? <a href={wallet.url} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-300">{wallet.url}</a> : "Not Present",
                    },
                  ]}
                />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-medium">Account Info</h4>
                <LabelValueGrid
                  items={[
                    {
                      label: "Address",
                      value: <DisplayValue value={account?.address ?? "Not Present"} isCorrect={!!account?.address} />,
                    },
                    {
                      label: "Public key",
                      value: <DisplayValue value={account?.publicKey?.toString() ?? "Not Present"} isCorrect={!!account?.publicKey} />,
                    },
                    {
                      label: "ANS name",
                      subLabel: "(only if attached)",
                      value: <p>{account?.ansName ?? "Not Present"}</p>,
                    },
                    {
                      label: "Min keys required",
                      subLabel: "(only for multisig)",
                      value: <p>{account?.minKeysRequired?.toString() ?? "Not Present"}</p>,
                    },
                  ]}
                />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-medium">Network Info</h4>
                <LabelValueGrid
                  items={[
                    {
                      label: "Network name",
                      value: <DisplayValue value={network?.name ?? "Not Present"} isCorrect={isValidNetworkName()} expected={Object.values<string>(Network).join(", ")} />,
                    },
                    {
                      label: "URL",
                      value: network?.url ? <a href={network.url} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-300">{network.url}</a> : "Not Present",
                    },
                    {
                      label: "Chain ID",
                      value: <p>{network?.chainId ?? "Not Present"}</p>,
                    },
                  ]}
                />
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-medium">Change Network</h4>
                <RadioGroup
                  value={network?.name}
                  orientation="horizontal"
                  className="flex gap-6"
                  onValueChange={(value: Network) => changeNetwork(value)}
                  disabled={!isNetworkChangeSupported}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={Network.DEVNET} id="devnet-radio" />
                    <Label htmlFor="devnet-radio">Devnet</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={Network.TESTNET} id="testnet-radio" />
                    <Label htmlFor="testnet-radio">Testnet</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={Network.MAINNET} id="mainnet-radio" />
                    <Label htmlFor="mainnet-radio">Mainnet</Label>
                  </div>
                </RadioGroup>
                {!isNetworkChangeSupported && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    * {wallet?.name ?? "This wallet"} does not support network change requests
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transaction Flows */}
        {connected && (
          <>
            <TransactionParameters />
            <SingleSigner />
            <Sponsor />
            <MultiAgent />
          </>
        )}

        {/* Buy Ticket Section */}
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-4">
            Ticket Price:
            <input ref={ticketPriceRef} type="number" />
          </label>
          <Button onClick={buyTicket}>Buy Ticket</Button>
        </div>

        {/* Transaction Status */}
        {transactionStatus && <Alert variant="success">{transactionStatus}</Alert>}
        
        {/* Lottery Component */}
        <Lottery />
      </main>
      <Footer />
    </div>
  );
}