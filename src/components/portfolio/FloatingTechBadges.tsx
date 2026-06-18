import { motion } from 'framer-motion';

const badges = [
  { label: 'React.js', x: '8%', y: '18%', delay: 0, color: '#61dafb', bg: 'rgba(97,218,251,0.08)', border: 'rgba(97,218,251,0.25)' },
  { label: '{ code }', x: '82%', y: '12%', delay: 0.4, color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)' },
  { label: 'Next.js', x: '5%', y: '68%', delay: 0.8, color: '#f8fafc', bg: 'rgba(248,250,252,0.05)', border: 'rgba(248,250,252,0.15)' },
  { label: 'Spring Boot', x: '78%', y: '72%', delay: 1.2, color: '#6db33f', bg: 'rgba(109,179,63,0.08)', border: 'rgba(109,179,63,0.25)' },
  { label: '< / >', x: '88%', y: '42%', delay: 0.6, color: '#ec4899', bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.3)' },
  { label: 'git commit', x: '3%', y: '42%', delay: 1.0, color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)' },
  { label: 'Node.js', x: '60%', y: '8%', delay: 1.5, color: '#68a063', bg: 'rgba(104,160,99,0.08)', border: 'rgba(104,160,99,0.25)' },
  { label: '🎨 Design', x: '22%', y: '88%', delay: 0.3, color: '#f472b6', bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.3)' },
  { label: 'DSA', x: '72%', y: '88%', delay: 1.8, color: '#818cf8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.25)' },
];

const floatVariants = {
  initial: { opacity: 0, scale: 0.7 },
  animate: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay, duration: 0.6, ease: 'easeOut' },
  }),
};

const floatAnim = (delay: number) => ({
  y: [0, -10, 0, 6, 0],
  x: [0, 4, 0, -4, 0],
  transition: {
    delay,
    duration: 6 + delay * 0.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
});

export default function FloatingTechBadges() {
  return (
    <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
      {badges.map((b) => (
        <motion.div
          key={b.label}
          className="absolute"
          style={{ left: b.x, top: b.y }}
          variants={floatVariants}
          initial="initial"
          animate={floatVariants.animate(b.delay)}
        >
          <motion.div animate={floatAnim(b.delay)}>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold backdrop-blur-md select-none whitespace-nowrap"
              style={{
                color: b.color,
                background: b.bg,
                border: `1px solid ${b.border}`,
                boxShadow: `0 0 12px ${b.border}, inset 0 1px 0 rgba(255,255,255,0.06)`,
                letterSpacing: '0.04em',
              }}
            >
              {b.label}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
