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
                    <div className="p-4 space-y-4">
                        <div className="flex gap-4">
                            <WalletMultiButton />
                            <WalletDisconnectButton />
                        </div>
                        <ShowUserBal ref={balanceRef} />
                        <It balanceRef={balanceRef} />
                        <MessageSign />
                        <Send />
                    </div>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;
