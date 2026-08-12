"use client";

import { useEffect, useRef } from "react";

const CHARS = "01ABCDEFGHIKLMNOPQRSTUVWXYZ#$%&+=<>/\\ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";

export function MatrixRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let W = 0, H = 0;
    const FONT = 15;
    let drops: number[] = [];
    let hues: number[] = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      const cols = Math.floor(W / FONT);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
      hues = Array.from({ length: cols }, () => (Math.random() < 0.72 ? 0 : 1));
    };

    const draw = () => {
      ctx.fillStyle = "rgba(3,2,9,0.16)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${FONT}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT;
        const y = drops[i] * FONT;

        ctx.fillStyle = hues[i] ? "rgba(57,255,136,0.55)" : "rgba(168,85,247,0.55)";
        ctx.fillText(char, x, y);

        if (y > H && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ display: "block", width: "100%", height: "100%" }} />;
}
