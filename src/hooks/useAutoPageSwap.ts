import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SWAP_INTERVAL_MS = 10000;
const TRANSITION_MS = 1000;

export function useAutoPageSwap(nextPath: string) {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    let navigateTimerId: number | undefined;

    const exitTimerId = window.setTimeout(() => {
      setIsVisible(false);

      navigateTimerId = window.setTimeout(() => {
        navigateRef.current(nextPath);
      }, TRANSITION_MS);
    }, SWAP_INTERVAL_MS);

    return () => {
      window.clearTimeout(exitTimerId);
      if (navigateTimerId !== undefined) {
        window.clearTimeout(navigateTimerId);
      }
    };
  }, [nextPath]);

  return {
    isVisible,
  };
}
