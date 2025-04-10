import Navbar from '@/components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactNode } from 'react';

export const metadata = {
  title: "DogSpot - Rede Social para Cachorros",
  description: "Compartilhe as fofuras do seu doguinho",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ backgroundColor: '#121629', color: '#ffffff', minHeight: '100vh' }}>
        <Navbar />
        <main className="container mt-4">{children}</main>
      </body>
    </html>
  )
}
