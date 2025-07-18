'use client';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const ShowUserBal = forwardRef((props, ref) => {
    const [bal, setBal] = useState(0);
    const [loading, setLoading] = useState(false);
    const wallet = useWallet();
    const { connection } = useConnection();

    async function getBalance() {
        try {
            setLoading(true);
            if (wallet.publicKey) {
                const bal = await connection.getBalance(wallet.publicKey);
                setBal(bal / LAMPORTS_PER_SOL);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useImperativeHandle(ref, () => ({
        refreshBalance: getBalance
    }));

    useEffect(() => {
        getBalance();
    }, [wallet.publicKey]);

    if (!wallet.publicKey) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Wallet Not Connected
                </h3>
                <p className="text-gray-500">
                    Connect your wallet to view your balance
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-6 py-6">
            {loading ? (
                <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                    <span className="text-2xl font-bold text-gray-400">
                        Loading...
                    </span>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-3">
                        <span className="text-5xl font-bold text-gray-900">
                            {bal.toFixed(4)}
                        </span>
                        <span className="text-2xl font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-lg">
                            SOL
                        </span>
                    </div>
                    <button
                        onClick={getBalance}
                        disabled={loading}
                        className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            ></path>
                        </svg>
                        <span>Refresh</span>
                    </button>
                </div>
            )}
        </div>
    );
});

ShowUserBal.displayName = 'ShowUserBal';

export default ShowUserBal;
