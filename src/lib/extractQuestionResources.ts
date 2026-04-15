import { QUESTIONS } from './constants';

export interface QuestionResource {
  title: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'docs' | 'github' | 'book' | 'roadmap';
  description?: string;
  questionTitle: string;
  questionCategory: string;
  optionLabel?: string;
}

/**
 * Extracts all resources from the QUESTIONS constant
 * Returns a deduplicated array of resources with metadata about which questions they appear in
 */
export function extractQuestionResources(): QuestionResource[] {
  const resourcesMap = new Map<string, QuestionResource & { questions: Set<string> }>();

  QUESTIONS.forEach((question) => {
    if (!question.options) return;

    question.options.forEach((option) => {
      if (!option.resources || option.resources.length === 0) return;

      option.resources.forEach((resource) => {
        const key = resource.url; // Use URL as unique identifier
        
        if (resourcesMap.has(key)) {
          // Add this question to the existing resource's question list
          const existing = resourcesMap.get(key)!;
          existing.questions.add(question.title);
        } else {
          // Create new resource entry
          resourcesMap.set(key, {
            title: resource.title,
            url: resource.url,
            type: resource.type,
            description: resource.description,
            questionTitle: question.title,
            questionCategory: question.category,
            optionLabel: option.label,
            questions: new Set([question.title])
          });
        }
      });
    });
  });

  // Convert map to array and format
  return Array.from(resourcesMap.values()).map(item => {
    const { questions, ...rest } = item;
    return {
      ...rest,
      // Store the first question info, but we know it appears in multiple questions
      questionCount: questions.size
    } as QuestionResource;
  });
}

/**
 * Get resources grouped by type
 */
export function getResourcesByType() {
  const resources = extractQuestionResources();
  const grouped: Record<string, QuestionResource[]> = {};

  resources.forEach(resource => {
    if (!grouped[resource.type]) {
      grouped[resource.type] = [];
    }
    grouped[resource.type].push(resource);
  });

  return grouped;
}

/**
 * Get resources grouped by category
 */
export function getResourcesByCategory() {
  const resources = extractQuestionResources();
  const grouped: Record<string, QuestionResource[]> = {};

  resources.forEach(resource => {
    if (!grouped[resource.questionCategory]) {
      grouped[resource.questionCategory] = [];
    }
    grouped[resource.questionCategory].push(resource);
  });

  return grouped;
}

/**
 * Get statistics about resources in questions
 */
export function getResourceStats() {
  const resources = extractQuestionResources();
  const types = new Set(resources.map(r => r.type));
  const categories = new Set(resources.map(r => r.questionCategory));

  return {
    totalResources: resources.length,
    totalTypes: types.size,
    totalCategories: categories.size,
    byType: getResourcesByType(),
    byCategory: getResourcesByCategory()
  };
}
