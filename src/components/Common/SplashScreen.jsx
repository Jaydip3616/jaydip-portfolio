import { useEffect, useRef, useState } from "react";

const NAME = "Jaydip Pithava";
const PARTICLE_COUNT = 60;

function SplashScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const [revealedChars, setRevealedChars] = useState(0);
  const [subtitle, setSubtitle] = useState(false);
  const [fading, setFading] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Letter-by-letter reveal
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setRevealedChars(i);
      if (i >= NAME.length) clearInterval(interval);
    }, 80);

    const subtitleTimeout = setTimeout(() => setSubtitle(true), NAME.length * 80 + 300);
    const fadeTimeout = setTimeout(() => setFading(true), 2800);
    const completeTimeout = setTimeout(() => onCompleteRef.current(), 3400);

    return () => {
      clearInterval(interval);
      clearTimeout(subtitleTimeout);
      clearTimeout(fadeTimeout);
      clearTimeout(completeTimeout);
    };
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138, 166, 255, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(138, 166, 255, ${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={`splash-screen ${fading ? "splash-fade" : ""}`}>
      <canvas ref={canvasRef} className="splash-particles" />
      <div className="splash-content">
        <h1 className="splash-name">
          {NAME.split("").map((char, i) => (
            <span
              key={i}
              className={`splash-char ${i < revealedChars ? "splash-char-visible" : ""}`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          <span className="splash-name-cursor" />
        </h1>
        <p className={`splash-subtitle ${subtitle ? "splash-subtitle-visible" : ""}`}>
          AI &amp; Data Science Developer
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;
