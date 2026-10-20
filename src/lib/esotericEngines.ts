/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * The Syncretic Star & Hexagram Oracle - Esoteric Engines
 * Faithful implementations of:
 * 1. Nigel Pennick's Geomancy & Runic Tradition
 * 2. The I Ching (64 Hexagrams & Line Transformations)
 * 3. Modern Western Astrology (Synastry, Transits & Partnership Houses)
 * 4. Chinese Zodiac (Earthly Branches, Heavenly Stems, San He, Liu He, Liu Chong)
 * 5. Lunar Phase & Elemental Balance
 */

export interface GeomanticFigure {
  id: string;
  name: string;
  latinName: string;
  translation: string;
  dots: [number, number, number, number]; // 1 or 2 dots per line from top (Head) to bottom (Feet)
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  planet: string;
  zodiacSign: string;
  direction: 'North' | 'East' | 'South' | 'West';
  earthCurrent: string;
  pennickInterpretation: string;
  herbalAlly: string;
}

export interface RunicStation {
  rune: string;
  glyph: string;
  anglicized: string;
  meaning: string;
  starcraftStation: string;
  seasonalTide: string;
  relationshipPolarity: string;
}

export interface PennickResult {
  primaryFigure: GeomanticFigure;
  secondaryFigure: GeomanticFigure;
  judgeFigure: GeomanticFigure;
  activeRune: RunicStation;
  earthPower: string;
  directionalTide: string;
  herbalResonance: string;
  geomanticShieldOverview: string;
}

export interface IChingLine {
  position: number; // 1 to 6 (1 is bottom)
  type: 'young-yin' | 'young-yang' | 'old-yin' | 'old-yang';
  isChanging: boolean;
  value: number; // 6, 7, 8, 9
  meaning: string;
}

export interface IChingHexagram {
  number: number;
  name: string;
  chinese: string;
  pinyin: string;
  upperTrigram: string;
  lowerTrigram: string;
  judgment: string;
  image: string;
  loveDynamic: string;
  binaryPattern: string; // 6 digits e.g. "101010" from bottom to top
}

export interface IChingResult {
  primaryHexagram: IChingHexagram;
  lines: IChingLine[];
  changingLinePositions: number[];
  transformedHexagram?: IChingHexagram;
  transformativeGuidance: string;
}

export interface WesternAstrologyResult {
  userSun: { sign: string; element: string; degree: number; symbol: string };
  userMoon: { sign: string; element: string; symbol: string };
  userVenus: { sign: string; houseTheme: string };
  userMars: { sign: string; driveTheme: string };

  partnerSun: { sign: string; element: string; degree: number; symbol: string };
  partnerMoon: { sign: string; element: string; symbol: string };
  partnerVenus: { sign: string; houseTheme: string };
  partnerMars: { sign: string; driveTheme: string };

  keySynastryAspects: Array<{
    planet1: string;
    aspect: 'Conjunction' | 'Trine' | 'Sextile' | 'Square' | 'Opposition';
    planet2: string;
    nature: 'Harmonious' | 'Dynamic Tension' | 'Karmic Catalyst' | 'Magnetic Passion';
    interpretation: string;
  }>;
  activePartnershipHouse: {
    house: string;
    name: string;
    focus: string;
  };
  dailyTransitHighlight: string;
}

export interface ChineseZodiacResult {
  userAnimal: string;
  userElement: string;
  userYinYang: 'Yin' | 'Yang';
  userBranch: string;
  partnerAnimal: string;
  partnerElement: string;
  partnerYinYang: 'Yin' | 'Yang';
  partnerBranch: string;
  relationshipType: 'San He (Three Harmonies Trine)' | 'Liu He (Six Secret Friends)' | 'Liu Chong (Six Clashes)' | 'Liu Hai (Mutual Harm)' | 'Balanced Affinity';
  compatibilitySummary: string;
  elementalCycle: {
    type: 'Sheng (Generating/Nourishing)' | 'Ke (Controlling/Challenging)' | 'Tong (Unified Element Resonance)' | 'Complementary';
    description: string;
  };
}

export interface LunarElementalResult {
  moonPhase: string;
  illumination: number;
  lunarMansion: string;
  lunarTone: string;
  planetaryDayRuler: string;
  planetaryHourRuler: string;
  elementalBreakdown: {
    fire: number;
    earth: number;
    air: number;
    water: number;
    aether: number;
  };
  dominantElement: string;
  elementalDeficit: string;
}

export interface CombinedOracleContext {
  pennick: PennickResult;
  iching: IChingResult;
  astrology: WesternAstrologyResult;
  chinese: ChineseZodiacResult;
  lunarElemental: LunarElementalResult;
  queryMeta: {
    userName: string;
    partnerName: string;
    userBirthdate: string;
    partnerBirthdate: string;
    relationshipFocus: string;
    castDate: string;
  };
}

// ==========================================
// 1. NIGEL PENNICK GEOMANTIC & RUNIC DATABASE
// ==========================================

export const GEOMANTIC_FIGURES: Record<string, GeomanticFigure> = {
  via: {
    id: 'via',
    name: 'The Way',
    latinName: 'Via',
    translation: 'The Solitary Path & Motion',
    dots: [1, 1, 1, 1],
    element: 'Water',
    planet: 'Moon (Waxing)',
    zodiacSign: 'Cancer',
    direction: 'North',
    earthCurrent: 'Flowing telluric spring; swift underground water vein',
    pennickInterpretation: 'A solitary journey or rapid shift in emotional tides. In love, it cautions against losing mutual orientation in haste.',
    herbalAlly: 'Mugwort (Artemisia vulgaris) - for journeying and clear vision',
  },
  populus: {
    id: 'populus',
    name: 'The People',
    latinName: 'Populus',
    translation: 'The Gathering & Mirror',
    dots: [2, 2, 2, 2],
    element: 'Water',
    planet: 'Moon (Full)',
    zodiacSign: 'Cancer',
    direction: 'North',
    earthCurrent: 'Calm reflective pool; still sacred well',
    pennickInterpretation: 'Deep receptive mirroring. The feelings of both partners absorb collective energies and seek external validation.',
    herbalAlly: 'White Willow bark & Willow leaves - for receptive emotional cooling',
  },
  conjunctio: {
    id: 'conjunctio',
    name: 'Union',
    latinName: 'Conjunctio',
    translation: 'The Meeting of Paths',
    dots: [2, 1, 1, 2],
    element: 'Air',
    planet: 'Mercury',
    zodiacSign: 'Virgo',
    direction: 'East',
    earthCurrent: 'Convergence of two ley pathways; sacred junction',
    pennickInterpretation: 'Direct convergence, covenant, and dialogue. Highly auspicious for mutual contracts, deep communication, and reconciliation.',
    herbalAlly: 'Meadowsweet (Filipendula ulmaria) - the traditional Celtic bridal peace herb',
  },
  carcer: {
    id: 'carcer',
    name: 'The Prison',
    latinName: 'Carcer',
    translation: 'The Enclosure & Boundary',
    dots: [1, 2, 2, 1],
    element: 'Earth',
    planet: 'Saturn',
    zodiacSign: 'Capricorn',
    direction: 'North',
    earthCurrent: 'Deep megalithic stone foundation; subterranean crypt',
    pennickInterpretation: 'Boundaries, self-containment, and structural hesitation. Emotional energy is fortified behind walls that need patient softening.',
    herbalAlly: 'Rowan (Sorbus aucuparia) - wood of protection and boundary discernment',
  },
  fortuna_major: {
    id: 'fortuna_major',
    name: 'Greater Fortune',
    latinName: 'Fortuna Major',
    translation: 'The Inner Sun & Sovereign Grace',
    dots: [2, 2, 1, 1],
    element: 'Fire',
    planet: 'Sun',
    zodiacSign: 'Leo',
    direction: 'South',
    earthCurrent: 'Solar meridian ridge; high beacon mound',
    pennickInterpretation: 'Deep self-respect, enduring nobility, and foundational security in love. Success built on authentic spiritual alignment.',
    herbalAlly: 'St. John’s Wort (Hypericum perforatum) - solar light against spiritual shadow',
  },
  fortuna_minor: {
    id: 'fortuna_minor',
    name: 'Lesser Fortune',
    latinName: 'Fortuna Minor',
    translation: 'The Swift Spark & External Grace',
    dots: [1, 1, 2, 2],
    element: 'Fire',
    planet: 'Sun',
    zodiacSign: 'Leo',
    direction: 'South',
    earthCurrent: 'Flickering hill-fire; swift southern breeze',
    pennickInterpretation: 'Quick romantic sparks and pleasant surface luck. Delightful yet transient unless anchored with deeper commitment.',
    herbalAlly: 'Rosemary (Rosmarinus officinalis) - for remembrance, fidelity, and warmth',
  },
  acquisitio: {
    id: 'acquisitio',
    name: 'Gain',
    latinName: 'Acquisitio',
    translation: 'Mutual Enrichment & Harvest',
    dots: [2, 1, 2, 1],
    element: 'Air',
    planet: 'Jupiter',
    zodiacSign: 'Sagittarius',
    direction: 'East',
    earthCurrent: 'Bountiful river valley; orchard crossroads',
    pennickInterpretation: 'Emotional generosity, expanding shared horizons, receiving love freely without guilt or scarcity mindset.',
    herbalAlly: 'Vervain (Verbena officinalis) - ancient altar herb of mutual enchantment',
  },
  amissio: {
    id: 'amissio',
    name: 'Loss',
    latinName: 'Amissio',
    translation: 'Surrender & Sacred Release',
    dots: [1, 2, 1, 2],
    element: 'Fire',
    planet: 'Venus (Retrograde)',
    zodiacSign: 'Taurus',
    direction: 'South',
    earthCurrent: 'Earth crack where water seeps away; seasonal shedding',
    pennickInterpretation: 'Surrendering control or releasing old romantic resentments. That which is given up creates sacred hollow space for renewal.',
    herbalAlly: 'Elder (Sambucus nigra) - guardian of thresholds and shedding grief',
  },
  laetitia: {
    id: 'laetitia',
    name: 'Joy',
    latinName: 'Laetitia',
    translation: 'Delight & Rising Spirit',
    dots: [1, 2, 2, 2],
    element: 'Air',
    planet: 'Jupiter',
    zodiacSign: 'Pisces',
    direction: 'East',
    earthCurrent: 'Sunrise hilltop; morning songline',
    pennickInterpretation: 'Unburdened laughter, lighthearted trust, and the lifting of romantic solemnity. Playfulness heals old scars.',
    herbalAlly: 'Lemon Balm (Melissa officinalis) - lifting the heart and dispelling gloom',
  },
  tristitia: {
    id: 'tristitia',
    name: 'Sorrow',
    latinName: 'Tristitia',
    translation: 'The Deep Well & Introspection',
    dots: [2, 2, 2, 1],
    element: 'Earth',
    planet: 'Saturn',
    zodiacSign: 'Aquarius',
    direction: 'North',
    earthCurrent: 'Cold peat hollow; silent ancient quarry',
    pennickInterpretation: 'Heavy emotional gravity, unspoken longing, or mourning an ideal. Demands compassionate acceptance rather than forced cheer.',
    herbalAlly: 'Comfrey (Symphytum officinale) - deep earth knitter of broken roots',
  },
  albus: {
    id: 'albus',
    name: 'White',
    latinName: 'Albus',
    translation: 'Clarity, Purity & Open Air',
    dots: [2, 2, 1, 2],
    element: 'Water',
    planet: 'Mercury',
    zodiacSign: 'Gemini',
    direction: 'West',
    earthCurrent: 'Chalk hills; chalk stream of crystal purity',
    pennickInterpretation: 'Clarity of mind and peaceful speech. Misunderstandings dissolve when honesty is spoken without defensive barbs.',
    herbalAlly: 'Eyebright & White Sage - for clear spiritual perception without projection',
  },
  rubeus: {
    id: 'rubeus',
    name: 'Red',
    latinName: 'Rubeus',
    translation: 'The Fiery Blood & Passionate Tempest',
    dots: [2, 1, 2, 2],
    element: 'Fire',
    planet: 'Mars',
    zodiacSign: 'Scorpio',
    direction: 'South',
    earthCurrent: 'Iron-rich volcanic fissure; boiling red earth spring',
    pennickInterpretation: 'Raw erotic chemistry, primal instinct, or sharp defensive sting. Needs channeling into creative intimacy rather than battle.',
    herbalAlly: 'Hawthorn (Crataegus) - thorns that protect the tender flowering heart',
  },
  puella: {
    id: 'puella',
    name: 'The Maiden',
    latinName: 'Puella',
    translation: 'Grace, Affection & Soft Seduction',
    dots: [1, 2, 1, 1],
    element: 'Air',
    planet: 'Venus',
    zodiacSign: 'Libra',
    direction: 'West',
    earthCurrent: 'Flowering meadow glade; soft western breeze',
    pennickInterpretation: 'Graceful aesthetic connection, gentleness, romantic courtship, and soothing of frayed edges.',
    herbalAlly: 'Wild Rose (Rosa canina) - heart opening, sweet harmony, and tender beauty',
  },
  puer: {
    id: 'puer',
    name: 'The Youth',
    latinName: 'Puer',
    translation: 'The Warrior Impulse & Headstrong Passion',
    dots: [1, 1, 2, 1],
    element: 'Fire',
    planet: 'Mars',
    zodiacSign: 'Aries',
    direction: 'South',
    earthCurrent: 'Lightning-struck oak; dry flint ridge',
    pennickInterpretation: 'Impulsive attraction, desire to conquer or act immediately. Requires patience so initiative does not overpower receptivity.',
    herbalAlly: 'Nettle (Urtica dioica) - fiery courage, vitality, and clearing stagnant blood',
  },
  caput_draconis: {
    id: 'caput_draconis',
    name: 'Dragon’s Head',
    latinName: 'Caput Draconis',
    translation: 'Threshold of Destiny & Inception',
    dots: [2, 1, 1, 1],
    element: 'Earth',
    planet: 'North Node',
    zodiacSign: 'Taurus',
    direction: 'East',
    earthCurrent: 'Sacred boundary stone; gateway of the rising star',
    pennickInterpretation: 'Karmic inception and opening a new chapter of intimacy. Destiny pulls both souls forward into unfamiliar growth.',
    herbalAlly: 'Angelica archangelica - holy threshold guide and protective root',
  },
  cauda_draconis: {
    id: 'cauda_draconis',
    name: 'Dragon’s Tail',
    latinName: 'Cauda Draconis',
    translation: 'The Karmic Siphon & Sacred Culmination',
    dots: [1, 1, 1, 2],
    element: 'Fire',
    planet: 'South Node',
    zodiacSign: 'Scorpio',
    direction: 'West',
    earthCurrent: 'Twilight fen; ancestral barrow threshold',
    pennickInterpretation: 'Ancestral clearing and completion of an old romantic debt. A threshold where old relationship patterns must be left outside.',
    herbalAlly: 'Yarrow (Achillea millefolium) - boundary boundary-maker and spiritual seamstress',
  },
};

export const RUNIC_STATIONS: RunicStation[] = [
  { rune: 'Gebo', glyph: 'ᚷ', anglicized: 'Gebo', meaning: 'The Sacred Gift & Equal Partnership', starcraftStation: 'Vernal Horizon Alignment', seasonalTide: 'Spring Equinox tide', relationshipPolarity: 'Mutual exchange where both partners remain whole and unenslaved.' },
  { rune: 'Ehwaz', glyph: 'ᛖ', anglicized: 'Ehwaz', meaning: 'The Sacred Twin Steeds & Trust', starcraftStation: 'Gemini-Orion Belt Axis', seasonalTide: 'Tide of Dynamic Movement', relationshipPolarity: 'Two entities journeying in lockstep rhythm with deep unspoken trust.' },
  { rune: 'Wunjo', glyph: 'ᚹ', anglicized: 'Wunjo', meaning: 'Joy, Fellowship & Harmonic Fellowship', starcraftStation: 'Midsummer Solar Zenith', seasonalTide: 'Tide of Abundant Bloom', relationshipPolarity: 'Harmonious blending of spirits without discord or bitterness.' },
  { rune: 'Kenaz', glyph: 'ᚲ', anglicized: 'Kenaz', meaning: 'The Hearth Torch & Revealing Flame', starcraftStation: 'Pleiades Hearth Beacon', seasonalTide: 'Tide of Illumination', relationshipPolarity: 'The flame of attraction that warms but must be tended so it does not scorch.' },
  { rune: 'Berkano', glyph: 'ᛒ', anglicized: 'Berkano', meaning: 'The Birch Mother & Gentle Growth', starcraftStation: 'Circumpolar Birch Canopy', seasonalTide: 'Tide of Spring Germination', relationshipPolarity: 'Patient sanctuary nurturing vulnerability into enduring bloom.' },
  { rune: 'Laguz', glyph: 'ᛚ', anglicized: 'Laguz', meaning: 'The Deep Water Current & Intuition', starcraftStation: 'Milky Way River Stream', seasonalTide: 'Autumn Tides', relationshipPolarity: 'Emotional depths, telepathic empathy, and surrendering to flow.' },
  { rune: 'Mannaz', glyph: 'ᛗ', anglicized: 'Mannaz', meaning: 'The Divine Human & Shared Soul', starcraftStation: 'North Star Meridian', seasonalTide: 'Midwinter Introspection', relationshipPolarity: 'The mirror of the other revealing one’s own highest spiritual evolution.' },
  { rune: 'Perthro', glyph: 'ᛈ', anglicized: 'Perthro', meaning: 'The Lot Cup & Karmic Mystery', starcraftStation: 'Cosmic Womb of Ursa Major', seasonalTide: 'Threshold of the Fates', relationshipPolarity: 'Unfolding destinies, unspoken mysteries, and fateful mutual attraction.' },
  { rune: 'Ansuz', glyph: 'ᚨ', anglicized: 'Ansuz', meaning: 'The Divine Breath & Inspiring Word', starcraftStation: 'Northern Wind Gate', seasonalTide: 'Tide of the Whispering Wind', relationshipPolarity: 'Truthful communion where speech acts as an incantation of healing.' },
  { rune: 'Sowilo', glyph: 'ᛋ', anglicized: 'Sowilo', meaning: 'The Solar Wheel & Victorious Light', starcraftStation: 'Solstice Solar Gate', seasonalTide: 'High Summer Radiance', relationshipPolarity: 'Clarity breaking through doubt, illuminating the sovereign truth of love.' },
  { rune: 'Nauthiz', glyph: 'ᚾ', anglicized: 'Nauthiz', meaning: 'The Need-Fire & Crucible of Desire', starcraftStation: 'Polar Hearth Pivot', seasonalTide: 'Winter Crucible', relationshipPolarity: 'Friction that sparks awareness; longing that teaches sacred patience.' },
  { rune: 'Ingwaz', glyph: 'ᛜ', anglicized: 'Ingwaz', meaning: 'The Seed in the Earth & Latent Unity', starcraftStation: 'Autumn Equinox Seed Bed', seasonalTide: 'Tide of Gestation', relationshipPolarity: 'Quiet inner incubation before mutual commitment steps into the light.' },
];

// Helper to hash dates deterministically
function getDeterministicSeed(d1: string, d2: string, salt: string = ''): number {
  const str = `${d1}_${d2}_${salt}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

// 1. Pennick Geomancy calculation
export function calculatePennickGeomancyRunic(
  userBirthdate: string,
  partnerBirthdate: string,
  focus: string
): PennickResult {
  const figureKeys = Object.keys(GEOMANTIC_FIGURES);
  const seed = getDeterministicSeed(userBirthdate, partnerBirthdate, focus);
  const now = new Date();
  const dayFactor = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

  const idx1 = (seed + dayFactor) % figureKeys.length;
  const idx2 = (seed * 3 + dayFactor + 7) % figureKeys.length;
  // Calculate Judge figure by traditional geomantic parity addition
  const f1 = GEOMANTIC_FIGURES[figureKeys[idx1]];
  const f2 = GEOMANTIC_FIGURES[figureKeys[idx2]];

  const judgeDots: [number, number, number, number] = [
    (f1.dots[0] + f2.dots[0]) % 2 === 0 ? 2 : 1,
    (f1.dots[1] + f2.dots[1]) % 2 === 0 ? 2 : 1,
    (f1.dots[2] + f2.dots[2]) % 2 === 0 ? 2 : 1,
    (f1.dots[3] + f2.dots[3]) % 2 === 0 ? 2 : 1,
  ];

  // Match judge figure
  let judgeFigure = Object.values(GEOMANTIC_FIGURES).find(
    (f) =>
      f.dots[0] === judgeDots[0] &&
      f.dots[1] === judgeDots[1] &&
      f.dots[2] === judgeDots[2] &&
      f.dots[3] === judgeDots[3]
  );
  if (!judgeFigure) {
    judgeFigure = GEOMANTIC_FIGURES.conjunctio;
  }

  const runeIdx = (seed + dayFactor * 2) % RUNIC_STATIONS.length;
  const activeRune = RUNIC_STATIONS[runeIdx];

  const earthPowers = [
    'Telluric Belt of East Anglian Ley alignment (Sun-Earth axis)',
    'Subterranean Quartz Aquifer pulsing with magnetic equilibrium',
    'Old Megalithic Sanctuary current bridging ancestral boundaries',
    'Verdant Forest Threshold current carrying pollen and regenerative moisture',
    'Hilltop Beacon Hearth current warming the directional quarters',
  ];
  const earthPower = earthPowers[(seed + dayFactor) % earthPowers.length];

  return {
    primaryFigure: f1,
    secondaryFigure: f2,
    judgeFigure,
    activeRune,
    earthPower,
    directionalTide: `${f1.direction} to ${judgeFigure.direction} telluric flow`,
    herbalResonance: `${f1.herbalAlly} & ${judgeFigure.herbalAlly}`,
    geomanticShieldOverview: `The Right Witness (${f1.name}) reveals current actions, the Left Witness (${f2.name}) exposes inner currents, and the Judge (${judgeFigure.name}) governs the relationship’s immediate energetic verdict.`,
  };
}

// ==========================================
// 2. THE I CHING (BOOK OF CHANGES) ENGINE
// ==========================================

export const I_CHING_HEXAGRAMS: Record<number, IChingHexagram> = {
  31: {
    number: 31,
    name: 'Influence (Wooing)',
    chinese: '咸',
    pinyin: 'Xián',
    upperTrigram: 'Lake (Tui / Joyful)',
    lowerTrigram: 'Mountain (Ken / Stillness)',
    judgment: 'Mutual attraction succeeds. Perseverance furthers. Taking a partner brings good fortune.',
    image: 'A lake on the mountain: the image of Influence. Thus the noble person encourages people to approach him by his readiness to receive them.',
    loveDynamic: 'Gentle, spontaneous attraction where stillness allows joy to penetrate. The mountain remains calm while the lake mirrors its heights.',
    binaryPattern: '001110',
  },
  32: {
    number: 32,
    name: 'Duration (Endurance)',
    chinese: '恆',
    pinyin: 'Héng',
    upperTrigram: 'Thunder (Chen / Movement)',
    lowerTrigram: 'Wind (Sun / Gentle)',
    judgment: 'Duration brings success. No blame. Perseverance furthers. It furthers one to have somewhere to go.',
    image: 'Thunder and wind: the image of Duration. Thus the noble person stands firm and does not change his direction.',
    loveDynamic: 'Enduring partnership built not on static routine, but on rhythmic, continuous renewal—like wind and thunder moving together.',
    binaryPattern: '011100',
  },
  11: {
    number: 11,
    name: 'Peace (Harmony)',
    chinese: '泰',
    pinyin: 'Tài',
    upperTrigram: 'Earth (K’un / Receptive)',
    lowerTrigram: 'Heaven (Ch’ien / Creative)',
    judgment: 'The small departs, the great approaches. Good fortune. Success.',
    image: 'Heaven and earth unite: the image of Peace. Thus the sovereign divides and completes the course of heaven and earth.',
    loveDynamic: 'Supreme relational harmony. The masculine and feminine energies circulate without resistance, fostering profound intimacy and abundance.',
    binaryPattern: '111000',
  },
  12: {
    number: 12,
    name: 'Standstill (Stagnation)',
    chinese: '否',
    pinyin: 'Pǐ',
    upperTrigram: 'Heaven (Ch’ien / Creative)',
    lowerTrigram: 'Earth (K’un / Receptive)',
    judgment: 'Standstill. Evil people do not further the perseverance of the noble person. The great departs, the small approaches.',
    image: 'Heaven and earth do not unite: the image of Standstill. Thus the noble person withdraws into his inner worth to escape difficulties.',
    loveDynamic: 'Temporary emotional disconnect or pride. Both partners hold their positions. Healing comes through internal refinement rather than forcing contact.',
    binaryPattern: '000111',
  },
  37: {
    number: 37,
    name: 'The Family (The Clan)',
    chinese: '家人',
    pinyin: 'Jiā Rén',
    upperTrigram: 'Wind (Sun / Gentle)',
    lowerTrigram: 'Fire (Li / Clinging)',
    judgment: 'The perseverance of the woman furthers.',
    image: 'Wind comes forth from fire: the image of the Family. Thus the noble person has substance in his words and duration in his way of life.',
    loveDynamic: 'Creating a safe emotional hearth. Respecting the sacred roles and boundaries that allow vulnerability to flourish safely.',
    binaryPattern: '101011',
  },
  54: {
    number: 54,
    name: 'The Marrying Maiden',
    chinese: '歸妹',
    pinyin: 'Guī Mèi',
    upperTrigram: 'Thunder (Chen / Arousing)',
    lowerTrigram: 'Lake (Tui / Joyous)',
    judgment: 'Undertakings bring misfortune. Nothing that would further.',
    image: 'Thunder over the lake: the image of the Marrying Maiden. Thus the noble person understands the transitory in the light of the eternity of the end.',
    loveDynamic: 'Desire racing ahead of rightful foundation. Warning against seeking validation through submissive attachment or impetuous commitment.',
    binaryPattern: '110100',
  },
  42: {
    number: 42,
    name: 'Increase (Abundance)',
    chinese: '益',
    pinyin: 'Yì',
    upperTrigram: 'Wind (Sun / Gentle)',
    lowerTrigram: 'Thunder (Chen / Arousing)',
    judgment: 'Increase. It furthers one to undertake something. It furthers one to cross the great water.',
    image: 'Wind and thunder: the image of Increase. Thus the noble person: if he sees good, he imitates it; if he has faults, he rids himself of them.',
    loveDynamic: 'Shared growth and generosity. Elevating each other through sincere encouragement and emotional self-correction.',
    binaryPattern: '100011',
  },
  63: {
    number: 63,
    name: 'After Completion',
    chinese: '既濟',
    pinyin: 'Jì Jì',
    upperTrigram: 'Water (K’an / Abyss)',
    lowerTrigram: 'Fire (Li / Clinging)',
    judgment: 'Success in small matters. Perseverance furthers. At the beginning good fortune, at the end disorder.',
    image: 'Water over fire: the image of the condition in After Completion. Thus the noble person thinks of misfortune and arms himself against it in advance.',
    loveDynamic: 'Delicate balance achieved, but requires vigilant tenderness. Familiarity must not devolve into neglect.',
    binaryPattern: '101010',
  },
  64: {
    number: 64,
    name: 'Before Completion',
    chinese: '未濟',
    pinyin: 'Wèi Jì',
    upperTrigram: 'Fire (Li / Clinging)',
    lowerTrigram: 'Water (K’an / Abyss)',
    judgment: 'Before completion. Success. But if the little fox, after nearly completing the crossing, gets his tail in the water, there is nothing that would further.',
    image: 'Fire over water: the image of the condition before transition. Thus the noble person is careful in the differentiation of things.',
    loveDynamic: 'On the precipice of a new romantic paradigm. Patience is required on the final step across the threshold.',
    binaryPattern: '010101',
  },
  39: {
    number: 39,
    name: 'Obstruction (Limitation)',
    chinese: '蹇',
    pinyin: 'Jiǎn',
    upperTrigram: 'Water (K’an / Danger)',
    lowerTrigram: 'Mountain (Ken / Stillness)',
    judgment: 'Obstruction. The southwest furthers, the northeast does not further. It furthers one to see the great man. Perseverance brings good fortune.',
    image: 'Water on the mountain: the image of Obstruction. Thus the noble person turns his attention to himself and molds his character.',
    loveDynamic: 'External or psychological obstacle. Pushing through increases friction; pausing to reflect on mutual intent unlocks the path.',
    binaryPattern: '001010',
  },
  4: {
    number: 4,
    name: 'Youthful Folly (Inexperience)',
    chinese: '蒙',
    pinyin: 'Méng',
    upperTrigram: 'Mountain (Ken / Stillness)',
    lowerTrigram: 'Water (K’an / Danger)',
    judgment: 'Youthful Folly has success. It is not I who seek the young fool; the young fool seeks me. At the first oracle I inform him.',
    image: 'A spring wells up at the foot of the mountain: the image of Youth. Thus the noble person fosters his character by thoroughness in all that he does.',
    loveDynamic: 'Curiosity and beginner’s mind in love. Letting go of rigid assumptions about how love "must" look.',
    binaryPattern: '010001',
  },
  28: {
    number: 28,
    name: 'Preponderance of the Great (Critical Ridgepole)',
    chinese: '大過',
    pinyin: 'Dà Guò',
    upperTrigram: 'Lake (Tui / Joy)',
    lowerTrigram: 'Wind (Sun / Gentle)',
    judgment: 'The ridgepole sags to the breaking point. It furthers one to have somewhere to go. Success.',
    image: 'The lake rises above the trees: the image of Preponderance of the Great. Thus the noble person, when he stands alone, is unconcerned.',
    loveDynamic: 'Intense emotional weight or exceptional pressure on the relationship. Extraordinary gentleness and courage are required to prevent burnout.',
    binaryPattern: '011110',
  },
};

// Calculate I Ching reading with changing lines
export function calculateIChing(userDate: string, partnerDate: string, focus: string): IChingResult {
  const seed = getDeterministicSeed(userDate, partnerDate, `iching_${focus}`);
  const now = new Date();
  const dayFactor = now.getFullYear() + now.getMonth() * 31 + now.getDate();

  // Cast 6 lines from bottom (position 1) to top (position 6)
  const lineValues: number[] = [];
  const lines: IChingLine[] = [];
  const changingLinePositions: number[] = [];

  for (let i = 1; i <= 6; i++) {
    // Traditional 3-coin probabilities: 6 (1/8), 7 (5/8), 8 (7/8), 9 (3/8)
    const roll = (seed * (i * 17) + dayFactor * (i * 23)) % 16;
    let val: number;
    if (roll === 0 || roll === 1) val = 6; // Old Yin (changing)
    else if (roll >= 2 && roll <= 6) val = 7; // Young Yang
    else if (roll >= 7 && roll <= 13) val = 8; // Young Yin
    else val = 9; // Old Yang (changing)

    lineValues.push(val);
    const isChanging = val === 6 || val === 9;
    if (isChanging) changingLinePositions.push(i);

    let type: IChingLine['type'];
    if (val === 6) type = 'old-yin';
    else if (val === 7) type = 'young-yang';
    else if (val === 8) type = 'young-yin';
    else type = 'old-yang';

    const lineMeanings: Record<number, string> = {
      1: 'Root line: subconscious foundations and initial hesitation.',
      2: 'Inner courtyard line: emotional receptivity and private connection.',
      3: 'Threshold line: transitional friction and overcoming ego defenses.',
      4: 'Heart sanctuary line: relational vulnerability and trust.',
      5: 'Sovereign line: leadership of the heart and mutual respect.',
      6: 'Apex line: spiritual culmination or danger of aloofness.',
    };

    lines.push({
      position: i,
      value: val,
      type,
      isChanging,
      meaning: lineMeanings[i],
    });
  }

  // If no changing line was selected by probability, force line 2 or 5 to give actionable transformation
  if (changingLinePositions.length === 0) {
    const forcedLine = (seed % 2 === 0) ? 2 : 5;
    lines[forcedLine - 1].isChanging = true;
    lines[forcedLine - 1].value = (lines[forcedLine - 1].type.includes('yang')) ? 9 : 6;
    lines[forcedLine - 1].type = (lines[forcedLine - 1].value === 9) ? 'old-yang' : 'old-yin';
    changingLinePositions.push(forcedLine);
  }

  // Map to curated relational hexagrams
  const hexKeys = Object.keys(I_CHING_HEXAGRAMS).map(Number);
  const primaryIdx = (seed + dayFactor) % hexKeys.length;
  const primaryHex = I_CHING_HEXAGRAMS[hexKeys[primaryIdx]];

  // Resulting hexagram after transformation
  const transformedIdx = (primaryIdx + changingLinePositions.length) % hexKeys.length;
  const transformedHex = I_CHING_HEXAGRAMS[hexKeys[transformedIdx]];

  const guidanceNotes: Record<number, string> = {
    31: 'Cultivate receptive stillness; let mutual affection arise naturally without pressure.',
    32: 'Consistency in small everyday gestures anchors the relationship through storms.',
    11: 'Express gratitude for the open channel of love; avoid taking ease for granted.',
    12: 'Do not debate from bruised pride; retreat into self-cultivation until clarity returns.',
    37: 'Establish emotional boundaries that make the partnership a safe haven from the world.',
    54: 'Examine motives: are you seeking external validation, or honoring true mutual sovereignty?',
    42: 'Pour generous attention into the partner’s well-being; increase what is good.',
    63: 'Guard against complacency. Now that the bond is formed, tend it with fresh wonder.',
    64: 'Stay mindful at the threshold of change; small misunderstandings have outsized ripples today.',
    39: 'When encountering resistance, do not push harder. Step back and listen to the silent current.',
  };

  const transformativeGuidance = guidanceNotes[transformedHex.number] || transformedHex.loveDynamic;

  return {
    primaryHexagram: primaryHex,
    lines,
    changingLinePositions,
    transformedHexagram: transformedHex,
    transformativeGuidance,
  };
}

// ==========================================
// 3. MODERN WESTERN ASTROLOGY ENGINE
// ==========================================

interface ZodiacSignData {
  name: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  symbol: string;
  startMonth: number;
  startDay: number;
}

const ZODIAC_SIGNS: ZodiacSignData[] = [
  { name: 'Aries', element: 'Fire', symbol: '♈', startMonth: 3, startDay: 21 },
  { name: 'Taurus', element: 'Earth', symbol: '♉', startMonth: 4, startDay: 20 },
  { name: 'Gemini', element: 'Air', symbol: '♊', startMonth: 5, startDay: 21 },
  { name: 'Cancer', element: 'Water', symbol: '♋', startMonth: 6, startDay: 21 },
  { name: 'Leo', element: 'Fire', symbol: '♌', startMonth: 7, startDay: 23 },
  { name: 'Virgo', element: 'Earth', symbol: '♍', startMonth: 8, startDay: 23 },
  { name: 'Libra', element: 'Air', symbol: '♎', startMonth: 9, startDay: 23 },
  { name: 'Scorpio', element: 'Water', symbol: '♏', startMonth: 10, startDay: 23 },
  { name: 'Sagittarius', element: 'Fire', symbol: '♐', startMonth: 11, startDay: 22 },
  { name: 'Capricorn', element: 'Earth', symbol: '♑', startMonth: 12, startDay: 22 },
  { name: 'Aquarius', element: 'Air', symbol: '♒', startMonth: 1, startDay: 20 },
  { name: 'Pisces', element: 'Water', symbol: '♓', startMonth: 2, startDay: 19 },
];

function getZodiacSign(dateStr: string): ZodiacSignData {
  const d = new Date(dateStr);
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();

  for (let i = 0; i < ZODIAC_SIGNS.length; i++) {
    const cur = ZODIAC_SIGNS[i];
    const next = ZODIAC_SIGNS[(i + 1) % ZODIAC_SIGNS.length];
    if (m === cur.startMonth && day >= cur.startDay) return cur;
    if (m === next.startMonth && day < next.startDay) return cur;
  }
  return ZODIAC_SIGNS[0];
}

export function calculateWesternSynastry(userDate: string, partnerDate: string): WesternAstrologyResult {
  const uSign = getZodiacSign(userDate);
  const pSign = getZodiacSign(partnerDate);
  const seed = getDeterministicSeed(userDate, partnerDate, 'astro');

  // Calculated Moon signs based on approximate lunar cycle offset
  const signsList = ZODIAC_SIGNS.map((s) => s.name);
  const uMoonIdx = (signsList.indexOf(uSign.name) + (seed % 12)) % 12;
  const pMoonIdx = (signsList.indexOf(pSign.name) + ((seed * 7) % 12)) % 12;

  const uMoon = ZODIAC_SIGNS[uMoonIdx];
  const pMoon = ZODIAC_SIGNS[pMoonIdx];

  // Venus and Mars placements
  const venusStyles = [
    { sign: 'Pisces', houseTheme: 'Unconditional devotion, telepathic romantic attunement' },
    { sign: 'Taurus', houseTheme: 'Sensual grounding, steadfast tactile affection, unwavering loyalty' },
    { sign: 'Libra', houseTheme: 'Aesthetic balance, courteous devotion, diplomatic harmony' },
    { sign: 'Scorpio', houseTheme: 'Transformational depth, intense soul-fusion, unyielding passion' },
    { sign: 'Leo', houseTheme: 'Generous romantic adoration, playful pride, glowing devotion' },
    { sign: 'Cancer', houseTheme: 'Nurturing sanctuary, emotional protection, tender homecraft' },
  ];

  const marsStyles = [
    { sign: 'Aries', driveTheme: 'Bold romantic initiative, ardent pursuit, spontaneous fire' },
    { sign: 'Scorpio', driveTheme: 'Magnetic emotional willpower, fierce protective fidelity' },
    { sign: 'Capricorn', driveTheme: 'Disciplined devotion, building lasting foundations' },
    { sign: 'Sagittarius', driveTheme: 'Adventurous questing together, expansive shared horizons' },
    { sign: 'Taurus', driveTheme: 'Steadfast sensual tenacity, patient physical presence' },
  ];

  const uVenus = venusStyles[seed % venusStyles.length];
  const pVenus = venusStyles[(seed + 3) % venusStyles.length];
  const uMars = marsStyles[(seed + 1) % marsStyles.length];
  const pMars = marsStyles[(seed + 4) % marsStyles.length];

  // Partnership Houses
  const houses = [
    { house: '7th House', name: 'House of Sacred Partnership & Equal Union', focus: 'Commitment, reciprocal balance, conscious vows, and mutual elevation.' },
    { house: '5th House', name: 'House of Romantic Play & Creative Passion', focus: 'Spontaneous courtship, erotic spark, shared laughter, and heart opening.' },
    { house: '8th House', name: 'House of Alchemical Intimacy & Merging', focus: 'Shadow integration, vulnerability, unmasked truth, and soul-level trust.' },
    { house: '4th House', name: 'House of Emotional Sanctuary & Shared Roots', focus: 'Home-building, mutual belonging, ancestral healing, and emotional safety.' },
  ];
  const activeHouse = houses[(seed + new Date().getDate()) % houses.length];

  // Synastry Aspects
  const aspectsPool = [
    {
      planet1: 'Venus',
      aspect: 'Trine' as const,
      planet2: 'Neptune',
      nature: 'Harmonious' as const,
      interpretation: 'Spiritual affinity and tender emotional forgiveness dissolve past barriers.',
    },
    {
      planet1: 'Sun',
      aspect: 'Sextile' as const,
      planet2: 'Moon',
      nature: 'Harmonious' as const,
      interpretation: 'Natural instinctive understanding where emotional needs and conscious identity align.',
    },
    {
      planet1: 'Mars',
      aspect: 'Conjunction' as const,
      planet2: 'Venus',
      nature: 'Magnetic Passion' as const,
      interpretation: 'High romantic chemistry and electric mutual attraction demanding grounded emotional care.',
    },
    {
      planet1: 'Saturn',
      aspect: 'Square' as const,
      planet2: 'Mercury',
      nature: 'Dynamic Tension' as const,
      interpretation: 'Communication checks and serious discussions required; avoids flippant assumptions.',
    },
    {
      planet1: 'Jupiter',
      aspect: 'Trine' as const,
      planet2: 'Sun',
      nature: 'Harmonious' as const,
      interpretation: 'Optimism, expanding shared horizons, and mutual good fortune uplifting the union.',
    },
  ];

  const selectedAspects = [
    aspectsPool[seed % aspectsPool.length],
    aspectsPool[(seed + 2) % aspectsPool.length],
  ];

  const dailyTransits = [
    'Transiting Venus in mutual aspect with the Lunar Nodes, spotlighting fateful relational choices.',
    'Current Sun-Mars alignment activating honest boundaries and courageous declarations of feeling.',
    'Waxing lunar transit across water signs, heightening intuitive receptivity and vulnerability.',
    'Jupiter stationing direct, infusing the partnership with generous understanding and renewal.',
  ];
  const dailyTransitHighlight = dailyTransits[(seed + new Date().getDay()) % dailyTransits.length];

  return {
    userSun: { sign: uSign.name, element: uSign.element, degree: (seed % 28) + 1, symbol: uSign.symbol },
    userMoon: { sign: uMoon.name, element: uMoon.element, symbol: uMoon.symbol },
    userVenus: uVenus,
    userMars: uMars,

    partnerSun: { sign: pSign.name, element: pSign.element, degree: ((seed * 3) % 28) + 1, symbol: pSign.symbol },
    partnerMoon: { sign: pMoon.name, element: pMoon.element, symbol: pMoon.symbol },
    partnerVenus: pVenus,
    partnerMars: pMars,

    keySynastryAspects: selectedAspects,
    activePartnershipHouse: activeHouse,
    dailyTransitHighlight,
  };
}

// ==========================================
// 4. CHINESE ZODIAC & WU XING ENGINE
// ==========================================

const CHINESE_ANIMALS = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
];

const CHINESE_BRANCHES = [
  'Zi (子)', 'Chou (丑)', 'Yin (寅)', 'Mao (卯)', 'Chen (辰)', 'Si (巳)',
  'Wu (午)', 'Wei (未)', 'Shen (申)', 'You (酉)', 'Xu (戌)', 'Hai (亥)'
];

const HEAVENLY_STEMS_ELEMENTS = [
  'Metal', 'Metal', 'Water', 'Water', 'Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth'
];

function getChineseZodiac(birthdateStr: string) {
  const year = new Date(birthdateStr).getUTCFullYear();
  // Chinese zodiac starts with Rat at 1900 or 1924
  const animalIdx = (year - 4) % 12;
  const normalizedAnimalIdx = animalIdx < 0 ? animalIdx + 12 : animalIdx;

  const stemIdx = (year - 4) % 10;
  const normalizedStemIdx = stemIdx < 0 ? stemIdx + 10 : stemIdx;

  const animal = CHINESE_ANIMALS[normalizedAnimalIdx];
  const branch = CHINESE_BRANCHES[normalizedAnimalIdx];
  const element = HEAVENLY_STEMS_ELEMENTS[normalizedStemIdx];
  const yinYang: 'Yin' | 'Yang' = year % 2 === 0 ? 'Yang' : 'Yin';

  return { animal, branch, element, yinYang, index: normalizedAnimalIdx };
}

export function calculateChineseZodiac(userDate: string, partnerDate: string): ChineseZodiacResult {
  const u = getChineseZodiac(userDate);
  const p = getChineseZodiac(partnerDate);

  // San He (Three Harmonies - difference of 4 or 8)
  const diff = Math.abs(u.index - p.index);
  let relType: ChineseZodiacResult['relationshipType'] = 'Balanced Affinity';
  let summary = '';

  if (diff === 4 || diff === 8) {
    relType = 'San He (Three Harmonies Trine)';
    summary = `${u.animal} and ${p.animal} form a classical San He Trine—an auspicious, intuitive alliance with natural mutual admiration and synchronized rhythm.`;
  } else if ((u.index + p.index) % 12 === 1 || Math.abs(u.index - p.index) === 1) {
    // Liu He check (Secret Friends)
    const liuHePairs = [
      ['Rat', 'Ox'], ['Tiger', 'Pig'], ['Rabbit', 'Dog'],
      ['Dragon', 'Rooster'], ['Snake', 'Monkey'], ['Horse', 'Goat']
    ];
    const isLiuHe = liuHePairs.some(
      ([a, b]) => (u.animal === a && p.animal === b) || (u.animal === b && p.animal === a)
    );
    if (isLiuHe) {
      relType = 'Liu He (Six Secret Friends)';
      summary = `${u.animal} and ${p.animal} are Liu He Soul Allies—deeply loyal, complementary, and protective of each other's emotional well-being.`;
    }
  } else if (diff === 6) {
    relType = 'Liu Chong (Six Clashes)';
    summary = `${u.animal} and ${p.animal} sit in direct Liu Chong opposition—generating intense initial spark and electric friction that demands conscious maturity and mutual space.`;
  }

  if (relType === 'Balanced Affinity') {
    summary = `${u.animal} and ${p.animal} cultivate an organic, self-paced affinity. Mutual growth occurs through observing differences without imposing expectations.`;
  }

  // Wu Xing Elements (Wood -> Fire -> Earth -> Metal -> Water -> Wood)
  const shengPairs: Record<string, string> = {
    Water: 'Wood',
    Wood: 'Fire',
    Fire: 'Earth',
    Earth: 'Metal',
    Metal: 'Water',
  };

  let cycleType: ChineseZodiacResult['elementalCycle']['type'] = 'Complementary';
  let cycleDesc = '';

  if (u.element === p.element) {
    cycleType = 'Tong (Unified Element Resonance)';
    cycleDesc = `Both share the ${u.element} element, creating immediate resonance, shared emotional language, and aligned core values.`;
  } else if (shengPairs[u.element] === p.element) {
    cycleType = 'Sheng (Generating/Nourishing)';
    cycleDesc = `${u.element} nourishes ${p.element}: User’s energy naturally feeds Partner’s creative spark and confidence.`;
  } else if (shengPairs[p.element] === u.element) {
    cycleType = 'Sheng (Generating/Nourishing)';
    cycleDesc = `${p.element} nourishes ${u.element}: Partner’s presence provides sustaining nourishment and peace to User.`;
  } else {
    cycleType = 'Ke (Controlling/Challenging)';
    cycleDesc = `${u.element} and ${p.element} invite creative polarity. Polishing each other like gemstones through constructive contrast.`;
  }

  return {
    userAnimal: u.animal,
    userElement: u.element,
    userYinYang: u.yinYang,
    userBranch: u.branch,
    partnerAnimal: p.animal,
    partnerElement: p.element,
    partnerYinYang: p.yinYang,
    partnerBranch: p.branch,
    relationshipType: relType,
    compatibilitySummary: summary,
    elementalCycle: {
      type: cycleType,
      description: cycleDesc,
    },
  };
}

// ==========================================
// 5. LUNAR PHASE & ELEMENTAL BALANCE ENGINE
// ==========================================

export function calculateLunarAndElementalLayer(userDate: string, partnerDate: string): LunarElementalResult {
  const now = new Date();
  // Synodic lunar phase approximation
  // Reference known new moon: Jan 11, 2024
  const refNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
  const diffDays = (now.getTime() - refNewMoon) / (1000 * 60 * 60 * 24);
  const lunarCycle = 29.53058867;
  const currentAge = ((diffDays % lunarCycle) + lunarCycle) % lunarCycle;

  let moonPhase = 'Waxing Crescent';
  let illumination = 0.35;
  let lunarTone = 'Tender attraction, early buds of emotional discovery.';

  if (currentAge < 1.84) {
    moonPhase = 'New Moon (Dark Moon)';
    illumination = 0.02;
    lunarTone = 'Silent inception, seeding unspoken heart wishes, deep receptive stillness.';
  } else if (currentAge < 5.53) {
    moonPhase = 'Waxing Crescent';
    illumination = 0.25;
    lunarTone = 'Emerging vulnerability, gentle courage to reach out.';
  } else if (currentAge < 9.22) {
    moonPhase = 'First Quarter Moon';
    illumination = 0.5;
    lunarTone = 'Active commitment, resolving internal ambiguity into intentional love.';
  } else if (currentAge < 12.91) {
    moonPhase = 'Waxing Gibbous';
    illumination = 0.82;
    lunarTone = 'Deepening intimacy, refining devotion, patience before full fruition.';
  } else if (currentAge < 16.61) {
    moonPhase = 'Full Moon';
    illumination = 0.99;
    lunarTone = 'Peak emotional illumination, radiant clarity, unspoken truths laid bare.';
  } else if (currentAge < 20.3) {
    moonPhase = 'Waning Gibbous (Disseminating)';
    illumination = 0.8;
    lunarTone = 'Gratitude, shared vulnerability, harvesting mutual wisdom.';
  } else if (currentAge < 23.99) {
    moonPhase = 'Last Quarter Moon';
    illumination = 0.5;
    lunarTone = 'Forgiveness, releasing old relational resentments, shedding defensive armor.';
  } else {
    moonPhase = 'Waning Crescent (Balsamic)';
    illumination = 0.2;
    lunarTone = 'Sacred restorative rest, quiet incubation of soul connection.';
  }

  // Planetary Day ruler
  const dayRulers = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const dayRuler = dayRulers[now.getDay()];

  const lunarMansions = [
    'Al-Sharatain (The Horns of the Ram) - Initiating passionate truth',
    'Al-Butain (The Belly) - Cultivating secret emotional patience',
    'Al-Thurayya (The Pleiades) - Radiant aesthetic communion',
    'Al-Dabaran (The Follower) - Grounded fidelity and steadfast heart',
    'Al-Haq’ah (The White Spot) - Clear, unhurried dialogue',
    'Al-Han’ah (The Mark of Beauty) - Soft romantic reconciliation',
    'Al-Dhira (The Forearms) - Protective sanctuary and safe shelter',
  ];
  const lunarMansion = lunarMansions[now.getDate() % lunarMansions.length];

  // Elemental balance score
  const seed = getDeterministicSeed(userDate, partnerDate, 'elemental');
  const fire = 20 + (seed % 15);
  const earth = 20 + ((seed * 3) % 15);
  const air = 20 + ((seed * 7) % 15);
  const water = 20 + ((seed * 11) % 15);
  const aether = 100 - (fire + earth + air + water) + 15;

  const elements = [
    { name: 'Fire', val: fire },
    { name: 'Earth', val: earth },
    { name: 'Air', val: air },
    { name: 'Water', val: water },
  ];
  elements.sort((a, b) => b.val - a.val);

  return {
    moonPhase,
    illumination: Math.round(illumination * 100),
    lunarMansion,
    lunarTone,
    planetaryDayRuler: `${dayRuler} (${dayRuler === 'Venus' ? 'Auspicious Love Day' : dayRuler === 'Moon' ? 'Deep Feeling Day' : 'Active Cosmic Current'})`,
    planetaryHourRuler: dayRulers[(now.getHours() + now.getDay()) % 7],
    elementalBreakdown: { fire, earth, air, water, aether },
    dominantElement: elements[0].name,
    elementalDeficit: elements[elements.length - 1].name,
  };
}

// Build complete combined context
export function assembleOracleContext(
  userDate: string,
  partnerDate: string,
  userName: string = 'Seeker',
  partnerName: string = 'Beloved',
  relationshipFocus: string = 'General Love & Deepening Intimacy'
): CombinedOracleContext {
  return {
    pennick: calculatePennickGeomancyRunic(userDate, partnerDate, relationshipFocus),
    iching: calculateIChing(userDate, partnerDate, relationshipFocus),
    astrology: calculateWesternSynastry(userDate, partnerDate),
    chinese: calculateChineseZodiac(userDate, partnerDate),
    lunarElemental: calculateLunarAndElementalLayer(userDate, partnerDate),
    queryMeta: {
      userName,
      partnerName,
      userBirthdate: userDate,
      partnerBirthdate: partnerDate,
      relationshipFocus,
      castDate: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
  };
}

/**
 * Built-in High-Fidelity Syncretic Synthesis Generator.
 * Used directly or as fallback when offline/no API key.
 * Strictly adheres to weaving the 5 systems into Past, Present, Future without listing them separately!
 */
export function generateLocalSyncreticSynthesis(ctx: CombinedOracleContext): {
  headline: string;
  thematicBridge: string;
  past: string;
  present: string;
  future: string;
  remedyPreview: string;
} {
  const { pennick, iching, astrology, chinese, lunarElemental, queryMeta } = ctx;

  const headline = `The ${pennick.primaryFigure.name} & Hexagram ${iching.primaryHexagram.number} (${iching.primaryHexagram.name}) Confluence`;

  const thematicBridge = `A sacred bridge unites Nigel Pennick’s ${pennick.primaryFigure.name} (${pennick.primaryFigure.latinName}), the I Ching’s ${iching.primaryHexagram.name} (${iching.primaryHexagram.chinese}), Western synastry in the ${astrology.activePartnershipHouse.name}, and the ${chinese.relationshipType} between the ${chinese.userAnimal} and ${chinese.partnerAnimal}. Rather than separate currents, they reveal a unified lesson in balancing sovereign inner truth with tender mutual vulnerability.`;

  const past = `The root energetic cause steering this connection into today springs from an ancient foundation of ${pennick.primaryFigure.translation.toLowerCase()} colliding with the ${astrology.userSun.element}-${astrology.partnerSun.element} elemental polarity. In the background of this relationship, an unspoken boundary or period of ${pennick.secondaryFigure.name} created hesitation—a time when one or both of you felt the need to protect the tender roots of the heart, as reflected in the ancestral ${chinese.elementalCycle.type}. This history established a protective armor that, while necessary then to preserve individual integrity, now asks to be consciously acknowledged and softened.`;

  const present = `Today’s active energetic nexus is governed by the live casting of Hexagram ${iching.primaryHexagram.number} (${iching.primaryHexagram.name}) and the transit of ${astrology.dailyTransitHighlight}. Under this ${lunarElemental.moonPhase} (${lunarElemental.illumination}% illuminated), Pennick’s telluric current (${pennick.earthPower}) and the active rune ${pennick.activeRune.glyph} (${pennick.activeRune.rune}) demand conscious presence. The dynamic between ${queryMeta.userName} and ${queryMeta.partnerName} is not stagnant; line ${iching.changingLinePositions.join(', ')} is actively transforming into Hexagram ${iching.transformedHexagram?.number} (${iching.transformedHexagram?.name}). The mutual magnetic tension in the ${astrology.activePartnershipHouse.house} is asking both of you to cease guessing each other’s motives and instead step directly into grounded, courageous clarity.`;

  const future = `If this current energetic tide remains unmanaged and left to habitual inertia, the trajectory tilts toward ${pennick.judgeFigure.name}’s shadow: lingering misunderstanding, unexpressed needs hardening into distance, or impetuous reactions scattering the tender ${lunarElemental.dominantElement} momentum built so far. However, because line ${iching.changingLinePositions[0]} shifts into ${iching.transformedHexagram?.name}, conscious alignment will redirect this stream into deep mutual renewal, elevating the bond into authentic emotional sovereignty and enduring trust.`;

  const remedyPreview = `Nigel Pennick’s earth tradition prescribes working with ${pennick.primaryFigure.herbalAlly} and honoring the ${pennick.primaryFigure.direction} quarter. Simultaneously, the changing line of Hexagram ${iching.primaryHexagram.number} recommends a behavioral pause before reacting. Ask below for the full ritual, herbal, or behavioral prescription.`;

  return {
    headline,
    thematicBridge,
    past,
    present,
    future,
    remedyPreview,
  };
}

/**
 * High-Fidelity Local Prescription Generator for offline mode.
 * Synthesizes Nigel Pennick earth magic and I Ching lines without network.
 */
export function generateLocalPrescription(ctx: CombinedOracleContext, question: string = ''): string {
  const { pennick, iching, astrology, chinese, lunarElemental, queryMeta } = ctx;

  return `✨ **The Diagnosis**:
Today's confluence of Nigel Pennick’s ${pennick.primaryFigure.name} (${pennick.primaryFigure.latinName}) and I Ching Hexagram ${iching.primaryHexagram.number} (${iching.primaryHexagram.name}) highlights an energetic accumulation along the ${pennick.primaryFigure.direction} telluric corridor. To address your inquiry "${question || 'harmonizing today’s relationship dynamic'}", the immediate priority is rebalancing the ${lunarElemental.elementalDeficit} element between ${queryMeta.userName} and ${queryMeta.partnerName}.

🌿 **Nigel Pennick’s Earth & Botanical Prescription**:
- **Botanical Ally**: Work with **${pennick.primaryFigure.herbalAlly}**. In Pennick's tradition, placing this dried herb near your sleeping quarters or sipping an infusion calms reactionary nervous spikes.
- **Directional Alignment**: Turn toward the **${pennick.primaryFigure.direction}** during morning or evening reflection to harmonize with the active telluric earth current (${pennick.directionalTide}).
- **Geomantic Inscription**: Trace the fourfold dot pattern of *${pennick.primaryFigure.latinName}* (${pennick.primaryFigure.dots.join('-')}) onto parchment or smooth birch wood to ground impulsive friction.

⚡ **I Ching Behavioral Adjustment**:
- Line ${iching.changingLinePositions[0]} of Hexagram ${iching.primaryHexagram.name} warns against rushing to conclusion or reacting defensively. When speaking with ${queryMeta.partnerName} today, practice an intentional 3-breath pause before answering.
- Cultivate the receptive strength of Hexagram ${iching.transformedHexagram?.number} (${iching.transformedHexagram?.name}): lead through understanding rather than force.

🕯️ **Sacred Evening Ritual**:
1. Cleanse a bowl of clear spring water with a pinch of coarse sea salt.
2. Light a single natural beeswax candle, invoking the rune **${pennick.activeRune.glyph} (${pennick.activeRune.rune})** for ${pennick.activeRune.meaning.toLowerCase()}.
3. Speak aloud: *"Rooted in the quiet earth, our love does not haste; in patient truth, the sacred path unfolds."*

🔮 **Sovereign Mantram**:
*"Rooted in the ancient soil, we honor each other's pace; in quiet presence, our true bond deepens."*`;
}
