import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import bs58 from 'bs58';

const MessageSign = () => {
    const wallet = useWallet();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [signature, setSignature] = useState('');

    async function ClickHandler() {
        try {
            setLoading(true);
            setSuccess(false);
            setSignature('');

            if (!wallet.publicKey) {
                alert('Please connect your wallet first');
                return;
            }

            if (!message.trim()) {
                alert('Please enter a message to sign');
                return;
            }

            const encodedMessage = new TextEncoder().encode(message.trim());
            const messageSignature = await wallet.signMessage(encodedMessage);

            if (
                !ed25519.verify(
                    messageSignature,
                    encodedMessage,
                    wallet.publicKey.toBytes()
                )
            ) {
                throw new Error('Message signature invalid!');
            }

            setSignature(bs58.encode(messageSignature));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (er) {
            console.log(er);
            alert('Signing failed: ' + er.message);
        } finally {
            setLoading(false);
            setMessage('');
        }
    }

    const copySignature = () => {
        navigator.clipboard.writeText(signature);
        alert('Signature copied to clipboard!');
    };

    return (
        <div className="space-y-3">
            <div className="space-y-3">
                <div>
                    <textarea
                        id="message-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message..."
                        rows={2}
                        className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors duration-200 resize-none"
                    />
                </div>

                <button
                    onClick={ClickHandler}
                    disabled={loading || !wallet.publicKey || !message.trim()}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Signing...</span>
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
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                ></path>
                            </svg>
                            <span>Sign Message</span>
                        </>
                    )}
                </button>
            </div>

            {success && signature && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
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
                                Signed!
                            </p>
                        </div>
                        <button
                            onClick={copySignature}
                            className="text-green-600 hover:text-green-700 text-xs font-medium"
                        >
                            Copy
                        </button>
                    </div>
                    <div className="bg-white rounded p-2 border">
                        <p className="text-xs font-mono text-gray-700 break-all">
                            {signature}
                        </p>
                    </div>
                </div>
            )}

            {!wallet.publicKey && (
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

export default MessageSign;
