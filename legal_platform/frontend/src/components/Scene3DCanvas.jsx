import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene3D from './Scene3D';
import { useTheme } from '../context/ThemeContext';

export default function Scene3DCanvas() {
  const { dark } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950" />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        className="opacity-90"
      >
        <Suspense fallback={null}>
          <Scene3D isDark={dark} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent dark:from-black/20" />
    </div>
  );
}
