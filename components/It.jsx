'use client';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState } from 'react';

const It = ({ balanceRef }) => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const wallet = useWallet();
    const { connection } = useConnection();

    async function requestAirdrop() {
        try {
            setLoading(true);
            setSuccess(false);
            let amount = Number(value);

            if (!wallet.publicKey) {
                alert('Please connect your wallet first');
                return;
            }

            if (!amount || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }

            if (amount > 2) {
                alert('Maximum airdrop amount is 2 SOL');
                return;
            }

            const signature = await connection.requestAirdrop(
                wallet.publicKey,
                amount * LAMPORTS_PER_SOL
            );

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);

            if (balanceRef?.current?.refreshBalance) {
                setTimeout(async () => {
                    await balanceRef.current.refreshBalance();
                }, 2000);
            }

            setValue('');
        } catch (error) {
            console.log(error);
            alert('Airdrop failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-3">
            <div className="space-y-3">
                <div>
                    <input
                        id="airdrop-amount"
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter amount (max 2 SOL)"
                        min="0"
                        max="2"
                        step="0.1"
                        className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors duration-200"
                    />
                </div>
                
                <button
                    onClick={requestAirdrop}
                    disabled={loading || !wallet.publicKey || !value}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Requesting...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                            </svg>
                            <span>Request Airdrop</span>
                        </>
                    )}
                </button>
            </div>

            {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-green-800 text-sm font-medium">Airdrop successful!</p>
                    </div>
                </div>
            )}

            {!wallet.publicKey && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                        <p className="text-yellow-800 text-sm">Connect your wallet first</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default It;
