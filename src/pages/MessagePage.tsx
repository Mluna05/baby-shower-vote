import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBabyShower } from '../context/BabyShowerContext';
import { ArrowRight } from 'lucide-react';
import BohoLines from '../components/BohoLines';
import MessageGalleryCarousel from '../components/MessageGalleryCarousel';

export default function MessagePage() {
  const [message, setMessage] = useState('');
  const { votes, messages, addMessage } = useBabyShower();
  const navigate = useNavigate();
  const MAX_WORDS = 30;
  
  const lastVote = votes[votes.length - 1];

  const getWordCount = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const wordCount = getWordCount(message);
  const exceedsWordLimit = wordCount > MAX_WORDS;

  const handleSubmit = () => {
    if (!message.trim() || !lastVote || exceedsWordLimit) return;

    // Add to messages
    addMessage({
      name: lastVote.name,
      text: message.trim(),
      gender: lastVote.prediction
    });

    navigate('/gracias');
  };

  const handleSkip = () => {
    navigate('/gracias');
  };

  const displayMessages = useMemo(
    () =>
      messages.length > 0
        ? messages.map((m) => ({
            id: m.id,
            name: m.name,
            text: m.text,
            gender: m.gender,
          }))
        : [
            {
              id: 'sample-1',
              name: 'Familia',
              text: '¡Felicidades familia!',
              gender: 'niña' as const,
            },
            {
              id: 'sample-2',
              name: 'Invitado',
              text: 'Que emoción saber si es...',
              gender: 'niño' as const,
            },
            {
              id: 'sample-3',
              name: 'Invitado',
              text: 'Que emoción saber si es...',
              gender: 'niña' as const,
            },
            {
              id: 'sample-4',
              name: 'Mario',
              text: 'Mis mejores deseos para el bebé.',
              gender: 'niño' as const,
            },
            {
              id: 'sample-5',
              name: 'Ana',
              text: 'Un abrazo enorme para ustedes.',
              gender: 'niña' as const,
            },
          ],
    [messages]
  );

  return (
    <div className="min-h-screen bg-[#f5f1ec] flex items-center justify-center p-4">
      <div className="relative w-full max-w-[375px] h-[812px] bg-[#f7f4f0] overflow-hidden rounded-[40px] shadow-2xl">
        <BohoLines />

        {/* Header */}
        <div className="pt-16 text-center">
          <h1 className="relative top-[20px] text-[#b8a89a] text-lg tracking-[0.3em] font-light uppercase">
            Baby Shower
          </h1>
        </div>

        {/* Subtitle Wrapper */}
        <div style={{ marginTop: '60px' }} className="mx-8 border-[15px] border-[#eee8e0] rounded-[12px]">
          <div className="text-center">
            <h2 className="text-[#a89060] text-4xl tracking-wide text-center leading-tight font-serif">
              MURO DE
            </h2>
            <h2 className="text-[#a89060] text-4xl tracking-wide text-center leading-tight font-serif">
              MENSAJES
            </h2>
          </div>
        </div>

        {/* Cards Carousel */}
        <div className="mt-[28px] flex justify-center">
          <MessageGalleryCarousel messages={displayMessages} compact />
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-6">
          <div className="w-2.5 h-2.5 rounded-full bg-[#c4846c] opacity-50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#c4846c]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#8a9aaa] opacity-50" />
        </div>

        {/* Message Input */}
        <div className="px-8 mt-[94px]">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="DEJA TU MENSAJE..."
              className={`flex-1 h-[50px] box-border bg-[#faf8f5] border-2 rounded-[5px] px-6 py-0 text-center text-[#5a4a3a] text-xl leading-[50px] tracking-[0.15em] placeholder:text-[#8a7a6a] placeholder:font-medium focus:outline-none ${
                exceedsWordLimit
                  ? 'border-[#c47f76] focus:border-[#c47f76]'
                  : 'border-[#e8e0d8] focus:border-[#c4b49a]'
              }`}
            />
            <button
              onClick={handleSubmit}
              disabled={!message.trim() || exceedsWordLimit}
              className="h-[50px] w-[50px] box-border flex items-center justify-center border-2 border-[#e8e0d8] rounded-[5px] bg-[#faf8f5] text-[#c4846c] hover:text-[#b0735d] hover:border-[#c4b49a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Enviar mensaje"
            >
              <ArrowRight className="w-7 h-7" />
            </button>
          </div>
          <p className={`mt-2 text-center text-xs tracking-[0.06em] ${exceedsWordLimit ? 'text-[#b35c52]' : 'text-[#8a7a6a]'}`}>
            {wordCount}/{MAX_WORDS} palabras
            {exceedsWordLimit ? ' - maximo permitido 30' : ''}
          </p>
        </div>

        {/* Skip Message */}
        <div className="px-8 mt-4 text-center">
          <button
            onClick={handleSkip}
            className="h-[50px] w-[102px] translate-y-[20px] box-border inline-flex items-center justify-center border-2 border-[#e8e0d8] rounded-[5px] bg-[#faf8f5] text-[#c4846c] text-sm tracking-[0.08em] uppercase hover:text-[#b0735d] hover:border-[#c4b49a] transition-colors"
          >
            Skip
          </button>
        </div>

      </div>
    </div>
  );
}
