import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import {
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction
} from '@solana/web3.js';
import { useState } from 'react';

const Send = () => {
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const wallet = useWallet();
    const { connection } = useConnection();
    async function ClickHandler() {
        try {
            setLoading(true);
            let receiver = to;
            let amountTobeSent = amount;
            const transaction = new Transaction();
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new PublicKey(receiver),
                    lamports: amountTobeSent * LAMPORTS_PER_SOL
                })
            );
            await wallet.sendTransaction(transaction, connection);
            alert('Sent ' + amount + ' SOL to ' + to);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setTo('');
            setAmount(0);
        }
    }
    return (
        <div className="flex flex-col gap-y-2 ">
            <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Enter the public address "
                className="px-4 py-2 outline-none rounded-md border border-slate-300 hover:border-slate-400 focus:border-blue-500"
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to be sent "
                className="px-4 py-2 outline-none rounded-md border border-slate-300 hover:border-slate-400 focus:border-blue-500"
            />
            <button
                disabled={loading}
                onClick={ClickHandler}
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? 'sending ..' : 'send sol'}
            </button>
        </div>
    );
};

export default Send;
