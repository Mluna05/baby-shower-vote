import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import BohoLines from '../components/BohoLines';

export default function ThankYouPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f5f1ec] flex items-center justify-center p-4">
      <div className="relative w-full max-w-[375px] h-[812px] bg-[#f7f4f0] overflow-hidden rounded-[40px] shadow-2xl">
        <BohoLines />

        {/* Header */}
        <div className="pt-16 pb-4 text-center">
          <h1 className="relative top-[20px] text-[#b8a89a] text-lg tracking-[0.3em] font-light uppercase">
            Baby Shower
          </h1>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-120px)] flex items-center justify-center">
          <div className="text-center relative z-10 px-8">
          <div className="w-24 h-24 bg-[#b8a060] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Check className="w-12 h-12 text-[#f5e6d8]" strokeWidth={3} />
          </div>
          <h1 className="font-serif text-5xl text-[#a89060] mb-4 tracking-wider">¡Gracias!</h1>
          <p className="text-[#5a4a3a] text-xl mb-2">Tu predicción fue</p>
          <p className="text-[#5a4a3a] text-xl mb-8">registrada</p>
          
          {/* Decorative dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#c4b49a] opacity-40"
                style={{
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
        </div>

      </div>
    </div>
  );
}
