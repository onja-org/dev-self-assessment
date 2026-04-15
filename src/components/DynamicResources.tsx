'use client';

import { useEffect, useState } from 'react';
import { getCachedResourcesByCategory } from '@/lib/getQuestionResources';
import { Resource } from '@/types';

interface DynamicResourcesProps {
  categoryName: string;
  questionTitle?: string;
  optionLabel?: string;
  staticResources?: Array<{
    title: string;
    url: string;
    type?: 'article' | 'video' | 'course' | 'docs' | 'github' | 'book' | 'roadmap';
    description?: string;
  }>;
}

/**
 * Component that dynamically fetches and displays resources from Firestore
 * This allows resources to be edited in the admin panel and automatically reflect in questions
 */
export default function DynamicResources({ 
  categoryName, 
  questionTitle, 
  optionLabel,
  staticResources = [] 
}: DynamicResourcesProps) {
  const [firestoreResources, setFirestoreResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadResources() {
      try {
        const resources = await getCachedResourcesByCategory(categoryName);
        if (mounted) {
          setFirestoreResources(resources);
        }
      } catch (error) {
        console.error('Error loading resources:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadResources();

    return () => {
      mounted = false;
    };
  }, [categoryName]);

  // Merge static resources with Firestore resources, removing duplicates by URL
  const staticUrls = new Set(staticResources.map(r => r.url));
  const mergedResources = [
    ...staticResources,
    ...firestoreResources.filter(r => !staticUrls.has(r.url))
  ];

  if (loading) {
    return (
      <div className="text-sm text-gray-500 italic">Loading resources...</div>
    );
  }

  if (mergedResources.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-2">
      <h4 className="text-sm font-semibold text-gray-700">📚 Learning Resources:</h4>
      <ul className="space-y-1.5">
        {mergedResources.map((resource, idx) => (
          <li key={resource.url || idx}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
            >
              {getResourceIcon(resource.type)}
              <span>{resource.title}</span>
            </a>
            {resource.description && (
              <p className="text-xs text-gray-500 ml-5 mt-0.5">{resource.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function getResourceIcon(type?: string) {
  const icons: Record<string, string> = {
    article: '📄',
    video: '🎥',
    course: '🎓',
    docs: '📖',
    github: '💻',
    book: '📚',
    roadmap: '🗺️'
  };
  return icons[type || 'article'] || '🔗';
}
