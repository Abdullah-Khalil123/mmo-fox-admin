'use client';
import { useState } from 'react';

// Custom manual price blocks
const serviceOptions = [
  { fromLevel: 1, toLevel: 30, price: 87.61 },
  { fromLevel: 30, toLevel: 60, price: 273.37 },
  { fromLevel: 1, toLevel: 60, price: 353.98 },
  { fromLevel: 15, toLevel: 60, price: 343.47 },
  { fromLevel: 45, toLevel: 60, price: 151.87 },
  { fromLevel: 25, toLevel: 50, price: 210 },
];

const TOTAL_PRICE = 353.98;
const MAX_LEVEL = 60;
const XP_POWER = 2;
const A = 0.1;
const B = 0.16;

const totalXpEffort = (() => {
  let xp = 0;
  for (let i = 1; i < MAX_LEVEL; i++) {
    xp += Math.pow(i, XP_POWER);
  }
  return xp;
})();

function getSegmentedPrice(from: number, to: number) {
  const segments = [];
  let current = from;

  while (current < to) {
    const match = serviceOptions.find(
      (opt) => opt.fromLevel === current && opt.toLevel <= to
    );

    if (!match) return null;

    segments.push(match);
    current = match.toLevel;
  }

  if (current === to) {
    return segments.reduce((sum, seg) => sum + seg.price, 0);
  }

  return null;
}

export default function LevelPricingTest() {
  const [startLevel, setStartLevel] = useState(1);
  const [endLevel, setEndLevel] = useState(60);

  const segmentedPrice = getSegmentedPrice(startLevel, endLevel);

  const xpEffort = (() => {
    let sum = 0;
    for (let i = startLevel; i < endLevel; i++) {
      sum += Math.pow(i, XP_POWER);
    }
    return sum;
  })();
  const proportionalPrice = parseFloat(
    ((xpEffort / totalXpEffort) * TOTAL_PRICE).toFixed(2)
  );

  const linearPrice = (() => {
    let total = 0;
    for (let i = startLevel; i < endLevel; i++) {
      total += A + B * i;
    }
    return parseFloat(total.toFixed(2));
  })();

  const finalPrice = segmentedPrice ?? proportionalPrice;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Level Pricing (Segment-Aware)</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>Start Level: </label>
        <input
          type="number"
          min={1}
          max={MAX_LEVEL - 1}
          value={startLevel}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val < endLevel) setStartLevel(val);
          }}
        />
        <label style={{ marginLeft: '1rem' }}>End Level: </label>
        <input
          type="number"
          min={startLevel + 1}
          max={MAX_LEVEL}
          value={endLevel}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val > startLevel) setEndLevel(val);
          }}
        />
      </div>

      <div>
        <p>
          <strong>XP Proportional Price:</strong> ${proportionalPrice}
        </p>
        <p>
          <strong>Linear Price:</strong> ${linearPrice}
        </p>
        <p>
          <strong>Final Price:</strong> ${finalPrice.toFixed(2)}{' '}
          {segmentedPrice != null ? '(from custom segments)' : '(XP-based)'}
        </p>
      </div>
    </div>
  );
}
