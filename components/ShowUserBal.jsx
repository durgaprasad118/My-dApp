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

    return (
        <div className="flex items-center gap-2">
            User's balance is:
            {loading ? (
                <span className="text-teal-500"> Loading.... </span>
            ) : (
                <span className="text-teal-500"> {bal} SOL </span>
            )}
            <button
                onClick={getBalance}
                className="px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
            >
                Refresh
            </button>
        </div>
    );
});

ShowUserBal.displayName = 'ShowUserBal';

export default ShowUserBal;
