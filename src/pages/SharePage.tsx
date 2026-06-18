import { QRCodeSVG } from 'qrcode.react';
import { Share2 } from 'lucide-react';
import { useState } from 'react';
import BohoLines from '../components/BohoLines';

export default function SharePage() {
  const url = window.location.origin;
  const [copied, setCopied] = useState(false);

  const showCopiedNotice = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    showCopiedNotice();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Baby Shower - Revelación',
          text: '¡Vota por tu predicción del sexo del bebé!',
          url: url
        });
        return;
      } catch {
        // If native share is unavailable/cancelled, copy as fallback.
      }
    }

    await copyLink();
  };

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

        <div className="h-[calc(100%-120px)] px-8 flex flex-col justify-center">
          {/* Title */}
          <div className="text-center mb-[10px]">
            <h2 className="mt-[20px] text-[#a89060] text-4xl tracking-wide text-center leading-tight font-serif mb-0">
              COMPARTIR
            </h2>
          </div>

          {/* QR Code Card */}
          <div className="bg-transparent rounded-2xl p-8">
            {/* QR Code */}
            <div className="w-full flex justify-center mb-6">
              <div className="bg-white p-6 rounded-[5px] shadow-[0_14px_28px_rgba(122,94,74,0.24)] inline-flex items-center justify-center">
                <QRCodeSVG
                  value={url}
                  size={200}
                  level="H"
                  includeMargin={true}
                  fgColor="#5a4a3a"
                />
              </div>
            </div>

            {/* Text */}
            <p className="text-[#5a4a3a] text-lg font-semibold text-center mb-1 tracking-wide">
              ESCANEA PARA
            </p>
            <p className="text-[#5a4a3a] text-lg font-semibold text-center mb-4 tracking-wide">
              ACCEDER AL SITIO
            </p>
            
            {/* URL */}
            <p className="text-[#8a7a6a] text-sm text-center mb-6 break-all px-4">
              {url.replace('https://', '').replace('http://', '')}
            </p>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="w-full h-[50px] box-border appearance-none inline-flex items-center justify-center gap-2 text-center bg-[#b8a060] border-2 border-[#b8a060] text-[#f5e6d8] text-xl leading-none tracking-[0.25em] uppercase font-medium hover:bg-[#a89050] hover:border-[#a89050] transition-colors shadow-lg"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm tracking-wide">COMPARTIR</span>
            </button>

            {copied && (
              <p className="text-[#a89060] text-sm font-medium text-center mt-3 tracking-wide">
                ¡Enlace copiado!
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
