'use client';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';
const ShowUserBal = () => {
    const [bal, setBal] = useState(0);
    const wallet = useWallet();
    const { connection } = useConnection();
    async function getBalance() {
        if (wallet.publicKey) {
            const bal = await connection.getBalance(wallet.publicKey);
            setBal(bal / LAMPORTS_PER_SOL);
        }
    }
    useEffect(() => {
        getBalance();
    }, []);
    return (
        <div>
            {' '}
            User's balance is: {bal}{' '}
            <span className="text-teal-500">lamports</span>
        </div>
    );
};

export default ShowUserBal;
