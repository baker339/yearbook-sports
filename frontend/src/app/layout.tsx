import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';
import { MediaPlayer } from '@/components/MediaPlayer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yearbook Sports - Your Sports Media Destination',
  description: 'Comprehensive sports media platform featuring articles, podcasts, and historical data for all your favorite sports, leagues, teams, and players.',
  keywords: 'sports, media, articles, podcasts, football, basketball, baseball, hockey, sports history, sports statistics',
  authors: [{ name: 'Yearbook Sports' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Yearbook Sports - Your Sports Media Destination',
    description: 'Comprehensive sports media platform featuring articles, podcasts, and historical data.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yearbook Sports - Your Sports Media Destination',
    description: 'Comprehensive sports media platform featuring articles, podcasts, and historical data.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pb-20">
              {children}
            </main>
            <MediaPlayer />
          </div>
        </Providers>
      </body>
    </html>
  );
} 