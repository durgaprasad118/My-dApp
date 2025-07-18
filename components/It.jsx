'use client';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState } from 'react';
const It = ({ balanceRef }) => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const wallet = useWallet();
    const { connection } = useConnection();
    async function requestAirdrop() {
        try {
            setLoading(true);
            let amount = Number(value);
            if (!wallet.publicKey) {
                alert('Please connect your wallet first');
                return;
            }
            const signature = await connection.requestAirdrop(
                wallet.publicKey,
                amount * LAMPORTS_PER_SOL
            );

            // Wait for confirmation
            // await connection.confirmTransaction(signature, 'confirmed');

            alert(
                'Successfully airdropped ' +
                    amount +
                    ' SOL to ' +
                    wallet.publicKey.toBase58()
            );

            // Refresh the balance
            if (balanceRef?.current?.refreshBalance) {
                await balanceRef.current.refreshBalance();
            }

            setValue('');
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert('Airdrop failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-2">
            <div className="flex gap-2 items-center">
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter SOL amount"
                    className="px-4 py-2 outline-none rounded-md border border-slate-300 hover:border-slate-400 focus:border-blue-500"
                />
                <button
                    onClick={requestAirdrop}
                    disabled={loading || !wallet.publicKey}
                    className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? 'Airdropping...' : 'Airdrop SOL'}
                </button>
            </div>
            {!wallet.publicKey && (
                <p className="text-sm text-gray-600">
                    Please connect your wallet to request airdrop
                </p>
            )}
        </div>
    );
};

export default It;
