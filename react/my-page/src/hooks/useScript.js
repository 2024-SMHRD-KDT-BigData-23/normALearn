// src/hooks/useScript.js
import { useState, useEffect } from 'react';

const useScript = (src) => {
  const [status, setStatus] = useState(src ? 'loading' : 'idle');

  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => setStatus('ready');
      script.onerror = () => setStatus('error');
      document.body.appendChild(script);
    } else {
      setStatus('ready');
    }

    return () => {
      if (script) {
        script.onload = null;
        script.onerror = null;
      }
    };
  }, [src]);

  return status;
};

export default useScript;
