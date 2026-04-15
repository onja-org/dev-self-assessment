import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { Resource } from '@/types';

/**
 * Fetch resources from Firestore for a specific question by category
 * This allows resources to be managed in one place (Firestore) and used dynamically
 */
export async function getResourcesByCategory(categoryName: string): Promise<Resource[]> {
  try {
    // First, get the category ID
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const category = categoriesSnapshot.docs.find(doc => 
      doc.data().name.toLowerCase() === categoryName.toLowerCase()
    );
    
    if (!category) {
      console.warn(`Category "${categoryName}" not found in Firestore`);
      return [];
    }

    // Fetch resources for this category
    const resourcesSnapshot = await getDocs(
      query(collection(db, 'resources'), where('categoryId', '==', category.id))
    );
    
    return resourcesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Resource[];
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
}

/**
 * Fetch a specific resource by URL
 */
export async function getResourceByUrl(url: string): Promise<Resource | null> {
  try {
    const resourcesSnapshot = await getDocs(
      query(collection(db, 'resources'), where('url', '==', url))
    );
    
    if (resourcesSnapshot.empty) {
      return null;
    }
    
    const doc = resourcesSnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as Resource;
  } catch (error) {
    console.error('Error fetching resource:', error);
    return null;
  }
}

/**
 * Cache for resources to avoid repeated Firestore calls
 */
const resourceCache = new Map<string, Resource[]>();
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedResourcesByCategory(categoryName: string): Promise<Resource[]> {
  const now = Date.now();
  const cacheKey = categoryName.toLowerCase();
  
  // Check if cache is still valid
  if (resourceCache.has(cacheKey) && (now - lastFetchTime) < CACHE_DURATION) {
    return resourceCache.get(cacheKey)!;
  }
  
  // Fetch fresh data
  const resources = await getResourcesByCategory(categoryName);
  resourceCache.set(cacheKey, resources);
  lastFetchTime = now;
  
  return resources;
}

/**
 * Clear the resource cache (call this after editing resources)
 */
export function clearResourceCache() {
  resourceCache.clear();
  lastFetchTime = 0;
}
