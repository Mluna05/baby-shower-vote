import { useBabyShower } from '../context/BabyShowerContext';
import { 
  Lock, 
  LockOpen, 
  RotateCcw, 
  Download, 
  Trophy,
  Edit,
  Trash2,
  Moon,
  Leaf
} from 'lucide-react';
import BohoLines from '../components/BohoLines';

export default function AdminPage() {
  const {
    votes,
    votingOpen,
    revealed,
    revealedGender,
    closeVoting,
    openVoting,
    resetVoting,
    revealGender,
    exportVotes,
    exportWinners,
    editVote,
    deleteVote
  } = useBabyShower();

  const handleEdit = (voteId: string) => {
    const vote = votes.find(v => v.id === voteId);
    if (!vote) return;

    const newMessage = prompt('Editar mensaje:', vote.message);
    if (newMessage !== null) {
      editVote(voteId, { message: newMessage });
    }
  };

  const handleDelete = (voteId: string) => {
    if (confirm('¿Eliminar este voto?')) {
      deleteVote(voteId);
    }
  };

  const handleReset = () => {
    if (confirm('¿Estás seguro? Esto eliminará todos los votos y reiniciará la aplicación.')) {
      resetVoting();
    }
  };

  const buttonBase = 'box-border appearance-none inline-flex items-center justify-center rounded-[5px] border-2 transition-colors focus:outline-none';

  return (
    <div className="min-h-screen bg-[#f5f1ec] p-4 md:p-8 relative overflow-hidden">
      <BohoLines />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Decorative header */}
        <div className="text-center mb-8">
          <h1 className="relative top-[20px] text-[#b8a89a] text-lg tracking-[0.3em] font-light uppercase mb-2">
            Baby Shower
          </h1>
          <h2 className="font-serif text-4xl md:text-5xl text-[#a89060] tracking-wider">
            PANEL DEL ENCARGADO
          </h2>
        </div>

        {/* Reveal buttons - highlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => revealGender('niño')}
            disabled={revealed}
            className={`${buttonBase} h-[76.8px] w-full gap-3 border-[#b8a060] bg-[#8a9aaa] px-8 font-semibold text-white shadow-lg hover:bg-[#7a8a9a] disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Moon className="w-6 h-6" />
            <span className="text-lg tracking-wide">REVELAR NIÑO</span>
          </button>

          <button
            onClick={() => revealGender('niña')}
            disabled={revealed}
            className={`${buttonBase} h-[76.8px] w-full gap-3 border-[#b8a060] bg-[#c4846c] px-8 font-semibold text-white shadow-lg hover:bg-[#b0735d] disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Leaf className="w-6 h-6" />
            <span className="text-lg tracking-wide">REVELAR NIÑA</span>
          </button>
        </div>

        {/* Control buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <button
            onClick={votingOpen ? closeVoting : openVoting}
            className={`${buttonBase} h-[50px] w-full gap-2 border-[#c4b49a] bg-[#faf8f5] px-4 font-semibold text-[#5a4a3a] hover:bg-[#f0ede8]`}
          >
            {votingOpen ? <Lock className="w-4 h-4" /> : <LockOpen className="w-4 h-4" />}
            <span className="text-sm">{votingOpen ? 'Cerrar' : 'Reabrir'}</span>
          </button>

          <button
            onClick={handleReset}
            className={`${buttonBase} h-[50px] w-full gap-2 border-red-300 bg-red-50 px-4 font-semibold text-red-700 hover:bg-red-100`}
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Reiniciar</span>
          </button>

          <button
            onClick={exportVotes}
            className={`${buttonBase} h-[50px] w-full gap-2 border-[#b8a060] bg-[#b8a060] px-4 font-semibold text-white hover:bg-[#a89050]`}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Votos</span>
          </button>

          <button
            onClick={exportWinners}
            disabled={!revealed}
            className={`${buttonBase} h-[50px] w-full gap-2 border-green-300 bg-green-50 px-4 font-semibold text-green-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Ganadores</span>
          </button>
        </div>

        {/* Status indicator */}
        <div className="bg-[#faf8f5] rounded-2xl p-6 mb-6 shadow-lg border border-[#e8e0d8]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-[#8a7a6a] mb-1 uppercase tracking-wide">Estado de votación</p>
              <p className="font-semibold text-xl text-[#5a4a3a]">
                {votingOpen ? '🟢 Abierta' : '🔴 Cerrada'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#8a7a6a] mb-1 uppercase tracking-wide">Total de votos</p>
              <p className="font-serif text-3xl text-[#a89060]">{votes.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#8a7a6a] mb-1 uppercase tracking-wide">Revelado</p>
              <p className="font-semibold text-xl text-[#5a4a3a]">
                {revealed ? `✅ ${revealedGender?.toUpperCase()}` : '❌ No'}
              </p>
            </div>
          </div>
        </div>

        {/* Votes table */}
        <div className="bg-[#faf8f5] rounded-2xl overflow-hidden shadow-lg border border-[#e8e0d8]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f0ede8]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#5a4a3a] uppercase tracking-wide">Nombre</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#5a4a3a] uppercase tracking-wide">Apellido</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#5a4a3a] uppercase tracking-wide">Predicción</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#5a4a3a] uppercase tracking-wide">Mensaje</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#5a4a3a] uppercase tracking-wide">Fecha/hora</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#5a4a3a] uppercase tracking-wide">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e0d8]">
                {votes.map((vote) => (
                  <tr key={vote.id} className="hover:bg-[#f5f1ec] transition-colors">
                    <td className="px-4 py-3 text-[#5a4a3a] font-medium">{vote.name}</td>
                    <td className="px-4 py-3 text-[#5a4a3a]">{vote.surname || '-'}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-medium"
                        style={{ backgroundColor: vote.prediction === 'niña' ? '#c4846c' : '#8a9aaa' }}
                      >
                        {vote.prediction === 'niña' ? <Leaf className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        {vote.prediction.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate text-[#5a4a3a]">{vote.message || '-'}</td>
                    <td className="px-4 py-3 text-sm text-[#8a7a6a]">
                      {new Date(vote.timestamp).toLocaleString('es-ES')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(vote.id)}
                          className="text-[#8a9aaa] hover:text-[#7a8a9a] transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(vote.id)}
                          className="text-[#c4846c] hover:text-[#b0735d] transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {votes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-[#8a7a6a] font-serif">No hay votos registrados</p>
          </div>
        )}
      </div>
    </div>
  );
}
