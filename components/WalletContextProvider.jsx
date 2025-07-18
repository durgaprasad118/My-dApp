'use client';
import React, { useMemo, useRef } from 'react';
import {
    ConnectionProvider,
    WalletProvider
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import It from '@/components/It';
import ShowUserBal from '@/components/ShowUserBal';
import MessageSign from './MessageSign';
import Send from './Send';

const WalletContextProvider = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const balanceRef = useRef();

    return (
        <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_DEV_URL}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 px-2">
                        <div className="max-w-5xl mx-auto space-y-4">
                            {/* Header */}
                            <div className="text-center space-y-2">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Solana Wallet
                                </h1>
                                <p className="text-gray-600 text-base">
                                    Your gateway to the Solana ecosystem
                                </p>
                            </div>

                            <div className="bg-white/80 backdrop-blur h-60 rounded-xl shadow border border-white/20 p-4 flex flex-col items-center space-y-3">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Connect Wallet
                                </h2>
                                <WalletMultiButton className="!w-full !z-40 !bg-gradient-to-r !from-purple-600 !to-blue-600 !hover:from-purple-700 !hover:to-blue-700 !border-0 !rounded-lg !py-2 !px-4 !text-white !font-semibold !shadow !transition-all !duration-300 text-sm" />
                            </div>

                            <div className="bg-white/80 backdrop-blur rounded-xl shadow border border-white/20 p-4 flex flex-col items-center justify-center">
                                <ShowUserBal ref={balanceRef} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                                <div className="bg-white/90 backdrop-blur rounded-xl shadow border border-white/20 p-4 flex flex-col h-full min-h-[220px]">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded flex items-center justify-center shadow">
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                                ></path>
                                            </svg>
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">
                                            Airdrop
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-2">
                                        Get test SOL
                                    </p>
                                    <div className="flex-1 flex flex-col justify-end">
                                        <It balanceRef={balanceRef} />
                                    </div>
                                </div>

                                <div className="bg-white/90 backdrop-blur rounded-xl shadow border border-white/20 p-4 flex flex-col h-full min-h-[220px]">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded flex items-center justify-center shadow">
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                ></path>
                                            </svg>
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">
                                            Send
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-2">
                                        Transfer SOL
                                    </p>
                                    <div className="flex-1 flex flex-col justify-end">
                                        <Send balanceRef={balanceRef} />
                                    </div>
                                </div>

                                <div className="bg-white/90 backdrop-blur rounded-xl shadow border border-white/20 p-4 flex flex-col h-full min-h-[220px]">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded flex items-center justify-center shadow">
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">
                                            Sign
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-2">
                                        Message signing
                                    </p>
                                    <div className="flex-1 flex flex-col justify-end">
                                        <MessageSign />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;
