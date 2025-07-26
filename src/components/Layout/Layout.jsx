import { Toaster } from 'react-hot-toast';
import Header from '../Header/Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            zIndex: 99999,
          },
        }}
      />
    </>
  );
}

export default Layout;
