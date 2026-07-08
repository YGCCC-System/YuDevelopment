'use client';

// Animated count-up number. Counts from 0 to `target` the first time it scrolls
// into view. Uses a requestAnimationFrame visibility poll (works reliably even on
// the scroll-jacked homepage, where scroll events and IntersectionObserver can be
// unreliable). Respects prefers-reduced-motion.
import { useEffect, useRef, useState } from 'react';

export default function CountUp({
  target,
  suffix = '',
  duration = 1600,
  className,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target);
      return;
    }
    let raf = 0;
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.85 && r.bottom > 0;
    };
    const animate = () => {
      let start: number | null = null;
      const step = (t: number) => {
        if (start === null) start = t;
        const p = Math.min(1, (t - start) / duration);
        setVal(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(step);
        else setVal(target);
      };
      raf = requestAnimationFrame(step);
    };
    const poll = () => {
      if (inView()) animate();
      else raf = requestAnimationFrame(poll);
    };
    raf = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {Math.round(val)}
      {suffix}
    </span>
  );
}
