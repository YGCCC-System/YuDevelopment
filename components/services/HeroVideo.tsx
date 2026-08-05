'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

interface HeroVideoProps {
  /* Left undefined for now, pass a real mp4/embed URL once the video is in hand. */
  videoUrl?: string;
  posterSrc?: string;
}

/*
  The video leads, not a pain-point headline: a real track record establishes
  trust faster than "here's your problem" copy does.
*/
export default function HeroVideo({ videoUrl, posterSrc = '/media/svc-design-drafting.jpg' }: HeroVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="svc-hero-video">
      <div className="svc-wrap svc-center">
        <h1 className="svc-hero-header">Never turn down projects you don’t have capacity for.</h1>
        <p className="svc-hero-subhead">We take on the work that takes up 80% of your time but only results in 20% of the pay.</p>

        <div className="svc-video-frame">
          {videoUrl && playing ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video src={videoUrl} controls autoPlay className="svc-video-el" />
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={posterSrc} alt="Yu Development project walkthrough" className="svc-video-poster" />
              <div className="svc-video-overlay" />
              <button
                type="button"
                aria-label={videoUrl ? 'Play video' : 'Video coming soon'}
                disabled={!videoUrl}
                onClick={() => videoUrl && setPlaying(true)}
                className="svc-video-play"
              >
                <span className="svc-play-circle">
                  <Play size={30} style={{ marginLeft: 3 }} fill="currentColor" />
                </span>
                {!videoUrl && <span className="svc-video-badge">Video coming soon</span>}
              </button>
            </>
          )}
        </div>

        <a href="#schedule" className="svc-btn svc-btn-light">
          Schedule a call <span aria-hidden="true">→</span>
        </a>
      </div>

      <style>{`
        .svc-hero-video{ background:#0E1626; padding:96px 0 56px; }
        .svc-center{ text-align:center; }
        .svc-hero-header{ margin:0 auto; max-width:780px; font-family:var(--serif,'Newsreader',Georgia,serif); font-weight:700;
          font-size:clamp(30px,4.4vw,48px); line-height:1.1; letter-spacing:-0.015em; color:#fff; }
        .svc-hero-subhead{ margin:16px auto 0; max-width:560px; font-family:var(--sans); font-size:clamp(15px,1.4vw,18px);
          line-height:1.5; color:rgba(247,248,250,.78); }
        .svc-video-frame{ position:relative; margin:36px auto 0; max-width:960px; aspect-ratio:16/9; width:100%; overflow:hidden;
          border-radius:6px; border:1px solid rgba(255,255,255,.14); box-shadow:0 28px 70px -30px rgba(0,0,0,.65); }
        .svc-video-poster{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:.78; }
        .svc-video-el{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .svc-video-overlay{ position:absolute; inset:0; background:rgba(0,0,0,.28); }
        .svc-video-play{ position:absolute; inset:0; display:flex; flex-direction:column; align-items:center;
          justify-content:center; gap:14px; background:none; border:none; cursor:pointer; }
        .svc-video-play:disabled{ cursor:default; }
        .svc-play-circle{ display:flex; align-items:center; justify-content:center; width:84px; height:84px;
          border-radius:999px; background:rgba(255,255,255,.94); color:var(--ink); box-shadow:0 14px 34px rgba(0,0,0,.35);
          transition:transform .2s ease; }
        .svc-video-play:hover .svc-play-circle{ transform:scale(1.05); }
        .svc-video-badge{ padding:6px 16px; border-radius:999px; background:rgba(0,0,0,.6); color:#fff;
          font-family:var(--sans); font-size:14px; font-weight:500; }
        .svc-btn{ display:inline-flex; align-items:center; gap:8px; margin-top:32px; padding:15px 30px;
          border-radius:999px; font-family:var(--sans); font-weight:600; font-size:16px; text-decoration:none;
          transition:transform .2s ease, background .2s ease; }
        .svc-btn-light{ background:#fff; color:var(--ink); }
        .svc-btn-light:hover{ transform:translateY(-1px); background:#F1EFE8; }
      `}</style>
    </section>
  );
}
