import { useMemo } from 'react';
import { useBabyShower } from '../context/BabyShowerContext';
import BohoLines from '../components/BohoLines';
import MessageGalleryCarousel from '../components/MessageGalleryCarousel';
import { useAutoPageSwap } from '../hooks/useAutoPageSwap';

export default function MessagesDisplayPage() {
  const { messages } = useBabyShower();
  const { isVisible } = useAutoPageSwap('/resultados');

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
              name: 'Ana y Luis',
              text: '¡Felicidades Ana y Luis!',
              gender: 'niña' as const,
            },
            {
              id: 'sample-2',
              name: 'Familia Pérez',
              text: 'Que emoción saber si es...',
              gender: 'niño' as const,
            },
            {
              id: 'sample-3',
              name: 'Mario',
              text: 'Mis mejores deseos para ustedes.',
              gender: 'niña' as const,
            },
            {
              id: 'sample-4',
              name: 'Katy',
              text: 'Será un momento inolvidable.',
              gender: 'niño' as const,
            },
            {
              id: 'sample-5',
              name: 'Invitado',
              text: '¡Qué bonita celebración!',
              gender: 'niña' as const,
            },
          ],
    [messages]
  );

  return (
    <div
      className={`min-h-screen bg-[#f5f1ec] p-8 relative overflow-hidden flex items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 blur-0'
          : 'opacity-0 translate-y-4 scale-[0.985] blur-[2px]'
      }`}
    >
      <BohoLines />

      <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        <h1 className="w-full font-serif text-5xl md:text-6xl text-[#a89060] text-center mb-12 tracking-wider">
          NUESTROS MOMENTOS
        </h1>

        <MessageGalleryCarousel messages={displayMessages} />
      </div>
    </div>
  );
}
