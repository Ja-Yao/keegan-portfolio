import { cn } from "@/lib/utils";
import { useMemo } from "react";

/**
 * A small, honest picture of the client's field: two sets of samples and the
 * optimal transport plan between them. In one dimension the optimal plan simply
 * pairs the i-th smallest source point with the i-th smallest target point,
 * which is exactly what is drawn here (so lines never cross).
 */

const W = 480;
const H = 160;
const PAD = 14;
const N = 18;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rand: () => number) {
  const u = Math.max(rand(), 1e-9);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
}

const clamp = (x: number) => Math.min(0.96, Math.max(0.04, x));

export function TransportMotif({
  seed = 1,
  animate = false,
  className,
}: {
  seed?: number;
  /** Draws the plan in once on mount. Respects prefers-reduced-motion. */
  animate?: boolean;
  className?: string;
}) {
  const { source, target } = useMemo(() => {
    const rand = mulberry32(seed);
    // Source: two clusters. Target: one broader cluster.
    const source = Array.from({ length: N }, () =>
      clamp((rand() < 0.5 ? 0.26 : 0.7) + gaussian(rand) * 0.07)
    ).sort((a, b) => a - b);
    const target = Array.from({ length: N }, () =>
      clamp(0.58 + gaussian(rand) * 0.15)
    ).sort((a, b) => a - b);
    return { source, target };
  }, [seed]);

  const x = (v: number) => PAD + v * (W - PAD * 2);
  const yTop = PAD;
  const yBottom = H - PAD;
  const mid = H / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("block h-auto w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      {animate && (
        <style>{`@media (prefers-reduced-motion: no-preference){.tm-line{stroke-dasharray:1;stroke-dashoffset:1;animation:tm-draw 1.1s cubic-bezier(.3,.7,.2,1) forwards;animation-delay:var(--d)}@keyframes tm-draw{to{stroke-dashoffset:0}}}`}</style>
      )}
      <g
        fill="none"
        className="stroke-muted-foreground"
        strokeOpacity={0.55}
        strokeWidth={1.25}
      >
        {source.map((s, i) => (
          <path
            key={i}
            className={animate ? "tm-line" : undefined}
            pathLength={1}
            style={{ ["--d" as string]: `${i * 40}ms` }}
            d={`M ${x(s)} ${yTop} C ${x(s)} ${mid}, ${x(target[i])} ${mid}, ${x(target[i])} ${yBottom}`}
          />
        ))}
      </g>
      <g className="fill-foreground">
        {source.map((s, i) => (
          <circle key={i} cx={x(s)} cy={yTop} r={3.5} />
        ))}
      </g>
      <g className="fill-primary">
        {target.map((t, i) => (
          <circle key={i} cx={x(t)} cy={yBottom} r={3.5} />
        ))}
      </g>
    </svg>
  );
}
