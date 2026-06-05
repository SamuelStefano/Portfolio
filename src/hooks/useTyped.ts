import { useEffect, useState } from 'react';

export const useTyped = (str: string) => {
  const [text, setText] = useState('');
  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const type = () => {
      if (i <= str.length) { setText(str.slice(0, i++)); timer = setTimeout(type, 70); }
      else { timer = setTimeout(() => { i = 0; type(); }, 4000); }
    };
    type();
    return () => clearTimeout(timer);
  }, [str]);
  return text;
};
