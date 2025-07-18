import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import bs58 from 'bs58';

const MessageSign = () => {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState('');
    async function ClickHandler() {
        try {
            if (!publicKey) {
                alert('No key');
                return;
            }
            if (!message) {
                alert('No message');
                return;
            }
            const encodedMessage = new TextEncoder().encode(message);
            const signature = await signMessage(encodedMessage);
            if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
                throw new Error('Message signature invalid!');
            alert('success', `Message signature: ${bs58.encode(signature)}`);
            setMessage('');
        } catch (er) {
            console.log(er);
        }
    }

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter Message to sign "
                className="px-4 py-2 outline-none rounded-md border border-slate-300 hover:border-slate-400 focus:border-blue-500"
            />

            <button
                onClick={ClickHandler}
                className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Sign Message
            </button>
        </div>
    );
};

export default MessageSign;
