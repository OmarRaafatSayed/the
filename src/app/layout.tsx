
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ChatbotRoot } from "@/components/chatbot/ChatbotRoot";

export const metadata: Metadata = {
  title: 'Mashrabiya Heritage | Islamic Architectural Conservation',
  description: 'A minimalist digital archive for Mashrabiya restoration and academic research.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        {/* Archaeology Chatbot — floating button fixed at bottom-right on all pages */}
        <ChatbotRoot />
      </body>
    </html>
  );
}
