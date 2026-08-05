'use client';

// Loads Microsoft Clarity only after the visitor has accepted analytics
// cookies via CookieConsent (localStorage key below, 'cookie-consent' event
// on later opt-in), matching the consent categories that banner already offers.
import { useEffect } from 'react';

const CLARITY_PROJECT_ID = 'xxr3hy2kyz';
const STORAGE_KEY = 'yu-cookie-consent';

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

function loadClarity() {
  if (window.clarity) return;
  (function (c: Window, l: Document, a: string, r: string, i: string) {
    const w = c as Window & Record<string, unknown>;
    w[a] = w[a] || function (...args: unknown[]) {
      ((w[a] as { q?: unknown[] }).q = (w[a] as { q?: unknown[] }).q || []).push(args);
    };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = 'https://www.clarity.ms/tag/' + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);
}

export default function ClarityAnalytics() {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && JSON.parse(raw)?.analytics) loadClarity();
    } catch {
      /* ignore */
    }

    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<{ analytics?: boolean }>).detail;
      if (detail?.analytics) loadClarity();
    };
    window.addEventListener('cookie-consent', onConsent);
    return () => window.removeEventListener('cookie-consent', onConsent);
  }, []);

  return null;
}
