import { useEffect } from 'react';

const EVENTS = ['mousedown', 'touchstart'];

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      const element = event?.target;

      if (ref.current && !ref.current.contains(element)) {
        handler();
      }
    };

    if (ref.current) {
      EVENTS.forEach((fn) => document.addEventListener(fn, listener));
    }

    return () => {
      EVENTS.forEach((fn) => document.removeEventListener(fn, listener));
    };
  }, [ref.current, handler]);
};

export default useClickOutside;
