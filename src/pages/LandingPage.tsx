import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BohoLines from '../components/BohoLines';

export default function LandingPage() {
  const navigate = useNavigate();

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

        {/* Main content */}
        <div className="flex flex-col items-center justify-center h-[calc(100%-120px)] px-8">
          <h2 className="text-[#a89060] text-4xl tracking-wide text-center leading-tight mb-2 font-serif">
            REVELACIÓN
          </h2>
          <h2 className="text-[#a89060] text-4xl tracking-wide text-center leading-tight mb-12 font-serif">
            DE SEXO
          </h2>

          <p className="text-[#5a4a3a] text-2xl tracking-wide text-center leading-tight mb-2 font-serif">
            VOTA POR TU
          </p>
          <p className="text-[#5a4a3a] text-2xl tracking-wide text-center leading-tight mb-10 font-serif">
            PREDICCIÓN
          </p>

          <button 
            onClick={() => navigate('/votar')}
            className="h-[50px] box-border appearance-none inline-flex items-center justify-center gap-2 rounded-[5px] border-2 border-[#c4846c] bg-[#c4846c] px-10 text-sm tracking-[0.2em] uppercase font-medium text-[#f5e6d8] hover:bg-[#b0735d] hover:border-[#b0735d] focus:outline-none transition-colors"
          >
            EMPEZAR A VOTAR
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
