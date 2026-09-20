import { useId } from "react";
import { interpolate, transform, formatNumber } from "./eigenMath";

const COLORS = ["#b64b13", "#7547a3"];

export default function CoordinatePlane({ matrix, result, t }) {
  const id = useId().replace(/:/g, "");
  const current = interpolate(matrix, t);
  const vectors = result.eigenpairs.flatMap((pair) => pair.vectors);
  // Keep the camera fixed throughout interpolation and preserve equal axis scale.
  const bound = Math.max(3, ...matrix.map(Math.abs)) * 1.6;
  const scale = 240 / bound;
  const point = ([x, y]) => [280 + x * scale, 280 - y * scale];
  const path = (points) => points.map((p, index) => `${index ? "L" : "M"}${point(p).join(",")}`).join(" ");
  const step = 10 ** Math.floor(Math.log10(bound / 3));
  const spacing = bound / step > 12 ? step * 5 : step;
  const ticks = Array.from({ length: Math.floor(bound / spacing) * 2 + 1 }, (_, i) => (i - Math.floor(bound / spacing)) * spacing);
  const lines = ticks.flatMap((n) => [[[n, -bound], [n, bound]], [[-bound, n], [bound, n]]]);
  const circle = Array.from({ length: 181 }, (_, i) => [Math.cos(i * Math.PI / 90), Math.sin(i * Math.PI / 90)]);
  function arrow(vector, color, dashed, label) {
    const [x, y] = point(vector);
    const zero = Math.hypot(...vector) < 1e-12;
    return <g>
      {zero ? <circle cx="280" cy="280" r="5" fill={color} /> :
        <line x1="280" y1="280" x2={x} y2={y} stroke={color} strokeWidth={dashed ? 2 : 3}
          strokeDasharray={dashed ? "5 4" : undefined} markerEnd={`url(#${id}-${color.slice(1)})`} />}
      <text x={x + 7} y={y + (dashed ? -10 : 18)} fill={color}>{label}{zero ? " = 0" : ""}</text>
    </g>;
  }
  return <figure className="eigen-plane">
    <svg viewBox="0 0 560 560" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>Matrix transformation at t = {t.toFixed(2)}</title>
      <desc id={`${id}-desc`}>Gray original grid and unit circle; blue transformed grid and circle. Dashed eigenvector arrows and solid transformed arrows share a color. Complex eigenvectors are not drawn on the real plane.</desc>
      <defs>
        <clipPath id={`${id}-clip`}><rect x="20" y="20" width="520" height="520" /></clipPath>
        {COLORS.map((color) => <marker key={color} id={`${id}-${color.slice(1)}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
        </marker>)}
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        {lines.map((line, i) => <path key={`original-${i}`} d={path(line)} stroke="#dce0e3" fill="none" />)}
        {lines.map((line, i) => <path key={`transformed-${i}`} d={path(line.map((p) => transform(current, p)))} stroke="#315b7d" opacity="0.32" fill="none" />)}
        <path d={path([[-bound, 0], [bound, 0]])} stroke="#6a7075" />
        <path d={path([[0, -bound], [0, bound]])} stroke="#6a7075" />
        <path d={path(circle)} stroke="#737b80" strokeWidth="2" strokeDasharray="5 4" fill="none" />
        <path d={path(circle.map((p) => transform(current, p)))} stroke="#315b7d" strokeWidth="3" fill="none" />
        {vectors.map((vector, i) => <g key={i}>
          {arrow(vector, COLORS[i], true, `v${i + 1}`)}
          {arrow(transform(current, vector), COLORS[i], false, `A(t)v${i + 1}`)}
        </g>)}
      </g>
      {ticks.filter((n) => n !== 0).map((n) => <g key={n}>
        <text x={point([n, 0])[0]} y="297" textAnchor="middle">{formatNumber(n)}</text>
        <text x="270" y={point([0, n])[1] + 4} textAnchor="end">{formatNumber(n)}</text>
      </g>)}
      <text x="530" y="273">x</text><text x="288" y="27">y</text><text x="267" y="297">0</text>
    </svg>
    <figcaption>
      <span>Gray: original grid and unit circle.</span> <span className="eigen-blue">Blue: transformed grid and circle.</span>
      <span> Dashed arrows: unit eigenvectors of A. Solid arrows: A(t)v. Orange: v1; purple: v2.</span>
      <span> Singular transformations can collapse the ellipse to a line or point.</span>
    </figcaption>
  </figure>;
}
