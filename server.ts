/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * The Syncretic Star & Hexagram Oracle - Express Full-Stack Server
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import {
  assembleOracleContext,
  generateLocalSyncreticSynthesis,
  CombinedOracleContext
} from './src/lib/esotericEngines.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Synthesize Endpoint
app.post('/api/oracle/synthesize', async (req, res) => {
  try {
    const {
      userBirthdate,
      partnerBirthdate,
      userName = 'Seeker',
      partnerName = 'Beloved',
      relationshipFocus = 'General Love & Deepening Intimacy',
    } = req.body;

    if (!userBirthdate || !partnerBirthdate) {
      return res.status(400).json({ error: 'Both birthdates are required to cast the oracle.' });
    }

    // Assemble deterministic 5-system data
    const context: CombinedOracleContext = assembleOracleContext(
      userBirthdate,
      partnerBirthdate,
      userName,
      partnerName,
      relationshipFocus
    );

    // If Gemini client is available, generate synthesis via gemini-3.8-flash
    if (aiClient) {
      try {
        const systemInstruction = `You are the master syncretic oracle for "The Syncretic Star & Hexagram Oracle".
Your sacred task is to synthesize 5 simultaneous esoteric traditions into ONE unified, deeply poetic, psychologically insightful, and spiritually resonant relationship reading.

The 5 systems provided:
1. Nigel Pennick's Geomancy & Runic Tradition (Earth powers, directional telluric currents, 16 geomantic figures, Elder Futhark star-craft timing, herbal allies).
2. The I Ching (King Wen hexagram casting, changing lines, transformed hexagram, relational yin/yang balance).
3. Modern Western Astrology (Synastry aspects, Sun/Moon/Venus/Mars interplay, active partnership houses, current daily transits).
4. Chinese Zodiac (Earthly Branches, Heavenly Stem elements, San He trines, Liu He secret allies, or Liu Chong clashes).
5. Lunar Alchemy & Elemental Balance (Current moon phase illumination, planetary day/hour ruler, elemental distribution).

CRITICAL REQUIREMENTS:
- DO NOT list the readings separately or write separate sections for each tradition.
- Weave them together into ONE singular, cohesive narrative using cross-system thematic bridges (e.g. show how Pennick's geomantic figure mirrors the active I Ching hexagram line and Western transit).
- UNCOMPROMISING ESOTERIC TRUTH & FRICTION DIAGNOSIS: If the planetary aspects show squares, oppositions, or Saturnian resistance; if the Chinese Zodiac shows a direct Liu Chong clash or Ke (overcoming) cycle; if Nigel Pennick's geomancy indicates Carcer (restriction), Tristitia (sorrow), or Rubeus (conflict); or if the I Ching shows Standstill or Obstruction: DO NOT sugarcoat or force false positivity. State the unvarnished esoteric reality and diagnose the precise mechanical and psychological root causes of the friction (e.g., how element velocities clash or defensive armors collide).
- Structure the reading strictly into:
  * Headline: An evocative poetic title capturing the authentic tension or resonance.
  * ThematicBridge: A 1-2 sentence core insight connecting the systems.
  * Past: The root energetic cause, ancestral current, or background transit leading to today's friction or harmony.
  * Present: The active daily dynamic, hexagram transformation, planetary alignment, and immediate relational tension.
  * Future: The immediate trajectory if the current energy is left unmanaged or allowed to run on habitual inertia (unflinchingly honest), contrasted with the elevated outcome if managed with conscious awareness.
  * RemedyPreview: A brief enticing teaser of the Nigel Pennick herbal/earth magic and I Ching behavioral remedies available.
`;

        const userPrompt = `Synthesize today's love reading for ${userName} (born ${userBirthdate}) and ${partnerName} (born ${partnerBirthdate}) with the specific focus: "${relationshipFocus}".

Here is the exact data calculated from the 5 esoteric engines:
- NIGEL PENNICK GEOMANCY & RUNES:
  * Primary Figure: ${context.pennick.primaryFigure.name} (${context.pennick.primaryFigure.latinName} - ${context.pennick.primaryFigure.translation})
  * Secondary Figure: ${context.pennick.secondaryFigure.name} (${context.pennick.secondaryFigure.latinName})
  * Judge Figure: ${context.pennick.judgeFigure.name} (${context.pennick.judgeFigure.latinName})
  * Active Rune: ${context.pennick.activeRune.glyph} ${context.pennick.activeRune.rune} (${context.pennick.activeRune.meaning})
  * Earth Current: ${context.pennick.earthPower}
  * Directional Tide: ${context.pennick.directionalTide}
  * Herbal Ally: ${context.pennick.herbalResonance}
  * Shield Overview: ${context.pennick.geomanticShieldOverview}

- THE I CHING:
  * Primary Hexagram: #${context.iching.primaryHexagram.number} ${context.iching.primaryHexagram.name} (${context.iching.primaryHexagram.chinese} / ${context.iching.primaryHexagram.pinyin})
  * Upper Trigram: ${context.iching.primaryHexagram.upperTrigram}, Lower Trigram: ${context.iching.primaryHexagram.lowerTrigram}
  * Judgment: ${context.iching.primaryHexagram.judgment}
  * Changing Lines: Line(s) ${context.iching.changingLinePositions.join(', ')}
  * Transformed Hexagram: #${context.iching.transformedHexagram?.number} ${context.iching.transformedHexagram?.name} (${context.iching.transformedHexagram?.chinese})
  * Transformative Dynamic: ${context.iching.transformativeGuidance}

- MODERN WESTERN ASTROLOGY:
  * ${userName}: Sun in ${context.astrology.userSun.sign} (${context.astrology.userSun.element}), Moon in ${context.astrology.userMoon.sign}, Venus in ${context.astrology.userVenus.sign}, Mars in ${context.astrology.userMars.sign}
  * ${partnerName}: Sun in ${context.astrology.partnerSun.sign} (${context.astrology.partnerSun.element}), Moon in ${context.astrology.partnerMoon.sign}, Venus in ${context.astrology.partnerVenus.sign}, Mars in ${context.astrology.partnerMars.sign}
  * Active Partnership House: ${context.astrology.activePartnershipHouse.house} (${context.astrology.activePartnershipHouse.name}) - ${context.astrology.activePartnershipHouse.focus}
  * Key Synastry Aspects: ${context.astrology.keySynastryAspects.map(a => `${a.planet1} ${a.aspect} ${a.planet2} (${a.nature})`).join(', ')}
  * Daily Transit Highlight: ${context.astrology.dailyTransitHighlight}

- CHINESE ZODIAC:
  * ${userName}: ${context.chinese.userAnimal} (${context.chinese.userElement} ${context.chinese.userYinYang}, ${context.chinese.userBranch})
  * ${partnerName}: ${context.chinese.partnerAnimal} (${context.chinese.partnerElement} ${context.chinese.partnerYinYang}, ${context.chinese.partnerBranch})
  * Affinity: ${context.chinese.relationshipType} - ${context.chinese.compatibilitySummary}
  * Five Elements: ${context.chinese.elementalCycle.type} - ${context.chinese.elementalCycle.description}

- LUNAR & ELEMENTAL LAYER:
  * Moon Phase: ${context.lunarElemental.moonPhase} (${context.lunarElemental.illumination}% illuminated), ${context.lunarElemental.lunarTone}
  * Lunar Mansion: ${context.lunarElemental.lunarMansion}
  * Planetary Day Ruler: ${context.lunarElemental.planetaryDayRuler}
  * Elemental Balance: Fire ${context.lunarElemental.elementalBreakdown.fire}%, Earth ${context.lunarElemental.elementalBreakdown.earth}%, Air ${context.lunarElemental.elementalBreakdown.air}%, Water ${context.lunarElemental.elementalBreakdown.water}%

Produce the unified synthesis now in JSON format strictly adhering to the schema.`;

        const todayDateKey = new Date().toISOString().split('T')[0];
        let dailySeed = 0;
        const seedStr = `${userBirthdate}_${partnerBirthdate}_${todayDateKey}`;
        for (let i = 0; i < seedStr.length; i++) {
          dailySeed = (dailySeed << 5) - dailySeed + seedStr.charCodeAt(i);
          dailySeed |= 0;
        }
        dailySeed = Math.abs(dailySeed);

        const geminiResponse = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction,
            temperature: 0.2,
            seed: dailySeed,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING, description: 'Poetic, evocative title for today\'s synthesized reading' },
                thematicBridge: { type: Type.STRING, description: 'The overarching core connection weaving the 5 systems together' },
                past: { type: Type.STRING, description: 'The root energetic cause or background transit leading to today' },
                present: { type: Type.STRING, description: 'The active daily dynamic, hexagram transformation, and planetary alignment' },
                future: { type: Type.STRING, description: 'The immediate trajectory if energy is left unmanaged vs consciously elevated' },
                remedyPreview: { type: Type.STRING, description: 'A brief preview of the available Nigel Pennick and I Ching prescriptions' },
              },
              required: ['headline', 'thematicBridge', 'past', 'present', 'future', 'remedyPreview'],
            },
          },
        });

        const rawText = geminiResponse.text?.trim() || '';
        const parsed = JSON.parse(rawText);

        return res.json({
          context,
          synthesis: parsed,
          source: 'gemini-3.8-flash',
        });
      } catch (geminiErr) {
        console.warn('Gemini synthesis failed or timed out, falling back to local synthesis engine:', geminiErr);
      }
    }

    // High-fidelity deterministic fallback synthesis
    const localSynthesis = generateLocalSyncreticSynthesis(context);
    return res.json({
      context,
      synthesis: localSynthesis,
      source: 'local-engine',
    });
  } catch (err: any) {
    console.error('Synthesis error:', err);
    return res.status(500).json({ error: err.message || 'Internal oracle error' });
  }
});

// 2. Interactive Remedy & Prescription Loop Endpoint
app.post('/api/oracle/remedy', async (req, res) => {
  try {
    const { context, question, remedyType = 'general', conversationHistory = [] } = req.body;

    if (!context) {
      return res.status(400).json({ error: 'Oracle context is required to formulate remedies.' });
    }

    const { pennick, iching, astrology, chinese, lunarElemental, queryMeta } = context;

    if (aiClient) {
      try {
        const remedySystemPrompt = `You are the master apothecary and esoteric sage of "The Syncretic Star & Hexagram Oracle".
You provide specific, compassionate, and deeply actionable remedies and prescriptions for love and relationship questions.

Your remedies are grounded specifically in:
1. Nigel Pennick's Traditional European Earth Magic & Geomancy:
   - Botanical/herbal allies (infusions, sachets, bath soaks, smoke smudges, bedside flora).
   - Directional alignments and telluric earth currents (North/Earth, East/Air, South/Fire, West/Water).
   - Geomantic figure talismans (drawing dots on parchment, wooden plaques, candle inscribing).
   - Runic star-craft timing and sacred oaths.
2. The I Ching Lines & Behavioral Alchemy:
   - Specific behavioral adjustments corresponding to changing lines and hexagram virtues (yielding, pausing before replying, setting boundaries, removing assumptions).
   - Communication reframing for specific relationship friction.
3. Modern Astrological Planetary Rituals:
   - Candle colors, planetary hours, Venusian harmony, Martian drive moderation, Saturnian patience.
4. Chinese Five-Element (Wu Xing) adjustments:
   - Spatial harmony, colors, and balancing nourishing/controlling cycles.

Structure your response with clear, beautiful formatting:
- ✨ **The Diagnosis**: Why this energetic remedy is needed based on today's cast reading.
- 🌿 **Nigel Pennick’s Earth & Botanical Prescription**: Specific herbs, directional orientation, or earth magic action.
- ⚡ **I Ching Behavioral Adjustment**: Exact interpersonal speech, timing, or psychological posture to adopt today.
- 🕯️ **Sacred Evening or Morning Ritual**: Simple 3-step physical or meditative action the partners or individual can do.
- 🔮 **Affirmation / Sovereign Mantram**: A short memorable phrase anchoring the shift.
`;

        const contextSummary = `Oracle Reading Context:
- Names: ${queryMeta.userName} & ${queryMeta.partnerName} (Focus: "${queryMeta.relationshipFocus}")
- Pennick Figures: Primary ${pennick.primaryFigure.name} (${pennick.primaryFigure.direction}, ${pennick.primaryFigure.element}), Judge ${pennick.judgeFigure.name}, Herb: ${pennick.herbalResonance}, Rune: ${pennick.activeRune.rune} (${pennick.activeRune.glyph})
- I Ching: Hexagram #${iching.primaryHexagram.number} (${iching.primaryHexagram.name}) with line(s) ${iching.changingLinePositions.join(', ')} changing into #${iching.transformedHexagram?.number} (${iching.transformedHexagram?.name})
- Western Astrology: ${astrology.activePartnershipHouse.house} active; aspect: ${astrology.keySynastryAspects[0]?.nature}; transit: ${astrology.dailyTransitHighlight}
- Chinese Zodiac: ${chinese.userAnimal} & ${chinese.partnerAnimal} (${chinese.relationshipType}, ${chinese.elementalCycle.type})
- Lunar: ${lunarElemental.moonPhase} (${lunarElemental.illumination}%), Day ruler: ${lunarElemental.planetaryDayRuler}
- Deficit Element to Balance: ${lunarElemental.elementalDeficit}
`;

        const fullPrompt = `${contextSummary}\n\nUser Question / Remedy Request:\n"${question || 'Provide a comprehensive esoteric, behavioral, herbal, and ritual remedy based on Nigel Pennick and the I Ching lines for today.'}"`;

        const geminiResponse = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: fullPrompt,
          config: {
            systemInstruction: remedySystemPrompt,
          },
        });

        const remedyText = geminiResponse.text?.trim() || '';
        return res.json({
          remedy: remedyText,
          source: 'gemini-3.8-flash',
        });
      } catch (geminiErr) {
        console.warn('Gemini remedy call failed, using local prescription engine:', geminiErr);
      }
    }

    // Local rich fallback remedy
    const localRemedy = `✨ **The Diagnosis**:
Today's confluence of Nigel Pennick’s ${pennick.primaryFigure.name} and I Ching Hexagram ${iching.primaryHexagram.number} indicates an energetic accumulation in the ${pennick.primaryFigure.direction} quarter and an urgent need to rebalance the ${lunarElemental.elementalDeficit} element in the emotional field between ${queryMeta.userName} and ${queryMeta.partnerName}.

🌿 **Nigel Pennick’s Earth & Botanical Prescription**:
- **Botanical Ally**: Prepare an infusion or place dried **${pennick.primaryFigure.herbalAlly}** near the sleeping threshold or communication desk. In Pennick’s tradition, this herb acts as an acoustic and telluric buffer against reactionary emotional spikes.
- **Directional Alignment**: Turn toward the **${pennick.primaryFigure.direction}** during your morning or evening contemplation to align with the active earth current (${pennick.directionalTide}).
- **Geomantic Inscription**: Lightly trace the fourfold dot pattern of *${pennick.primaryFigure.latinName}* (${pennick.primaryFigure.dots.join('-')}) onto a bay leaf or parchment to ground excess friction.

⚡ **I Ching Behavioral Adjustment**:
- Line ${iching.changingLinePositions[0]} of Hexagram ${iching.primaryHexagram.name} warns against premature defense. When speaking with ${queryMeta.partnerName} today, practice the "Three-Breath Pause": listen fully to the end of their sentence, take three unhurried breaths, and respond to the underlying longing rather than the surface tone.
- Embody the transforming quality of Hexagram ${iching.transformedHexagram?.number} (${iching.transformedHexagram?.name}): cultivate spaciousness over urgency.

🕯️ **Sacred Evening Ritual**:
1. Cleanse a small glass of fresh spring water with a pinch of sea salt.
2. Light a single natural beeswax candle, invoking the rune **${pennick.activeRune.glyph} (${pennick.activeRune.rune})** for ${pennick.activeRune.meaning.toLowerCase()}.
3. Speak aloud: *"I release the need to control the timeline; I invite the ancient earth to hold our sacred communion."*

🔮 **Sovereign Mantram**:
*"Rooted in the quiet earth, our love does not haste; in stillness, the sacred path reveals itself."*`;

    return res.json({
      remedy: localRemedy,
      source: 'local-engine',
    });
  } catch (err: any) {
    console.error('Remedy error:', err);
    return res.status(500).json({ error: err.message || 'Internal remedy generation error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!aiClient,
    timestamp: new Date().toISOString(),
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Oracle Server] Running on http://localhost:${PORT} (Production: ${isProduction})`);
  });
}

startServer();
