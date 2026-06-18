export default function BohoLines() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-48 pointer-events-none">
        <svg viewBox="0 0 375 200" className="w-full h-full opacity-30">
          <path d="M0 50 Q100 20 200 60 T375 40" stroke="#c4b49a" strokeWidth="1" fill="none" />
          <path d="M0 80 Q150 40 250 90 T375 70" stroke="#c4b49a" strokeWidth="1" fill="none" />
          <path d="M50 0 Q80 80 30 150" stroke="#c4b49a" strokeWidth="1" fill="none" />
          <path d="M300 0 Q320 60 280 120" stroke="#c4b49a" strokeWidth="1" fill="none" />
          <path d="M350 20 Q340 80 360 140" stroke="#c4b49a" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-full h-48 pointer-events-none">
        <svg viewBox="0 0 375 200" className="w-full h-full opacity-30">
          <path d="M0 150 Q100 120 200 160 T375 140" stroke="#c4b49a" strokeWidth="1" fill="none" />
          <path d="M50 180 Q150 140 250 190 T375 170" stroke="#c4b49a" strokeWidth="1" fill="none" />
          <path d="M100 200 Q120 140 80 100" stroke="#c4b49a" strokeWidth="1" fill="none" />
          <path d="M300 200 Q280 160 320 120" stroke="#c4b49a" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </>
  );
}
