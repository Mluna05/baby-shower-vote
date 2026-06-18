import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function DevNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development
  if (import.meta.env.PROD) return null;

  const links = [
    { path: '/', label: 'Inicio' },
    { path: '/votar', label: 'Votar' },
    { path: '/mensaje', label: 'Mensaje' },
    { path: '/resultados', label: 'Resultados' },
    { path: '/revelacion', label: 'Revelación' },
    { path: '/admin', label: 'Admin' },
    { path: '/compartir', label: 'Compartir' },
    { path: '/mensajes', label: 'Mensajes' }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div className="absolute bottom-14 right-0 bg-white rounded-lg shadow-xl p-4 min-w-[200px]">
          <p className="text-xs text-gray-500 mb-2 font-semibold">DEV NAVIGATION</p>
          <div className="flex flex-col gap-1">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded hover:bg-gray-100 text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
