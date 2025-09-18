export const metadata = {
  title: 'Ruleflow Next.js Demo',
  description: 'Evaluador de DSL con @ruleflow-ts/dsl-core',
};

import './globals.css';
import type React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
