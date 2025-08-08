// app/layout.jsx
import ClientLayout from './layout-client';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-blue-900 flex h-screen overflow-hidden">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}