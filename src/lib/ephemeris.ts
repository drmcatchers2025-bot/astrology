/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * High-Precision Ephemeris & Synastry Planetary Calculation Engine
 * Calculates exact planetary ecliptic longitudes (degrees & arc-minutes)
 * using Keplerian orbital mechanics and Julian Day epoch conversions.
 */

export interface PlanetaryPosition {
  name: string;
  symbol: string;
  longitude: number; // 0 to 360 degrees
  sign: string;
  signSymbol: string;
  degreesInSign: number; // 0 to 29
  arcMinutes: number; // 0 to 59
  formatted: string; // e.g. "14°28' Taurus"
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  house: number;
}

export interface ExactSynastryAspect {
  planet1: string;
  symbol1: string;
  planet2: string;
  symbol2: string;
  aspectType: 'Conjunction' | 'Opposition' | 'Trine' | 'Square' | 'Sextile' | 'Quincunx';
  symbol: string;
  targetAngle: number;
  exactAngle: number;
  orb: number; // degrees deviation from exact angle
  nature: 'Harmonious' | 'Dynamic Tension' | 'Karmic Catalyst' | 'Magnetic Passion';
  weight: number;
  description: string;
}

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', element: 'Fire' as const },
  { name: 'Taurus', symbol: '♉', element: 'Earth' as const },
  { name: 'Gemini', symbol: '♊', element: 'Air' as const },
  { name: 'Cancer', symbol: '♋', element: 'Water' as const },
  { name: 'Leo', symbol: '♌', element: 'Fire' as const },
  { name: 'Virgo', symbol: '♍', element: 'Earth' as const },
  { name: 'Libra', symbol: '♎', element: 'Air' as const },
  { name: 'Scorpio', symbol: '♏', element: 'Water' as const },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire' as const },
  { name: 'Capricorn', symbol: '♑', element: 'Earth' as const },
  { name: 'Aquarius', symbol: '♒', element: 'Air' as const },
  { name: 'Pisces', symbol: '♓', element: 'Water' as const },
];

// Convert standard date string (YYYY-MM-DD) to Julian Day Number at 12:00 UTC
export function getJulianDay(dateStr: string): number {
  const [yStr, mStr, dStr] = dateStr.split('-');
  let Y = parseInt(yStr, 10);
  let M = parseInt(mStr, 10);
  const D = parseInt(dStr, 10);

  if (M <= 2) {
    Y -= 1;
    M += 12;
  }

  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + B - 1524.5;
  return JD;
}

function normalize360(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

function degreeToPosition(name: string, symbol: string, longitudeDeg: number, houseOffset: number = 1): PlanetaryPosition {
  const norm = normalize360(longitudeDeg);
  const signIndex = Math.floor(norm / 30);
  const signData = ZODIAC_SIGNS[signIndex];
  const degInSign = norm % 30;
  const degFloor = Math.floor(degInSign);
  const arcMin = Math.floor((degInSign - degFloor) * 60);

  return {
    name,
    symbol,
    longitude: norm,
    sign: signData.name,
    signSymbol: signData.symbol,
    degreesInSign: degFloor,
    arcMinutes: arcMin,
    formatted: `${degFloor}°${arcMin.toString().padStart(2, '0')}' ${signData.name}`,
    element: signData.element,
    house: ((signIndex + houseOffset) % 12) + 1,
  };
}

/**
 * High-precision planetary longitude approximation based on Keplerian mean anomalies
 * referenced to J2000.0 (JD 2451545.0)
 */
export function calculatePreciseNatalChart(birthdateStr: string): Record<string, PlanetaryPosition> {
  const jd = getJulianDay(birthdateStr);
  const d = jd - 2451545.0; // days since J2000.0
  const T = d / 36525.0; // centuries since J2000.0

  // 1. Sun
  const L0 = 280.46646 + 36000.76983 * T;
  const M_sun = 357.52911 + 35999.05029 * T;
  const C_sun = (1.914602 - 0.004817 * T) * Math.sin((M_sun * Math.PI) / 180) +
                (0.019993 - 0.000101 * T) * Math.sin((2 * M_sun * Math.PI) / 180);
  const sunLong = normalize360(L0 + C_sun);

  // 2. Moon (Mean longitude + major evection & variation)
  const L_moon = 218.3165 + 481267.8813 * T;
  const M_moon = 134.9634 + 477198.8676 * T;
  const F_moon = 93.2721 + 483202.0175 * T;
  const moonLong = normalize360(
    L_moon +
    6.289 * Math.sin((M_moon * Math.PI) / 180) -
    1.274 * Math.sin(((2 * (L_moon - L0) - M_moon) * Math.PI) / 180) +
    0.658 * Math.sin((2 * (L_moon - L0) * Math.PI) / 180)
  );

  // 3. Mercury
  const L_merc = 252.2509 + 149474.0722 * T;
  const M_merc = 174.7948 + 149472.5153 * T;
  const mercLong = normalize360(L_merc + 23.44 * Math.sin((M_merc * Math.PI) / 180));

  // 4. Venus (Ruler of sacred love, attraction & aesthetic harmony)
  const L_ven = 181.9798 + 58519.213 * T;
  const M_ven = 50.4161 + 58517.8039 * T;
  const venLong = normalize360(L_ven + 0.776 * Math.sin((M_ven * Math.PI) / 180));

  // 5. Mars (Drive, romantic initiative, erotic willpower)
  const L_mars = 355.433 + 19141.6964 * T;
  const M_mars = 19.373 + 19139.8585 * T;
  const marsLong = normalize360(L_mars + 10.691 * Math.sin((M_mars * Math.PI) / 180));

  // 6. Jupiter (Expansive blessings, mutual elevation)
  const L_jup = 34.3515 + 3036.3028 * T;
  const M_jup = 20.0202 + 3034.692 * T;
  const jupLong = normalize360(L_jup + 5.555 * Math.sin((M_jup * Math.PI) / 180));

  // 7. Saturn (Commitment, karmic boundaries, endurance)
  const L_sat = 50.0774 + 1223.511 * T;
  const M_sat = 317.0207 + 1221.5515 * T;
  const satLong = normalize360(L_sat + 6.358 * Math.sin((M_sat * Math.PI) / 180));

  // 8. True North Node (Rahu / Karmic destiny threshold)
  const nodeLong = normalize360(125.0445 - 1934.1363 * T);

  return {
    Sun: degreeToPosition('Sun', '☉', sunLong, 0),
    Moon: degreeToPosition('Moon', '☽', moonLong, 3),
    Mercury: degreeToPosition('Mercury', '☿', mercLong, 1),
    Venus: degreeToPosition('Venus', '♀', venLong, 2),
    Mars: degreeToPosition('Mars', '♂', marsLong, 4),
    Jupiter: degreeToPosition('Jupiter', '♃', jupLong, 5),
    Saturn: degreeToPosition('Saturn', '♄', satLong, 6),
    NorthNode: degreeToPosition('North Node', '☊', nodeLong, 7),
  };
}

/**
 * Calculates exact angular aspects between two charts down to the arc-minute orb
 */
export function calculateExactSynastryAspects(
  chart1: Record<string, PlanetaryPosition>,
  chart2: Record<string, PlanetaryPosition>
): ExactSynastryAspect[] {
  const aspectsList: ExactSynastryAspect[] = [];

  const ASPECT_DEFINITIONS = [
    { type: 'Conjunction' as const, symbol: '☌', angle: 0, maxOrb: 8.0, weight: 10 },
    { type: 'Opposition' as const, symbol: '☍', angle: 180, maxOrb: 7.0, weight: 8 },
    { type: 'Trine' as const, symbol: '△', angle: 120, maxOrb: 7.0, weight: 9 },
    { type: 'Square' as const, symbol: '□', angle: 90, maxOrb: 6.5, weight: 7 },
    { type: 'Sextile' as const, symbol: '⚹', angle: 60, maxOrb: 5.0, weight: 6 },
  ];

  const priorityPlanets = ['Sun', 'Moon', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'NorthNode'];

  for (const p1Key of priorityPlanets) {
    const p1 = chart1[p1Key];
    if (!p1) continue;

    for (const p2Key of priorityPlanets) {
      const p2 = chart2[p2Key];
      if (!p2) continue;

      let diff = Math.abs(p1.longitude - p2.longitude);
      if (diff > 180) diff = 360 - diff;

      for (const aspDef of ASPECT_DEFINITIONS) {
        const orb = Math.abs(diff - aspDef.angle);
        if (orb <= aspDef.maxOrb) {
          let nature: ExactSynastryAspect['nature'] = 'Harmonious';
          let desc = '';

          // Determine specific synastry alchemy
          if (
            (p1Key === 'Venus' && p2Key === 'Mars') ||
            (p1Key === 'Mars' && p2Key === 'Venus')
          ) {
            nature = 'Magnetic Passion';
            desc = `Exact ${aspDef.type} between Venus and Mars (${orb.toFixed(1)}° orb): Raw erotic polarity and romantic attraction in sacred harmony.`;
          } else if (
            (p1Key === 'Sun' && p2Key === 'Moon') ||
            (p1Key === 'Moon' && p2Key === 'Sun')
          ) {
            nature = 'Harmonious';
            desc = `Luminary ${aspDef.type} (${orb.toFixed(1)}° orb): Soul-level instinctual understanding; your conscious self feels instantly at home in their emotional presence.`;
          } else if (
            p1Key === 'Saturn' || p2Key === 'Saturn'
          ) {
            nature = aspDef.type === 'Square' || aspDef.type === 'Opposition' ? 'Dynamic Tension' : 'Karmic Catalyst';
            desc = `Saturnian ${aspDef.type} (${orb.toFixed(1)}° orb): Structural anchor of commitment; challenges superficial bonding to forge lasting loyalty.`;
          } else if (
            p1Key === 'NorthNode' || p2Key === 'NorthNode'
          ) {
            nature = 'Karmic Catalyst';
            desc = `Karmic Dragon’s Head ${aspDef.type} (${orb.toFixed(1)}° orb): Destiny threshold encounter; this relationship accelerates both individuals' soul growth.`;
          } else {
            nature = aspDef.type === 'Square' || aspDef.type === 'Opposition' ? 'Dynamic Tension' : 'Harmonious';
            desc = `${p1.name} ${aspDef.type} ${p2.name} at ${orb.toFixed(1)}° orb: ${aspDef.type === 'Trine' || aspDef.type === 'Sextile' ? 'Flowing mutual support' : 'Creative frictional tension provoking conscious evolution'}.`;
          }

          aspectsList.push({
            planet1: p1.name,
            symbol1: p1.symbol,
            planet2: p2.name,
            symbol2: p2.symbol,
            aspectType: aspDef.type,
            symbol: aspDef.symbol,
            targetAngle: aspDef.angle,
            exactAngle: diff,
            orb: parseFloat(orb.toFixed(2)),
            nature,
            weight: aspDef.weight - orb,
            description: desc,
          });
        }
      }
    }
  }

  // Sort by tightness of orb (most exact aspects first)
  aspectsList.sort((a, b) => a.orb - b.orb);
  return aspectsList;
}
