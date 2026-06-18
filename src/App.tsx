import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BabyShowerProvider } from './context/BabyShowerContext';
import DevNav from './components/DevNav';
import LandingPage from './pages/LandingPage';
import VotingPage from './pages/VotingPage';
import MessagePage from './pages/MessagePage';
import ThankYouPage from './pages/ThankYouPage';
import LiveResultsPage from './pages/LiveResultsPage';
import RevealPage from './pages/RevealPage';
import AdminPage from './pages/AdminPage';
import SharePage from './pages/SharePage';
import MessagesDisplayPage from './pages/MessagesDisplayPage';

function App() {
  return (
    <BabyShowerProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <DevNav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/votar" element={<VotingPage />} />
          <Route path="/mensaje" element={<MessagePage />} />
          <Route path="/gracias" element={<ThankYouPage />} />
          <Route path="/resultados" element={<LiveResultsPage />} />
          <Route path="/revelacion" element={<RevealPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/compartir" element={<SharePage />} />
          <Route path="/mensajes" element={<MessagesDisplayPage />} />
        </Routes>
      </BrowserRouter>
    </BabyShowerProvider>
  );
}

export default App;
