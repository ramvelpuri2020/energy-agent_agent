import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import '@solana/wallet-adapter-react-ui/styles.css'; // Import wallet adapter UI styles
import { WalletContext } from './components/WalletContext';

createRoot(document.getElementById("root")!).render(
  <WalletContext>
    <App />
  </WalletContext>
);