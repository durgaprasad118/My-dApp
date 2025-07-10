'use client';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState } from 'react';

const It = () => {
    const [value, setValue] = useState(0);
    const wallet = useWallet();
    const { connection } = useConnection();
    async function requestAirdrop() {
        let amount = value;
        await connection.requestAirdrop(
            wallet.publicKey,
            amount * LAMPORTS_PER_SOL
        );
        alert('airdropped ' + amount + ' to ' + wallet.publicKey.toBase58());
    }
    return (
        <div>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="px-4 py-2 outline-none rounded-md my-2 border  border-slate-300 hover:border-slate-400"
            />
            <button
                onClick={requestAirdrop}
                className="px-3 py-1 rounded-md bg-red-400 md:bg-red-500"
            >
                AIrdrop sol
            </button>
        </div>
    );
};

export default It;
