import './globals.css';
import MuiProvider from '@/components/MuiProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'whatByte',
  description: 'Next.js project with Material UI and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MuiProvider>
          <ToastContainer position='top-center' />
          {children}
        </MuiProvider>
      </body>
    </html>
  );
}
