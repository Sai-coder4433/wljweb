import React, { useEffect, useRef } from 'react';

interface GlossyGoldParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  shimmerSpeed: number;
  shimmerPhase: number;
}

export const GoldGlitterCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<GlossyGoldParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const addGlossyGoldBeads = (clientX: number, clientY: number, count = 4) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.8 + 0.3;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4, // Soft upward liquid float
          size: Math.random() * 3.5 + 2.5, // 2.5px to 6px glossy golden pearls
          alpha: 1,
          decay: Math.random() * 0.022 + 0.014,
          shimmerSpeed: Math.random() * 0.15 + 0.08,
          shimmerPhase: Math.random() * Math.PI,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      addGlossyGoldBeads(e.clientX, e.clientY, 3);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        addGlossyGoldBeads(e.touches[0].clientX, e.touches[0].clientY, 3);
      }
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove, { passive: true });
      parent.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.015; // very gentle downward gravity
        p.alpha -= p.decay;
        p.shimmerPhase += p.shimmerSpeed;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Shimmering intensity
        const shimmer = Math.sin(p.shimmerPhase) * 0.25 + 0.75;
        const currentAlpha = Math.max(0, p.alpha * shimmer);

        ctx.save();
        ctx.globalAlpha = currentAlpha;

        // Ambient golden warm halo
        ctx.shadowColor = 'rgba(255, 215, 0, 0.75)';
        ctx.shadowBlur = p.size * 2.2;

        // 1. Draw 3D Glossy Liquid Gold Sphere using radial gradient
        const lightOffsetX = p.x - p.size * 0.32;
        const lightOffsetY = p.y - p.size * 0.32;

        const radGrad = ctx.createRadialGradient(
          lightOffsetX,
          lightOffsetY,
          p.size * 0.1,
          p.x,
          p.y,
          p.size
        );

        // Rich 24K Liquid Gold Palette with Glassy / Glossy Core
        radGrad.addColorStop(0, '#FFFFFF'); // Specular light point
        radGrad.addColorStop(0.18, '#FFF4BA'); // Light champagne gold
        radGrad.addColorStop(0.48, '#FFD700'); // Pure bright gold
        radGrad.addColorStop(0.82, '#D4AF37'); // Heritage Gold
        radGrad.addColorStop(1, '#7E5700'); // Deep metallic gold shadow edge

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = radGrad;
        ctx.fill();

        // 2. Extra Crisp Glossy Glint on top-left of the bead
        ctx.shadowBlur = 0; // Crisp highlight
        ctx.beginPath();
        ctx.arc(lightOffsetX, lightOffsetY, Math.max(0.8, p.size * 0.28), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fill();

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('touchmove', handleTouchMove);
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-20 ${className}`}
    />
  );
};
