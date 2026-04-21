'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147346.profitablecpmratenetwork.com/ed/28/ae/ed28ae9560b9542914061a32253789cd.js", "https://pl29147349.profitablecpmratenetwork.com/2e/13/fc/2e13fc2171d9fc0d342d039dd250fb2f.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
