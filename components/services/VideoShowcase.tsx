'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoShowcaseProps {
  /* Left undefined for now, pass a real mp4/embed URL once the video is in hand. */
  videoUrl?: string;
  posterSrc?: string;
}

export default function VideoShowcase({
  videoUrl,
  posterSrc = '/media/svc-design-drafting.jpg',
}: VideoShowcaseProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="svc-video-section">
      <div className="svc-wrap">
        <h2 className="svc-h2">See how we work</h2>
        <p className="svc-lede">A quick look at how a set moves through our team, from intake to a stamped, submittal-ready package.</p>

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
                  <Play size={28} style={{ marginLeft: 3 }} fill="currentColor" />
                </span>
                {!videoUrl && <span className="svc-video-badge">Video coming soon</span>}
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        .svc-video-section{ background:#0E1626; padding:clamp(48px,6vw,72px) 0; }
        .svc-video-section .svc-h2{ color:#fff; }
        .svc-video-section .svc-lede{ color:rgba(247,248,250,.72); }
        .svc-video-frame{ position:relative; margin-top:32px; aspect-ratio:16/9; width:100%; overflow:hidden;
          border-radius:4px; border:1px solid rgba(255,255,255,.12); box-shadow:0 24px 60px -30px rgba(0,0,0,.6); }
        .svc-video-poster{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:.78; }
        .svc-video-el{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .svc-video-overlay{ position:absolute; inset:0; background:rgba(0,0,0,.28); }
        .svc-video-play{ position:absolute; inset:0; display:flex; flex-direction:column; align-items:center;
          justify-content:center; gap:14px; background:none; border:none; cursor:pointer; }
        .svc-video-play:disabled{ cursor:default; }
        .svc-play-circle{ display:flex; align-items:center; justify-content:center; width:76px; height:76px;
          border-radius:999px; background:rgba(255,255,255,.92); color:var(--ink); box-shadow:0 12px 30px rgba(0,0,0,.35);
          transition:transform .2s ease; }
        .svc-video-play:hover .svc-play-circle{ transform:scale(1.05); }
        .svc-video-badge{ padding:6px 16px; border-radius:999px; background:rgba(0,0,0,.6); color:#fff;
          font-family:var(--sans); font-size:14px; font-weight:500; }
      `}</style>
    </section>
  );
}
