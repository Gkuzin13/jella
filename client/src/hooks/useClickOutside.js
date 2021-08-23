import { useEffect } from 'react';

const useClickOutside = (ref, state, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();

        return;
      }
    };

    if (state) {
      document.addEventListener('click', handleClick);
    }

    return () => document.removeEventListener('click', handleClick);
  }, [ref, state, callback]);
};

export default useClickOutside;
