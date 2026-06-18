import { useEffect, useMemo, useState } from 'react';
import { useBabyShower } from '../context/BabyShowerContext';
import BohoLines from '../components/BohoLines';
import { useAutoPageSwap } from '../hooks/useAutoPageSwap';

export default function LiveResultsPage() {
  const { votes } = useBabyShower();
  const { isVisible } = useAutoPageSwap('/mensajes');

  const targetStats = useMemo(() => {
    const niñaVotes = votes.filter(v => v.prediction === 'niña').length;
    const niñoVotes = votes.filter(v => v.prediction === 'niño').length;

    return {
      niña: niñaVotes,
      niño: niñoVotes,
    };
  }, [votes]);

  const [displayStats, setDisplayStats] = useState(targetStats);

  useEffect(() => {
    const id = window.setInterval(() => {
      setDisplayStats((current) => {
        const stepToTarget = (value: number, target: number) => {
          if (value === target) return value;
          const delta = Math.max(1, Math.round(Math.abs(target - value) * 0.28));
          return value + Math.sign(target - value) * delta;
        };

        const nextNiña = stepToTarget(current.niña, targetStats.niña);
        const nextNiño = stepToTarget(current.niño, targetStats.niño);

        if (nextNiña === current.niña && nextNiño === current.niño) {
          return current;
        }

        return {
          niña: nextNiña,
          niño: nextNiño,
        };
      });
    }, 120);

    return () => window.clearInterval(id);
  }, [targetStats.niña, targetStats.niño]);

  const barCount = 16;
  const total = displayStats.niña + displayStats.niño;
  const niñaPercentLabel = total > 0 ? Math.round((displayStats.niña / total) * 100) : 0;
  const niñoPercentLabel = total > 0 ? Math.round((displayStats.niño / total) * 100) : 0;
  const niñaFilledBars = total > 0 ? Math.round((displayStats.niña / total) * barCount) : 0;
  const niñoFilledBars = total > 0 ? Math.round((displayStats.niño / total) * barCount) : 0;

  const GIRL_ACTIVE = '#d8a094';
  const GIRL_INACTIVE = '#efd8d1';
  const BOY_ACTIVE = '#8ea3b7';
  const BOY_INACTIVE = '#dbe5ee';

  return (
    <div
      className={`min-h-screen bg-[#f5f1ec] flex items-center justify-center p-4 relative overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 blur-0'
          : 'opacity-0 translate-y-4 scale-[0.985] blur-[2px]'
      }`}
    >
      <BohoLines />

      <div className="relative w-full max-w-[1040px] h-[560px] bg-[#f8f6f2] overflow-hidden rounded-lg shadow-2xl z-10">
        <div className="absolute top-0 left-0 w-72 h-72 opacity-60 pointer-events-none">
          <svg viewBox="0 0 260 260" className="w-full h-full">
            <path d="M0 150 Q60 20 180 40 T260 0" fill="none" stroke="#c8b79b" strokeWidth="1.4" />
            <path d="M0 180 Q70 50 190 70 T260 25" fill="none" stroke="#c8b79b" strokeWidth="1" />
          </svg>
        </div>

        <div className="absolute top-0 right-0 w-72 h-72 opacity-60 pointer-events-none">
          <svg viewBox="0 0 260 260" className="w-full h-full">
            <path d="M260 140 Q200 20 80 30 T0 0" fill="none" stroke="#c8b79b" strokeWidth="1.4" />
            <path d="M260 175 Q190 45 70 60 T0 15" fill="none" stroke="#c8b79b" strokeWidth="1" />
          </svg>
        </div>

        <div className="absolute bottom-10 right-16 grid grid-cols-4 gap-3 opacity-55 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`spark-${i}`}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: '#d8c49c',
                opacity: i % 3 === 0 ? 0.95 : i % 2 === 0 ? 0.65 : 0.45,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-10 md:px-14">
          <div className="grid grid-cols-[1fr_auto_1fr] items-start w-full max-w-[880px]">
            <div className="text-center">
              <h2 className="text-[#bfa89f] text-[44px] tracking-[0.08em] font-serif uppercase leading-none">
                TEAM NIÑA
              </h2>
            </div>
            <div className="w-[3px] h-20 bg-[#c7ac67] mx-8 opacity-90 rounded-full" />
            <div className="text-center">
              <h2 className="text-[#4b4642] text-[44px] tracking-[0.08em] font-serif uppercase leading-none">
                TEAM NIÑO
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full max-w-[880px] mt-2">
            <div className="text-center">
              <p className="text-[#b39a5d] text-[104px] font-serif leading-[0.9] tabular-nums transition-all duration-300">
                {displayStats.niña}
              </p>
            </div>
            <div className="w-[4px] h-32 bg-[#c7ac67] mx-8 opacity-95 rounded-full shadow-[0_0_18px_rgba(199,172,103,0.35)]" />
            <div className="text-center">
              <p className="text-[#3f4349] text-[104px] font-serif leading-[0.9] tabular-nums transition-all duration-300">
                {displayStats.niño}
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-[920px] mt-4">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[128px] bg-[#c7ac67] rounded-full shadow-[0_0_18px_rgba(199,172,103,0.35)]" />

            <div className="flex w-full items-center">
              <div className="flex-1 flex justify-end gap-2 pr-4">
                {Array.from({ length: barCount }).map((_, i) => (
                  <div
                    key={`girl-${i}`}
                    className="w-5 md:w-6 h-[60px] rounded-[8px] transition-all duration-500"
                    style={{
                      // Girl bars fill from the center divider to the left side.
                      backgroundColor: i >= barCount - niñaFilledBars ? GIRL_ACTIVE : GIRL_INACTIVE,
                      opacity: i >= barCount - niñaFilledBars ? 1 : 0.55,
                    }}
                  />
                ))}
              </div>

              <div className="flex-1 flex justify-start gap-2 pl-4">
                {Array.from({ length: barCount }).map((_, i) => (
                  <div
                    key={`boy-${i}`}
                    className="w-5 md:w-6 h-[60px] rounded-[8px] transition-all duration-500"
                    style={{
                      backgroundColor: i < niñoFilledBars ? BOY_ACTIVE : BOY_INACTIVE,
                      opacity: i < niñoFilledBars ? 1 : 0.55,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 px-2">
              <div className="h-[10px] w-full rounded-full bg-[#ece6dc] overflow-hidden border border-[#e2d8ca]">
                <div className="flex h-full w-full">
                  <div
                    className="h-full transition-all duration-500"
                    style={{ width: `${niñaPercentLabel}%`, backgroundColor: GIRL_ACTIVE }}
                  />
                  <div
                    className="h-full transition-all duration-500"
                    style={{ width: `${niñoPercentLabel}%`, backgroundColor: BOY_ACTIVE }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 px-2">
              <p className="text-[#c08d84] text-[22px] font-semibold tracking-[0.08em] tabular-nums">
                {niñaPercentLabel}%
              </p>
              <p className="text-[#667b93] text-[22px] font-semibold tracking-[0.08em] tabular-nums">
                {niñoPercentLabel}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
