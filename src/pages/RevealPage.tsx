import { useMemo } from 'react';
import { useBabyShower } from '../context/BabyShowerContext';
import { Leaf, Moon, Sparkles } from 'lucide-react';
import BohoLines from '../components/BohoLines';

export default function RevealPage() {
  const { votes, revealed, revealedGender } = useBabyShower();

  const winners = useMemo(() => {
    if (!revealed || !revealedGender) return [];
    return votes.filter(v => v.prediction === revealedGender);
  }, [votes, revealed, revealedGender]);

  const totalVotes = useMemo(() => {
    if (!revealed || !revealedGender) return 0;
    return votes.filter(v => v.prediction === revealedGender).length;
  }, [votes, revealed, revealedGender]);

  if (!revealed || !revealedGender) {
    return (
      <div className="min-h-screen bg-[#f5f1ec] flex items-center justify-center relative overflow-hidden">
        <BohoLines />

        <div className="text-center relative z-10">
          <h1 className="font-serif text-4xl text-[#a89060] mb-4 tracking-wider">Esperando revelación...</h1>
          <div className="w-20 h-20 border-4 border-[#b8a060] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  const isGirl = revealedGender === 'niña';
  const color = isGirl ? '#c4846c' : '#8a9aaa';
  const bgColor = isGirl ? '#f7e8e4' : '#e8eef4';
  const Icon = isGirl ? Leaf : Moon;

  return (
    <div className="min-h-screen bg-[#f5f1ec] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <BohoLines />

      {/* Confetti animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full animate-confetti"
            style={{
              background: i % 3 === 0 ? color : i % 3 === 1 ? '#b8a060' : '#c4a35a',
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl w-full relative z-10">
        <div className="text-center mb-16">
          <h1 
            className="font-serif text-6xl md:text-9xl mb-8 animate-bounce-slow tracking-wider uppercase"
            style={{ color }}
          >
            ¡Es un{isGirl ? 'a' : ''} {revealedGender}!
          </h1>
          
          <div 
            className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full flex items-center justify-center mb-10 shadow-2xl border-4"
            style={{ 
              backgroundColor: color,
              borderColor: '#b8a060'
            }}
          >
            <Icon className="w-16 h-16 md:w-20 md:h-20 text-[#f5e6d8]" strokeWidth={2} />
          </div>

          <div className="space-y-4">
            <div className="text-7xl md:text-9xl font-bold font-serif" style={{ color }}>
              {totalVotes}
            </div>
            <p className="text-2xl md:text-4xl font-serif tracking-wider uppercase text-[#5a4a3a]">
              Ganadores del Team {revealedGender}
            </p>
          </div>
        </div>

        {/* Winners carousel/grid */}
        {winners.length > 0 && (
          <div className="bg-[#faf8f5] backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-[#c4b49a]/30">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {winners.map((winner) => (
                <div
                  key={winner.id}
                  className="rounded-2xl p-4 md:p-5 text-center transform hover:scale-105 transition-all relative group shadow-lg"
                  style={{ 
                    backgroundColor: bgColor,
                    borderColor: color,
                    borderWidth: '2px'
                  }}
                >
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#b8a060] flex items-center justify-center shadow-md">
                    <Sparkles className="w-4 h-4 text-[#f5e6d8]" />
                  </div>
                  <p className="font-bold text-base md:text-lg mb-1 text-[#5a4a3a]">{winner.name}</p>
                  {winner.surname && (
                    <p className="text-sm text-[#8a7a6a]">{winner.surname}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {winners.length === 0 && (
          <div className="text-center bg-[#faf8f5] rounded-3xl p-12 shadow-lg">
            <p className="text-2xl text-[#8a7a6a] font-serif">Aún no hay ganadores</p>
          </div>
        )}
      </div>
    </div>
  );
}
