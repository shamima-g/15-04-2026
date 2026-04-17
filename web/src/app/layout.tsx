import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/contexts/ToastContext';
import { ToastContainer } from '@/components/toast/ToastContainer';
import { SessionProvider } from '@/components/auth/session-provider';
import { auth } from '@/lib/auth/auth';
import { MockProvider } from '@/components/MockProvider';

export const metadata: Metadata = {
  title: 'Next.js Application Template',
  description:
    'A template for building Next.js applications with external REST APIs',
};

const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const content = (
    <SessionProvider session={session}>
      <ToastProvider>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
        </div>
        <ToastContainer />
      </ToastProvider>
    </SessionProvider>
  );

  return (
    <html lang="en">
      <body className="antialiased">
        {useMockApi ? <MockProvider>{content}</MockProvider> : content}
      </body>
    </html>
  );
}
