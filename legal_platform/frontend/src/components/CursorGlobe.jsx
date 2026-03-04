import { useEffect, useState, useRef } from 'react';

export default function CursorGlobe() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const ref = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      ref.current.targetX = e.clientX;
      ref.current.targetY = e.clientY;
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    const animate = () => {
      ref.current.x += (ref.current.targetX - ref.current.x) * 0.08;
      ref.current.y += (ref.current.targetY - ref.current.y) * 0.08;
      setPos({ x: ref.current.x, y: ref.current.y });
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    document.body.addEventListener('mouseleave', handleLeave);
    const id = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.body.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(id);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-40 transition-opacity duration-300"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/40 dark:border-indigo-400/50 animate-spin" style={{ animationDuration: '20s' }}>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400/80" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400/60" />
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-400/50" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-400/50" />
        </div>
        <div className="absolute inset-0 rounded-full border border-indigo-500/30 dark:border-indigo-400/40 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-violet-400/70" />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-violet-400/60" />
        </div>
        <div className="absolute inset-2 flex items-center justify-center">
          <svg className="w-8 h-8 text-indigo-400/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v8M12 10l-5 5m5-5l5 5M7 15v2m10-2v2M12 22v-2M9 20h6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
