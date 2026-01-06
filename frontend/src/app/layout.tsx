import '@/styles/globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Providers';
import AuthProviderWrapper from '@/components/AuthProviderWrapper';

export const metadata: Metadata = {
  title: 'Professional Todo Manager',
  description: 'A full-stack todo application with authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProviderWrapper>
            {children}
          </AuthProviderWrapper>
        </Providers>
      </body>
    </html>
  );
}