import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { ScoreLevel } from '@/types';
import { SCORE_LEVELS } from './constants';

let cachedScoreLevels: ScoreLevel[] | null = null;

/**
 * Fetch score levels from Firestore with caching
 * Falls back to hardcoded SCORE_LEVELS if no levels are defined in Firestore
 */
export async function getScoreLevels(): Promise<ScoreLevel[]> {
  // Return cached levels if available
  if (cachedScoreLevels) {
    return cachedScoreLevels;
  }

  try {
    const q = query(collection(db, 'scoreLevels'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    const levels = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ScoreLevel[];

    // Cache the fetched levels
    if (levels.length > 0) {
      cachedScoreLevels = levels;
      return levels;
    }

    // Fall back to hardcoded levels if none exist in Firestore
    return convertConstantsToScoreLevels();
  } catch (error) {
    console.error('Error fetching score levels:', error);
    // Fall back to hardcoded levels on error
    return convertConstantsToScoreLevels();
  }
}

/**
 * Convert hardcoded SCORE_LEVELS to ScoreLevel format
 */
function convertConstantsToScoreLevels(): ScoreLevel[] {
  return Object.entries(SCORE_LEVELS).map(([key, value], index) => ({
    id: key.toLowerCase(),
    key,
    min: value.min,
    max: value.max,
    label: value.label,
    color: value.color,
    description: value.description,
    order: index,
    createdAt: new Date() as any,
    updatedAt: new Date() as any
  }));
}

/**
 * Get skill level for a given score
 * Uses fetched score levels from Firestore
 */
export async function getSkillLevelForScore(score: number) {
  const levels = await getScoreLevels();
  
  // Find the appropriate level based on score range
  const level = levels.find(l => score >= l.min && score <= l.max);
  
  if (level) {
    return {
      min: level.min,
      max: level.max,
      label: level.label,
      color: level.color,
      description: level.description
    };
  }

  // Fallback to the highest level if score is above all ranges
  const highestLevel = levels[levels.length - 1];
  return {
    min: highestLevel.min,
    max: highestLevel.max,
    label: highestLevel.label,
    color: highestLevel.color,
    description: highestLevel.description
  };
}

/**
 * Clear the cache (useful when score levels are updated)
 */
export function clearScoreLevelsCache() {
  cachedScoreLevels = null;
}
