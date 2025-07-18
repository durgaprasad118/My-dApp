import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
    variable: '--font-jetbrains-mono',
    subsets: ['latin'],
    display: 'swap'
});

export const metadata = {
    title: 'Solana Wallet Dashboard | Modern Web3 Interface',
    description: 'A beautiful, modern Solana wallet dashboard for managing your tokens, sending transactions, and signing messages on the devnet.',
    keywords: 'Solana, Wallet, Web3, Cryptocurrency, Blockchain, DApp',
    authors: [{ name: 'Solana Developer' }],
    viewport: 'width=device-width, initial-scale=1',
    themeColor: '#8B5CF6',
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        title: 'Solana Wallet Dashboard',
        description: 'Modern Solana wallet interface for Web3 interactions',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Solana Wallet Dashboard',
        description: 'Modern Solana wallet interface for Web3 interactions',
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body
                className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
            >
                <div className="min-h-screen w-full">
                    <main className="relative">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
