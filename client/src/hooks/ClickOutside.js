import { useEffect } from 'react';

const ClickOutside = (ref, state, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current) {
        return;
      }
      if (!ref.current.contains(e.target)) {
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

export default ClickOutside;
