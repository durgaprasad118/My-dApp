import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import {
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    PublicKey
} from '@solana/web3.js';
import { useState } from 'react';

const Send = ({ balanceRef }) => {
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();

    async function awaitSignatureConfirmation(
        signature,
        connection,
        timeout = 30000
    ) {
        return new Promise((resolve, reject) => {
            let timer = setTimeout(() => {
                reject(new Error('Transaction confirmation timed out'));
            }, timeout);

            const interval = setInterval(async () => {
                try {
                    const result =
                        await connection.getSignatureStatus(signature);
                    const status = result && result.value;
                    if (status) {
                        if (status.err) {
                            clearTimeout(timer);
                            clearInterval(interval);
                            reject(status.err);
                        }
                        if (
                            status.confirmationStatus === 'confirmed' ||
                            status.confirmationStatus === 'finalized'
                        ) {
                            clearTimeout(timer);
                            clearInterval(interval);
                            resolve(status);
                        }
                    }
                } catch (e) {
                    // ignore errors while polling
                }
            }, 1000); // poll every second
        });
    }
    async function ClickHandler() {
        setLoading(true);
        setSuccess(false);
        setError('');

        if (!publicKey) {
            alert('Please connect your wallet first');
            setLoading(false);
            return;
        }

        if (!to.trim()) {
            alert('Please enter a recipient address');
            setLoading(false);
            return;
        }

        if (!amount || Number(amount) <= 0) {
            alert('Please enter a valid amount');
            setLoading(false);
            return;
        }
        let amountTobeSent = Number(amount);
        const transaction = new Transaction();
        let receiverPublicKey;
        try {
            receiverPublicKey = new PublicKey(to.trim());
        } catch (e) {
            setError(
                'Invalid recipient address format. Please enter a valid Solana public key.'
            );
            setLoading(false);
            return;
        }
        try {
            // Step 1: Get latest blockhash
            const { blockhash, lastValidBlockHeight } =
                await connection.getLatestBlockhash();
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: receiverPublicKey,
                    lamports: amountTobeSent * LAMPORTS_PER_SOL
                })
            );
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;
            const signedTransaction = await sendTransaction(
                transaction,
                connection
            );
            // await connection.confirmTransaction(signedTransaction, 'confirmed');
            await awaitSignatureConfirmation(
                signedTransaction,
                connection,
                30000
            );
            setLoading(false);
            setSuccess(true);
            setTo('');
            setAmount(0);
            if (balanceRef?.current?.refreshBalance) {
                setTimeout(async () => {
                    await balanceRef.current.refreshBalance();
                }, 2000);
            }
        } catch (err) {
            console.log(err);
            alert('Transaction failed: ' + error.message);
        } finally {
            setLoading(false);
            setTo('');
            setAmount('');
        }
    }

    return (
        <div className="space-y-3">
            <div className="space-y-3">
                <div>
                    <input
                        id="recipient-address"
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="Recipient address"
                        className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 font-mono text-sm"
                    />
                </div>

                <div>
                    <input
                        id="send-amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount (SOL)"
                        min="0"
                        step="0.001"
                        className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                    />
                </div>

                <button
                    disabled={loading || !publicKey || !to.trim() || !amount}
                    onClick={ClickHandler}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Sending...</span>
                        </>
                    ) : (
                        <>
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
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                ></path>
                            </svg>
                            <span>Send SOL</span>
                        </>
                    )}
                </button>
            </div>

            {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                        <svg
                            className="w-4 h-4 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <p className="text-green-800 text-sm font-medium">
                            Transaction sent!
                        </p>
                    </div>
                </div>
            )}

            {!publicKey && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                        <svg
                            className="w-4 h-4 text-yellow-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            ></path>
                        </svg>
                        <p className="text-yellow-800 text-sm">
                            Connect your wallet first
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Send;
