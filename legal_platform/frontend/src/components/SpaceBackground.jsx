import { useRef, useEffect } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let grainOffset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      const count = Math.min(800, Math.floor((canvas.width * canvas.height) / 2500));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.2,
          opacity: Math.random() * 0.7 + 0.3,
          twinkle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      stars.forEach((s) => {
        const twinkle = Math.sin(time * s.speed + s.twinkle) * 0.25 + 0.75;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * twinkle * 0.85})`;
        ctx.fill();
      });

      grainOffset += 0.5;
      const grainSize = 1;
      for (let i = 0; i < 800; i++) {
        const x = (i * 37 + grainOffset) % (canvas.width + 20) - 10;
        const y = (i * 53 + grainOffset * 0.7) % (canvas.height + 20) - 10;
        const o = (Math.sin(i + time) * 0.5 + 0.5) * 0.03;
        ctx.fillStyle = `rgba(255,255,255,${o})`;
        ctx.fillRect(x, y, grainSize, grainSize);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      draw();
      animationId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/25 via-transparent to-slate-950/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-100" />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% -30%, rgba(99, 102, 241, 0.18), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139, 92, 246, 0.06), transparent 45%), radial-gradient(ellipse 50% 30% at 20% 80%, rgba(99, 102, 241, 0.05), transparent 40%)',
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_20%,transparent_100%)]" />
    </div>
  );
}
