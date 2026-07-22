import { useEffect, useRef } from "react";

function DataCanvas({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const host = canvas.parentElement;
    const palette = theme === "dark"
      ? { point: "200,255,90", accent: "138,166,255", pulse: "140,97,247" }
      : { point: "70,94,187", accent: "94,113,207", pulse: "116,82,213" };
    let frameId;
    let isVisible = true;
    let isDrawing = false;
    let size = { width: 0, height: 0 };
    let points = [];
    let time = 0;
    const pointer = { x: -1000, y: -1000, active: false };

    const createPoints = () => {
      const count = size.width < 600 ? 26 : 48;
      points = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 1.25 + 0.6,
        phase: Math.random() * Math.PI * 2,
        anchor: index % 7 === 0,
      }));
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      size = { width: rect.width, height: rect.height };
      canvas.width = Math.floor(rect.width * ratio);
      canvas.height = Math.floor(rect.height * ratio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createPoints();
    };

    const drawPointerPulse = () => {
      if (!pointer.active) return;
      const radius = 26 + Math.sin(time * 0.07) * 6;
      const gradient = context.createRadialGradient(pointer.x, pointer.y, 1, pointer.x, pointer.y, radius * 2.3);
      gradient.addColorStop(0, `rgba(${palette.pulse}, .16)`);
      gradient.addColorStop(1, `rgba(${palette.pulse}, 0)`);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(pointer.x, pointer.y, radius * 2.3, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = `rgba(${palette.accent}, .34)`;
      context.lineWidth = 1;
      context.beginPath();
      context.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
      context.stroke();
    };

    const draw = () => {
      time += 1;
      context.clearRect(0, 0, size.width, size.height);
      drawPointerPulse();

      points.forEach((point) => {
        const dx = pointer.x - point.x;
        const dy = pointer.y - point.y;
        const distance = Math.hypot(dx, dy);
        if (pointer.active && distance < 155) {
          point.vx -= (dx / Math.max(distance, 1)) * 0.008;
          point.vy -= (dy / Math.max(distance, 1)) * 0.008;
        }
        point.x += point.vx + Math.sin(time * 0.012 + point.phase) * 0.08;
        point.y += point.vy + Math.cos(time * 0.01 + point.phase) * 0.08;
        point.vx *= 0.992;
        point.vy *= 0.992;
        if (point.x < 0 || point.x > size.width) point.vx *= -1;
        if (point.y < 0 || point.y > size.height) point.vy *= -1;
        point.x = Math.max(0, Math.min(size.width, point.x));
        point.y = Math.max(0, Math.min(size.height, point.y));
      });

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const distance = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
          if (distance < 118) {
            const alpha = (1 - distance / 118) * 0.3;
            context.strokeStyle = `rgba(${palette.accent}, ${alpha})`;
            context.lineWidth = points[i].anchor || points[j].anchor ? 1.15 : .7;
            context.beginPath();
            context.moveTo(points[i].x, points[i].y);
            context.lineTo(points[j].x, points[j].y);
            context.stroke();
          }
        }
      }

      points.forEach((point) => {
        const pulse = point.anchor ? Math.sin(time * 0.06 + point.phase) * .65 + 1 : 1;
        context.fillStyle = `rgba(${palette.point}, ${point.anchor ? .85 : .58})`;
        context.beginPath();
        context.arc(point.x, point.y, point.radius * pulse, 0, Math.PI * 2);
        context.fill();
        if (point.anchor) {
          context.strokeStyle = `rgba(${palette.point}, .18)`;
          context.beginPath();
          context.arc(point.x, point.y, 7 + pulse * 3, 0, Math.PI * 2);
          context.stroke();
        }
      });

      if (isVisible) frameId = window.requestAnimationFrame(draw);
      else isDrawing = false;
    };

    const startDrawing = () => {
      if (!isDrawing && isVisible) {
        isDrawing = true;
        frameId = window.requestAnimationFrame(draw);
      }
    };
    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => { pointer.x = -1000; pointer.y = -1000; pointer.active = false; };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) startDrawing();
      else {
        window.cancelAnimationFrame(frameId);
        isDrawing = false;
      }
    }, { threshold: 0.05 });
    const resizeObserver = new ResizeObserver(resize);

    resize();
    startDrawing();
    visibilityObserver.observe(host);
    resizeObserver.observe(host);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="data-canvas" aria-hidden="true" />;
}

export default DataCanvas;
