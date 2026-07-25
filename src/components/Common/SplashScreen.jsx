import { useEffect, useRef, useState } from "react";

const lines = [
  { text: "> Initializing AI workspace...", delay: 0 },
  { text: "> Loading models", delay: 400, hasProgress: true },
  { text: "> Connecting data pipelines...", delay: 1100 },
  { text: "> Jaydip Pithava — AI & Data Science Developer", delay: 1500, highlight: true },
  { text: "> Ready.", delay: 1900, ready: true },
];

function SplashScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const timeouts = [];

    lines.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, lines[i].delay);
      timeouts.push(t);
    });

    // Progress bar
    const progressStart = setTimeout(() => {
      let p = 0;
      const interval = setInterval(() => {
        p += 16;
        if (p > 100) p = 100;
        setProgress(p);
        if (p >= 100) clearInterval(interval);
      }, 40);
    }, 450);
    timeouts.push(progressStart);

    // Fade out and complete
    const fadeOut = setTimeout(() => setFading(true), 2400);
    timeouts.push(fadeOut);

    const complete = setTimeout(() => {
      onCompleteRef.current();
    }, 3000);
    timeouts.push(complete);

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <div className={`splash-screen ${fading ? "splash-fade" : ""}`}>
      <div className="splash-terminal">
        <div className="splash-header">
          <span className="splash-dot splash-dot-red" />
          <span className="splash-dot splash-dot-yellow" />
          <span className="splash-dot splash-dot-green" />
          <span className="splash-title">terminal — ai_workspace</span>
        </div>
        <div className="splash-body">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`splash-line ${visibleLines.includes(i) ? "splash-line-visible" : ""} ${line.highlight ? "splash-line-highlight" : ""} ${line.ready ? "splash-line-ready" : ""}`}
            >
              {line.hasProgress ? (
                <span>
                  {line.text} <span className="splash-progress">{"█".repeat(Math.floor(progress / 8))}{"░".repeat(Math.max(0, 12 - Math.floor(progress / 8)))}</span> {progress}%
                </span>
              ) : (
                <span>{line.text}</span>
              )}
              {line.ready && visibleLines.includes(i) && <span className="splash-cursor" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
