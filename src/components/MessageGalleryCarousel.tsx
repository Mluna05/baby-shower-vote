import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Gender } from '../types';

type GalleryMessage = {
  id: string;
  name: string;
  text: string;
  gender: Gender;
};

type MessageGalleryCarouselProps = {
  messages: GalleryMessage[];
  compact?: boolean;
  className?: string;
  intervalMs?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function getAdaptiveTextSizes(text: string, isCenter: boolean, compact: boolean) {
  const length = text.trim().length;

  const maxMobile = compact ? (isCenter ? 1.35 : 1.0) : isCenter ? 2.0 : 1.55;
  const maxDesktop = compact ? (isCenter ? 1.35 : 1.0) : isCenter ? 2.2 : 1.8;

  // Minimum is half of the current max, as requested.
  const minMobile = maxMobile * 0.5;
  const minDesktop = maxDesktop * 0.5;

  const start = compact ? (isCenter ? 10 : 8) : isCenter ? 10 : 8;
  const end = compact ? (isCenter ? 46 : 34) : isCenter ? 70 : 52;
  const ratio = clamp((length - start) / (end - start), 0, 1);

  return {
    mobile: +(maxMobile - (maxMobile - minMobile) * ratio).toFixed(3),
    desktop: +(maxDesktop - (maxDesktop - minDesktop) * ratio).toFixed(3),
  };
}

export default function MessageGalleryCarousel({
  messages,
  compact = false,
  className = '',
  intervalMs = 4200,
}: MessageGalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % messages.length);
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [messages.length, intervalMs]);

  const getMessageAtOffset = (offset: number) => {
    const length = messages.length;
    const index = (activeIndex + offset + length) % length;
    return messages[index];
  };

  const visibleItems = [-2, -1, 0, 1, 2].map((offset) => ({
    offset,
    message: getMessageAtOffset(offset),
  }));

  const settings = compact
    ? {
        container: 'w-full max-w-[330px] h-[210px]',
        bg: 'h-[120px] rounded-[80px]',
        centerSize: 'w-[132px] h-[176px]',
        nearSize: 'w-[104px] h-[148px]',
        farSize: 'w-[88px] h-[130px]',
        centerName: 'text-sm',
        sideName: 'text-xs',
        left2: 'left-[calc(50%-186px)]',
        left1: 'left-[calc(50%-104px)]',
        right1: 'left-[calc(50%+104px)]',
        right2: 'left-[calc(50%+186px)]',
      }
    : {
        container: 'w-full max-w-[1280px] h-[380px]',
        bg: 'h-[210px] rounded-[120px]',
        centerSize: 'w-[220px] h-[276px] md:w-[250px] md:h-[300px]',
        nearSize: 'w-[176px] h-[232px] md:w-[205px] md:h-[260px]',
        farSize: 'w-[150px] h-[210px] md:w-[180px] md:h-[236px]',
        centerName: 'text-xl md:text-2xl',
        sideName: 'text-base md:text-lg',
        left2: 'left-[calc(50%-409px)] md:left-[calc(50%-464px)]',
        left1: 'left-[calc(50%-222px)] md:left-[calc(50%-252px)]',
        right1: 'left-[calc(50%+222px)] md:left-[calc(50%+252px)]',
        right2: 'left-[calc(50%+409px)] md:left-[calc(50%+464px)]',
      };

  return (
    <div className={`relative ${settings.container} flex items-center justify-center overflow-hidden ${className}`}>
      <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 ${settings.bg} bg-[linear-gradient(90deg,rgba(151,177,200,0.72),rgba(236,196,181,0.72),rgba(151,177,200,0.72))] opacity-55`} />

      <div className="relative w-full h-full">
        {visibleItems.map(({ offset, message }) => {
          const isCenter = offset === 0;
          const isNear = Math.abs(offset) === 1;
          const cardLeft =
            offset === -2
              ? settings.left2
              : offset === -1
                ? settings.left1
                : offset === 1
                  ? settings.right1
                  : offset === 2
                    ? settings.right2
                    : 'left-1/2';

          const cardSize = isCenter ? settings.centerSize : isNear ? settings.nearSize : settings.farSize;
          const cardOpacity = isCenter ? 'opacity-100' : isNear ? 'opacity-60' : 'opacity-35';
          const cardScale = isCenter ? 'scale-100' : isNear ? 'scale-95' : 'scale-90';
          const cardZ = isCenter ? 'z-30' : isNear ? 'z-20' : 'z-10';
          const voteColor = message.gender === 'niña' ? 'border-b-[#d19788]' : 'border-b-[#99aec0]';
          const adaptiveTextSizes = getAdaptiveTextSizes(message.text, isCenter, compact);
          const adaptiveTextStyle = {
            '--msg-size-mobile': `${adaptiveTextSizes.mobile}rem`,
            '--msg-size-desktop': `${adaptiveTextSizes.desktop}rem`,
          } as CSSProperties;

          return (
            <div
              key={message.id}
              className={`absolute ${cardLeft} top-1/2 -translate-x-1/2 -translate-y-1/2 ${cardSize} ${cardOpacity} ${cardScale} ${cardZ} bg-[#faf8f5] border border-[#efe7dc] border-b-[10px] ${voteColor} rounded-[10px] shadow-[0_14px_30px_rgba(122,94,74,0.20)] transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden will-change-transform`}
            >
              <div className="h-full flex flex-col items-center justify-center px-3 md:px-5 text-center pb-3">
                <p
                  style={adaptiveTextStyle}
                  className="text-[#4f4134] leading-tight line-clamp-3 font-serif text-[length:var(--msg-size-mobile)] md:text-[length:var(--msg-size-desktop)]"
                >
                  {message.text}
                </p>
                <p className={`text-[#7d7062] mt-3 line-clamp-1 ${isCenter ? settings.centerName : settings.sideName} font-light tracking-[0.02em]`}>
                  {message.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
