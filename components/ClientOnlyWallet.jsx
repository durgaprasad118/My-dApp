'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const WalletContextProvider = dynamic(() => import('./WalletContextProvider'), {
    ssr: false,
    loading: () => <div>Loading wallet...</div>
});

const ClientOnlyWallet = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div>Loading wallet...</div>;
    }

    return <WalletContextProvider />;
};

export default ClientOnlyWallet;

