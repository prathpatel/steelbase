import type { ReactNode } from "react";
import type { DrawingKind } from "@/lib/catalog";

// Blueprint-style line drawings of each product. viewBox is 240×160 with the floor at y=144.
// Strokes inherit currentColor; elements with class "hl" are drawn in the accent colour.

const FLOOR = 144;

function Floor() {
  return <line className="floor" x1="8" y1={FLOOR} x2="232" y2={FLOOR} />;
}

function hex(cx: number, bottom: number, r: number) {
  const h = r * 0.866;
  const cy = bottom - h;
  return [
    [cx - r, cy],
    [cx - r / 2, cy - h],
    [cx + r / 2, cy - h],
    [cx + r, cy],
    [cx + r / 2, cy + h],
    [cx - r / 2, cy + h],
  ]
    .map((p) => p.join(","))
    .join(" ");
}

function holes(x: number, from: number, to: number, step = 9) {
  const dots = [];
  for (let y = from; y <= to; y += step) dots.push(<circle key={`${x}-${y}`} className="dot" cx={x} cy={y} r="1.1" />);
  return dots;
}

function stack(x: number, width: number, bottom: number, plates: number) {
  return Array.from({ length: plates }, (_, i) => (
    <rect key={i} className="hl" x={x} y={bottom - (i + 1) * 7} width={width} height="5" rx="1" />
  ));
}

const drawings: Record<DrawingKind, () => ReactNode> = {
  "adjustable-dumbbells": () => {
    const heights = [50, 54, 58, 60, 60];
    return (
      <>
        <rect x="36" y="124" width="168" height="20" rx="3" />
        <circle cx="46" cy="134" r="4" />
        <circle cx="194" cy="134" r="4" />
        {heights.map((h, i) => (
          <g key={i}>
            <rect x={48 + i * 8} y={94 - h / 2} width="6" height={h} rx="1.5" />
            <rect x={186 - i * 8} y={94 - h / 2} width="6" height={h} rx="1.5" />
          </g>
        ))}
        <rect className="hl" x="88" y="90" width="64" height="8" rx="3" />
        <line className="faint" x1="100" y1="94" x2="140" y2="94" />
      </>
    );
  },

  bench: () => (
    <>
      <rect x="40" y="124" width="156" height="8" rx="2" />
      <rect x="28" y="138" width="38" height="6" rx="3" />
      <rect x="176" y="138" width="38" height="6" rx="3" />
      <line x1="47" y1="132" x2="47" y2="138" />
      <line x1="195" y1="132" x2="195" y2="138" />
      <line x1="196" y1="128" x2="214" y2="118" />
      <rect className="hl" x="52" y="86" width="62" height="11" rx="4" />
      <line x1="84" y1="97" x2="84" y2="124" />
      <rect className="hl" x="0" y="0" width="92" height="11" rx="4" transform="translate(116 87) rotate(-36)" />
      <line x1="150" y1="124" x2="160" y2="74" />
      <line className="faint" x1="136" y1="124" x2="140" y2="104" />
      {[104, 112, 120].map((y) => (
        <line key={y} className="faint" x1="140" y1={y} x2="148" y2={y} />
      ))}
    </>
  ),

  "barbell-set": () => (
    <>
      <rect x="62" y="96" width="116" height="4" rx="1" />
      {[74, 82, 90, 150, 158, 166].map((x) => (
        <line key={x} className="faint" x1={x} y1="94" x2={x} y2="102" />
      ))}
      <rect x="18" y="93" width="44" height="10" rx="2" />
      <rect x="178" y="93" width="44" height="10" rx="2" />
      <rect x="58" y="90" width="5" height="16" rx="1" />
      <rect x="177" y="90" width="5" height="16" rx="1" />
      <rect className="hl" x="30" y="52" width="11" height="92" rx="2" />
      <rect className="hl" x="199" y="52" width="11" height="92" rx="2" />
      <rect className="hl" x="43" y="62" width="9" height="72" rx="2" />
      <rect className="hl" x="188" y="62" width="9" height="72" rx="2" />
      <line className="faint" x1="35.5" y1="60" x2="35.5" y2="136" />
      <line className="faint" x1="204.5" y1="60" x2="204.5" y2="136" />
    </>
  ),

  "half-rack": () => (
    <>
      <rect x="36" y="138" width="168" height="6" rx="2" />
      <rect x="62" y="18" width="10" height="120" />
      <rect x="168" y="18" width="10" height="120" />
      <rect x="56" y="18" width="128" height="8" rx="1" />
      <line x1="72" y1="34" x2="168" y2="34" />
      {holes(67, 40, 130)}
      {holes(173, 40, 130)}
      <path d="M72 70 h9 v8 h-5" />
      <path d="M168 70 h-9 v8 h5" />
      <path d="M72 104 h14" />
      <path d="M168 104 h-14" />
      <rect x="14" y="66" width="212" height="4" rx="1" />
      <rect className="hl" x="24" y="34" width="9" height="68" rx="2" />
      <rect className="hl" x="207" y="34" width="9" height="68" rx="2" />
    </>
  ),

  "spin-bike": () => (
    <>
      <rect x="34" y="136" width="66" height="8" rx="4" />
      <rect x="148" y="136" width="62" height="8" rx="4" />
      <circle className="hl" cx="78" cy="104" r="28" />
      <circle cx="78" cy="104" r="6" />
      <line className="faint" x1="78" y1="76" x2="78" y2="132" />
      <line className="faint" x1="50" y1="104" x2="106" y2="104" />
      <path d="M68 136 L98 58" />
      <path d="M93 72 L150 116 L176 136" />
      <path d="M150 116 L140 62" />
      <path d="M118 56 h40 l-5 7 h-30 z" />
      <path d="M98 58 L96 48 h26" />
      <circle cx="128" cy="110" r="9" />
      <line x1="128" y1="110" x2="136" y2="124" />
      <line x1="132" y1="124" x2="142" y2="124" />
    </>
  ),

  kettlebells: () => (
    <>
      {[
        [58, 17],
        [112, 21],
        [174, 26],
      ].map(([cx, r]) => {
        // Body is a circle clipped flat at the floor; its centre sits 0.714r above it.
        const cy = FLOOR - r * 0.714;
        const hx = r * 0.58;
        return (
          <g key={cx}>
            <path d={`M${cx - r * 0.7} ${FLOOR} A${r} ${r} 0 1 1 ${cx + r * 0.7} ${FLOOR} Z`} />
            <path
              className="hl"
              d={`M${cx - hx} ${cy - r * 0.8} L${cx - hx} ${cy - r * 1.35} Q${cx - hx} ${cy - r * 1.75} ${cx} ${cy - r * 1.75} Q${cx + hx} ${cy - r * 1.75} ${cx + hx} ${cy - r * 1.35} L${cx + hx} ${cy - r * 0.8}`}
            />
          </g>
        );
      })}
    </>
  ),

  "power-rack": () => (
    <>
      <rect x="30" y="138" width="192" height="6" rx="2" />
      <rect className="faint" x="60" y="22" width="6" height="116" />
      <rect className="faint" x="146" y="22" width="6" height="116" />
      <rect x="42" y="14" width="10" height="124" />
      <rect x="154" y="14" width="10" height="124" />
      <rect x="42" y="14" width="122" height="8" rx="1" />
      {holes(47, 40, 130)}
      {holes(159, 40, 130)}
      <rect className="faint" x="52" y="100" width="102" height="4" />
      <circle cx="103" cy="30" r="5" />
      <line x1="103" y1="35" x2="103" y2="56" />
      <path className="hl" d="M72 58 Q103 50 134 58" />
      <line x1="164" y1="18" x2="194" y2="22" />
      <rect x="178" y="22" width="40" height="116" rx="1" />
      <circle cx="198" cy="30" r="4" />
      <line className="faint" x1="190" y1="34" x2="190" y2="100" />
      <line className="faint" x1="206" y1="34" x2="206" y2="100" />
      {stack(184, 28, 136, 5)}
    </>
  ),

  "functional-trainer": () => (
    <>
      <rect x="16" y="138" width="208" height="6" rx="2" />
      <rect x="22" y="16" width="44" height="122" rx="1" />
      <rect x="174" y="16" width="44" height="122" rx="1" />
      <rect x="22" y="16" width="196" height="10" rx="1" />
      <path d="M66 26 L84 38 H156 L174 26" />
      <line className="faint" x1="36" y1="30" x2="36" y2="100" />
      <line className="faint" x1="52" y1="30" x2="52" y2="100" />
      <line className="faint" x1="188" y1="30" x2="188" y2="100" />
      <line className="faint" x1="204" y1="30" x2="204" y2="100" />
      {stack(30, 28, 136, 5)}
      {stack(182, 28, 136, 5)}
      <rect x="66" y="58" width="9" height="18" rx="2" />
      <rect x="165" y="58" width="9" height="18" rx="2" />
      <circle cx="75" cy="72" r="4" />
      <circle cx="165" cy="72" r="4" />
      <line x1="78" y1="75" x2="100" y2="100" />
      <line x1="162" y1="75" x2="140" y2="100" />
      <rect className="hl" x="96" y="99" width="12" height="6" rx="2" />
      <rect className="hl" x="132" y="99" width="12" height="6" rx="2" />
    </>
  ),

  "smith-machine": () => (
    <>
      <rect x="22" y="138" width="196" height="6" rx="2" />
      <rect x="32" y="14" width="10" height="124" />
      <rect x="198" y="14" width="10" height="124" />
      <rect x="32" y="14" width="176" height="8" rx="1" />
      <line x1="66" y1="22" x2="66" y2="138" />
      <line x1="174" y1="22" x2="174" y2="138" />
      <rect x="59" y="66" width="14" height="18" rx="2" />
      <rect x="167" y="66" width="14" height="18" rx="2" />
      <rect x="14" y="72" width="212" height="5" rx="1" />
      <rect className="hl" x="20" y="42" width="9" height="64" rx="2" />
      <rect className="hl" x="211" y="42" width="9" height="64" rx="2" />
      <rect className="faint" x="42" y="112" width="156" height="4" />
      <line x1="42" y1="124" x2="52" y2="124" />
      <line x1="198" y1="124" x2="188" y2="124" />
    </>
  ),

  treadmill: () => (
    <>
      <path d="M24 128 L178 116 L182 130 L28 142 Z" />
      <line className="hl" x1="28" y1="126" x2="176" y2="114" />
      <circle cx="33" cy="135" r="4.5" />
      <circle cx="173" cy="123" r="4.5" />
      <path d="M170 112 L206 106 L212 128 L182 131" />
      <path d="M198 108 L186 40" />
      <path d="M204 108 L192 40" />
      <path className="hl" d="M166 30 L214 20 L219 38 L172 46 Z" />
      <path d="M188 60 L136 64 L132 74" />
      <line x1="30" y1="142" x2="30" y2="144" />
      <line x1="206" y1="128" x2="208" y2="144" />
    </>
  ),

  "leg-press": () => (
    <>
      <rect x="16" y="138" width="208" height="6" rx="2" />
      <rect x="0" y="-4" width="170" height="8" transform="translate(68 132) rotate(-38)" />
      <line x1="194" y1="31" x2="212" y2="138" />
      <line x1="140" y1="83" x2="150" y2="138" />
      <g transform="translate(134 86) rotate(-38)">
        <rect x="-4" y="-12" width="40" height="10" rx="2" />
        <rect className="hl" x="-10" y="-54" width="7" height="50" rx="2" />
        <circle className="hl" cx="22" cy="-28" r="15" />
        <circle cx="22" cy="-28" r="3" />
      </g>
      <rect x="0" y="0" width="46" height="10" rx="4" transform="translate(18 96) rotate(28)" />
      <rect x="54" y="114" width="34" height="9" rx="4" />
      <line x1="70" y1="123" x2="70" y2="138" />
      <line x1="36" y1="112" x2="36" y2="138" />
      <line x1="90" y1="112" x2="98" y2="104" />
    </>
  ),

  "dumbbell-rack": () => {
    const row = (start: number, bottom: number, radii: number[], gap: number) => {
      let x = start;
      return radii.map((r) => {
        const cx = x + r;
        x += 2 * r + gap;
        return <polygon key={`${bottom}-${r}`} className="hl" points={hex(cx, bottom, r)} />;
      });
    };
    return (
      <>
        <rect x="18" y="40" width="8" height="104" />
        <rect x="214" y="40" width="8" height="104" />
        <rect x="18" y="74" width="204" height="6" rx="1" />
        <rect x="18" y="118" width="204" height="6" rx="1" />
        {row(36, 74, [9, 10, 11, 12, 13], 8)}
        {row(30, 118, [14, 15, 16, 17, 18], 4)}
      </>
    );
  },
};

export function Drawing({ kind, className = "" }: { kind: DrawingKind; className?: string }) {
  return (
    <svg className={`drawing ${className}`} viewBox="0 0 240 160" aria-hidden="true" focusable="false">
      <Floor />
      {drawings[kind]()}
    </svg>
  );
}
