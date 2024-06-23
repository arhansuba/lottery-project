// File: src/pages/_app.js

import React from 'react';
import Head from 'next/head';
import '../styles/global.css'; // Import global styles
import Header from '../components/Header';
import Footer from '../components/Footer';
import aptosConfig from '../config/aptosConfig'; // Import aptosConfig
import { fetchLotteryData } from '../utils/aptos'; // Import fetchLotteryData from utils

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Decentralized Lottery System</title>
                <meta name="description" content="Decentralized Lottery System powered by Move language and Aptos module" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>
                <Component {...pageProps} />
            </main>
            <Footer />
        </>
    );
}

MyApp.getInitialProps = async () => {
    try {
        const lotteryData = await fetchLotteryData();
        return { lotteryData };
    } catch (error) {
        console.error('Error fetching initial props:', error);
        return {}; // Return empty object or handle error as needed
    }
};

export default MyApp;
