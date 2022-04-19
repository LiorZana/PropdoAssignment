import { useEffect, useState } from 'react';

const useOnScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const scroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', scroll);
    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, []);

  return scrollPosition;
};

export default useOnScroll;
