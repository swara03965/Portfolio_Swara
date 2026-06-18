import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  radius: number; color: string; alpha: number;
  pulse: number; pulseSpeed: number; layer: number;
}

interface Symbol {
  x: number; y: number; text: string;
  alpha: number; size: number; color: string;
  vx: number; vy: number; life: number; maxLife: number;
}

interface MatrixCol {
  x: number; y: number; speed: number;
  chars: string[]; alpha: number;
}

interface HexNode {
  x: number; y: number; glow: number; glowDir: number;
}

const COLORS = [
  '#7c3aed', '#8b5cf6', '#a78bfa',
  '#ec4899', '#f472b6', '#db2777',
  '#06b6d4', '#c4b5fd',
];
const CODE_SYMBOLS = [
  '</>', '{...}', '( )', '=>', '&&', '||', 'async',
  'await', 'import', 'const', 'return', '[ ]', '/**/',
  '===', '!==', 'git push', 'npm i', '</>',
  '0x1F', '01101', 'sudo', '#️', '∞', 'π',
];
const MATRIX_CHARS = '01アイウエオカキクケコサシスセソ'.split('');

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);
  const symbols = useRef<Symbol[]>([]);
  const matrixCols = useRef<MatrixCol[]>([]);
  const hexNodes = useRef<HexNode[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const init = () => {
      const W = canvas.width, H = canvas.height;

      // Hexagonal grid nodes
      hexNodes.current = [];
      const hexSize = 90;
      const hx = hexSize * 1.732, hy = hexSize * 1.5;
      for (let row = -1; row < H / hy + 2; row++) {
        for (let col = -1; col < W / hx + 2; col++) {
          const x = col * hx + (row % 2 === 0 ? 0 : hx / 2);
          const y = row * hy;
          hexNodes.current.push({ x, y, glow: Math.random(), glowDir: Math.random() > 0.5 ? 1 : -1 });
        }
      }

      // Particles (3 depth layers)
      const count = Math.min(Math.floor(W * H / 7000), 100);
      particles.current = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 1 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 0.2 + Math.random() * 0.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.015,
        layer: i % 3,
      }));

      // Matrix rain columns
      matrixCols.current = [];
      const colCount = Math.floor(W / 28);
      for (let i = 0; i < colCount; i++) {
        if (Math.random() < 0.4) {
          matrixCols.current.push({
            x: i * 28 + 14, y: Math.random() * H,
            speed: 0.5 + Math.random() * 1.5,
            chars: Array.from({ length: 18 }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]),
            alpha: 0.03 + Math.random() * 0.06,
          });
        }
      }

      // Initial floating symbols
      symbols.current = Array.from({ length: 12 }, () => spawnSymbol(W, H));
    };

    const spawnSymbol = (W: number, H: number): Symbol => {
      const maxLife = 180 + Math.random() * 240;
      return {
        x: Math.random() * W * 0.9 + W * 0.05,
        y: Math.random() * H * 0.8 + H * 0.1,
        text: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
        alpha: 0, size: 10 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.15 - Math.random() * 0.25,
        life: 0, maxLife,
      };
    };

    const drawHexGrid = () => {
      const hexSize = 90;
      ctx.save();
      hexNodes.current.forEach(node => {
        node.glow += node.glowDir * 0.003;
        if (node.glow > 1 || node.glow < 0) node.glowDir *= -1;

        const g = node.glow;
        const alpha = 0.04 + g * 0.06;

        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const px = node.x + hexSize * Math.cos(angle);
          const py = node.y + hexSize * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        const isGlowing = g > 0.8;
        ctx.strokeStyle = isGlowing
          ? `rgba(236,72,153,${alpha * 2})`
          : `rgba(124,58,237,${alpha})`;
        ctx.lineWidth = isGlowing ? 1.5 : 0.5;
        ctx.stroke();

        if (g > 0.7) {
          const glowGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, hexSize * 0.4);
          glowGrad.addColorStop(0, `rgba(236,72,153,${(g - 0.7) * 0.12})`);
          glowGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, hexSize * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${alpha * 3})`;
        ctx.fill();
      });
      ctx.restore();
    };

    const drawMatrixRain = () => {
      ctx.save();
      matrixCols.current.forEach(col => {
        col.y += col.speed;
        if (col.y > canvas.height + 200) col.y = -200;

        col.chars.forEach((char, i) => {
          const cy = col.y - i * 18;
          if (cy < -20 || cy > canvas.height + 20) return;
          const brightness = 1 - i / col.chars.length;
          const isHead = i === 0;
          ctx.font = `${isHead ? 'bold ' : ''}11px monospace`;
          ctx.fillStyle = isHead
            ? `rgba(236,72,153,${col.alpha * brightness * 4})`
            : `rgba(139,92,246,${col.alpha * brightness * 2})`;
          ctx.fillText(char, col.x, cy);
        });

        if (Math.random() < 0.015) {
          col.chars[Math.floor(Math.random() * col.chars.length)] =
            MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        }
      });
      ctx.restore();
    };

    const drawParticles = () => {
      const W = canvas.width, H = canvas.height;
      particles.current.forEach(p => {
        p.pulse += p.pulseSpeed;
        const pa = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        const pr = p.radius * (0.9 + 0.1 * Math.sin(p.pulse));

        const mx = mouse.current.x - p.x, my = mouse.current.y - p.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 180 && md > 0) { p.vx -= (mx / md) * 0.025; p.vy -= (my / md) * 0.025; }

        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.98; p.vy *= 0.98;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        // Connections
        particles.current.forEach(other => {
          if (other === p) return;
          const dx = p.x - other.x, dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const t = 1 - dist / 130;
            const isAccent = p.color.includes('ec4899') || other.color.includes('ec4899');
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = isAccent
              ? `rgba(236,72,153,${0.12 * t})`
              : `rgba(124,58,237,${0.1 * t})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        });

        // Glow halo
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pr * 4);
        g.addColorStop(0, p.color); g.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(p.x, p.y, pr * 4, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.globalAlpha = pa * 0.25; ctx.fill();

        // Core dot
        ctx.beginPath(); ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = pa; ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    const drawFloatingSymbols = () => {
      const W = canvas.width, H = canvas.height;
      ctx.save();
      symbols.current.forEach((s, idx) => {
        s.life++;
        s.x += s.vx; s.y += s.vy;

        const half = s.maxLife / 2;
        s.alpha = s.life < half
          ? (s.life / half) * 0.22
          : ((s.maxLife - s.life) / half) * 0.22;

        if (s.life >= s.maxLife) {
          symbols.current[idx] = spawnSymbol(W, H);
          return;
        }

        ctx.font = `${s.size}px 'Space Grotesk', monospace`;
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.fillText(s.text, s.x, s.y);
        ctx.globalAlpha = 1;
      });
      ctx.restore();
    };

    const drawCircuitTraces = () => {
      ctx.save();
      const t = time.current * 0.0008;
      const traces = [
        { x1: 0.05, y1: 0.3, x2: 0.2, y2: 0.3, x3: 0.2, y3: 0.6 },
        { x1: 0.9, y1: 0.2, x2: 0.75, y2: 0.2, x3: 0.75, y3: 0.5 },
        { x1: 0.1, y1: 0.8, x2: 0.3, y2: 0.8, x3: 0.3, y3: 0.65 },
        { x1: 0.85, y1: 0.75, x2: 0.65, y2: 0.75, x3: 0.65, y3: 0.55 },
      ];

      const W = canvas.width, H = canvas.height;
      traces.forEach((tr, i) => {
        const pulse = (Math.sin(t * 2 + i * 1.2) + 1) / 2;
        const alpha = 0.06 + pulse * 0.08;
        const color = i % 2 === 0 ? `rgba(124,58,237,${alpha})` : `rgba(236,72,153,${alpha})`;

        ctx.beginPath();
        ctx.moveTo(tr.x1 * W, tr.y1 * H);
        ctx.lineTo(tr.x2 * W, tr.y2 * H);
        ctx.lineTo(tr.x3 * W, tr.y3 * H);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5; ctx.stroke();

        // Traveling dot
        const totalLength = 1;
        const pos = (Math.sin(t * 3 + i) + 1) / 2;
        const ex = pos < 0.5
          ? tr.x1 * W + (tr.x2 - tr.x1) * W * (pos * 2)
          : tr.x2 * W + (tr.x3 - tr.x2) * W * ((pos - 0.5) * 2);
        const ey = pos < 0.5
          ? tr.y1 * H + (tr.y2 - tr.y1) * H * (pos * 2)
          : tr.y2 * H + (tr.y3 - tr.y2) * H * ((pos - 0.5) * 2);

        ctx.beginPath(); ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? `rgba(139,92,246,${0.6 + pulse * 0.4})` : `rgba(244,114,182,${0.6 + pulse * 0.4})`;
        ctx.fill();

        // Node dots
        [[tr.x1, tr.y1], [tr.x2, tr.y2], [tr.x3, tr.y3]].forEach(([nx, ny]) => {
          ctx.beginPath(); ctx.arc(nx * W, ny * H, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = color; ctx.fill();
          ctx.beginPath(); ctx.arc(nx * W, ny * H, 6, 0, Math.PI * 2);
          ctx.strokeStyle = color; ctx.lineWidth = 0.8; ctx.stroke();
        });
      });
      ctx.restore();
    };

    const draw = () => {
      time.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawHexGrid();
      drawMatrixRain();
      drawCircuitTraces();
      drawParticles();
      drawFloatingSymbols();

      animRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
