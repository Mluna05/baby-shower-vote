import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBabyShower } from '../context/BabyShowerContext';
import type { Gender } from '../types';
import { Leaf, Moon } from 'lucide-react';
import BohoLines from '../components/BohoLines';

export default function VotingPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const { addVote, votingOpen } = useBabyShower();
  const navigate = useNavigate();

  const formatPersonField = (value: string) => {
    const normalized = value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('es-ES');
    if (!normalized) return '';

    return normalized
      .split(' ')
      .map((word) => word.replace(/(^|[-'])\p{L}/gu, (segment) => segment.toLocaleUpperCase('es-ES')))
      .join(' ');
  };

  const handleSubmit = () => {
    if (!name.trim() || !selectedGender) return;

    const formattedName = formatPersonField(name);
    const formattedSurname = formatPersonField(surname);
    
    addVote({
      name: formattedName,
      surname: formattedSurname,
      prediction: selectedGender,
      message: ''
    });
    
    navigate('/mensaje');
  };

  if (!votingOpen) {
    return (
      <div className="min-h-screen bg-[#f5f1ec] flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-gold mb-4">Votación Cerrada</h1>
          <p className="text-gray-600">La votación ha finalizado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1ec] flex items-center justify-center p-4">
      <div className="relative w-full max-w-[375px] h-[812px] bg-[#f7f4f0] overflow-hidden rounded-[40px] shadow-2xl flex flex-col">
        <BohoLines />

        {/* Header */}
        <div className="pt-16 pb-4 text-center">
          <h1 className="relative top-[20px] text-[#b8a89a] text-lg tracking-[0.3em] font-light uppercase">
            Baby Shower
          </h1>
        </div>

        {/* Content Container - Centered Vertically */}
        <div className="flex-1 flex flex-col justify-center px-8">
          {/* Input Section */}
          <div className="space-y-[5px] mb-16">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="TU NOMBRE"
                className="w-full h-[50px] box-border bg-[#faf8f5] border-2 border-[#e8e0d8] rounded-[5px] px-6 py-0 text-center text-[#5a4a3a] text-xl leading-[50px] tracking-[0.15em] placeholder:text-[#8a7a6a] placeholder:font-medium focus:outline-none focus:border-[#c4b49a]"
              />
            </div>

            <div>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="TU APELLIDO (OPCIONAL)"
                className="w-full h-[50px] box-border bg-[#faf8f5] border-2 border-[#e8e0d8] rounded-[5px] px-6 py-0 text-center text-[#5a4a3a] text-xl leading-[50px] tracking-[0.15em] placeholder:text-[#8a7a6a] placeholder:font-medium focus:outline-none focus:border-[#c4b49a]"
              />
            </div>
          </div>

          {/* Decorative dots Section */}
          <div className="relative h-20 mb-14">
            <div className="absolute top-2 left-[15%] w-3 h-3 rounded-full bg-[#c4846c] opacity-50" />
            <div className="absolute top-8 left-[30%] w-2.5 h-2.5 rounded-full bg-[#b8a060] opacity-60" />
            <div className="absolute top-4 left-[45%] w-2 h-2 rounded-full bg-[#d4c4b4] opacity-40" />
            <div className="absolute top-10 left-[60%] w-3 h-3 rounded-full bg-[#8a9aaa] opacity-50" />
            <div className="absolute top-3 left-[75%] w-2 h-2 rounded-full bg-[#c4846c] opacity-45" />
            <div className="absolute top-12 left-[25%] w-2 h-2 rounded-full bg-[#b8a060] opacity-50" />
            <div className="absolute top-6 left-[85%] w-2.5 h-2.5 rounded-full bg-[#8a9aaa] opacity-40" />
            <div className="absolute top-1 left-[50%] w-2 h-2 rounded-full bg-[#d4c4b4] opacity-35" />
          </div>

          {/* Voting Cards Section */}
          <div className="mb-48 mt-[30px] overflow-visible">
            <div className="flex gap-[5px] px-6 overflow-visible">
              {/* Niña Card */}
              <button
                onClick={() => setSelectedGender('niña')}
                className={`flex-1 h-[210px] ml-[10px] box-border appearance-none rounded-[22px] px-4 py-6 flex flex-col items-center justify-center gap-4 transition-all border-[6px] ${
                  selectedGender === 'niña'
                    ? 'bg-[#c98672] border-[#f3eee7] shadow-[0_6px_5px_0_rgba(0,0,0,0.47)]'
                    : 'bg-[#a89087] border-[#e1d9d1] shadow-[0_4px_5px_0_rgba(95,88,83,0.24)] hover:shadow-[0_5px_5px_0_rgba(95,88,83,0.30)]'
                }`}
              >
                <div className="flex flex-col items-center gap-4 translate-y-[21px]">
                  <Leaf size={96} className="text-[#d9c58f] stroke-[1.5]" />
                  <p className="text-[#f7f3ec] text-[40px] leading-none tracking-[0.12em] font-light">NIÑA</p>
                </div>
              </button>

              {/* Niño Card */}
              <button
                onClick={() => setSelectedGender('niño')}
                className={`flex-1 h-[210px] mr-[10px] box-border appearance-none rounded-[22px] px-4 py-6 flex flex-col items-center justify-center gap-4 transition-all border-[6px] ${
                  selectedGender === 'niño'
                    ? 'bg-[#91a5b8] border-[#f3eee7] shadow-[0_6px_5px_0_rgba(0,0,0,0.47)]'
                    : 'bg-[#7f909d] border-[#e1d9d1] shadow-[0_4px_5px_0_rgba(82,92,101,0.24)] hover:shadow-[0_5px_5px_0_rgba(82,92,101,0.30)]'
                }`}
              >
                <div className="flex flex-col items-center gap-4 translate-y-[21px]">
                  <Moon size={96} className="text-[#d9c58f] stroke-[1.5]" />
                  <p className="text-[#f7f3ec] text-[40px] leading-none tracking-[0.12em] font-light">NIÑO</p>
                </div>
              </button>
            </div>
          </div>

          {/* Button Section */}
          <div className="mt-[30px]">
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !selectedGender}
              className="w-full h-[50px] box-border flex items-center justify-center text-center bg-[#b8a060] text-[#f5e6d8] text-xl leading-none tracking-[0.25em] uppercase font-medium hover:bg-[#a89050] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              CONFIRMAR VOTO
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
