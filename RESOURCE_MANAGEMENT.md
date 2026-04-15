# Resource Management System

## Overview

The assessment platform now uses a **centralized resource management system** where Firestore is the single source of truth for all learning resources. This allows you to:

- ✅ Edit resources once, update everywhere
- ✅ Changes take effect immediately
- ✅ No need to modify code or redeploy
- ✅ Better content management workflow

## How It Works

### 1. Resources are Stored in Firestore

All learning resources are stored in the `resources` collection in Firestore with these fields:
- `title` - Resource name
- `url` - Link to the resource
- `type` - article, video, course, docs, github, book, or roadmap
- `categoryId` - Links to assessment category
- `description` - Optional description
- `tags` - Optional array of tags
- `difficulty` - beginner, intermediate, or advanced
- `duration` - Estimated time to complete
- `author` - Content creator

### 2. Admin Interface

Navigate to **Admin → Resources** to:
- View all resources organized by category
- Add new resources
- Edit existing resources
- Delete resources
- Sync resources from questions (one-time import)

### 3. Dynamic Loading in Assessments

When users take assessments, resources are fetched from Firestore and displayed alongside question options. This happens automatically using the `DynamicResources` component.

## Usage Guide

### Adding a New Resource

1. Go to **Admin → Resources**
2. Click **"+ Add Resource"**
3. Fill in the required fields:
   - Title
   - URL
   - Type
   - Category
4. Optionally add metadata (difficulty, duration, author, tags)
5. Click **"Add Resource"**

The resource immediately becomes available in all questions for that category.

### Editing an Existing Resource

1. Find the resource in the table
2. Click **"Edit"**
3. Update the fields
4. Click **"Update Resource"**

Changes are reflected immediately in all assessments without redeploying.

### Syncing from Questions (One-Time)

If you have existing resources hardcoded in the QUESTIONS constant:

1. Click **"⬇ Sync from Questions"** button
2. Confirm the action
3. The system will:
   - Extract all resources from questions
   - Check for duplicates (by URL)
   - Add new resources to Firestore
   - Show a summary of added/skipped items

**Note:** This is typically done once during initial setup.

### Deleting Resources

1. Find the resource
2. Click **"Delete"**
3. Confirm the action

The resource is removed from Firestore and will no longer appear in assessments.

## For Developers

### Using DynamicResources Component

In your question/assessment pages, use the `DynamicResources` component to fetch and display resources:

```tsx
import DynamicResources from '@/components/DynamicResources';

function QuestionDisplay() {
  return (
    <div>
      {/* Your question content */}
      
      <DynamicResources 
        categoryName="Technical Skills"
        questionTitle="JavaScript Fundamentals"
        optionLabel="Intermediate Level"
        staticResources={[
          // Optional: Include static resources that should always show
          {
            title: "MDN JavaScript Guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
            type: "docs"
          }
        ]}
      />
    </div>
  );
}
```

### API Functions

```typescript
// Get resources for a specific category
import { getResourcesByCategory } from '@/lib/getQuestionResources';
const resources = await getResourcesByCategory('Technical Skills');

// Get a specific resource by URL
import { getResourceByUrl } from '@/lib/getQuestionResources';
const resource = await getResourceByUrl('https://example.com/resource');

// Get cached resources (performance optimized)
import { getCachedResourcesByCategory } from '@/lib/getQuestionResources';
const resources = await getCachedResourcesByCategory('Technical Skills');

// Clear cache after editing (done automatically in admin)
import { clearResourceCache } from '@/lib/getQuestionResources';
clearResourceCache();
```

### Caching

Resources are cached for 5 minutes to improve performance. The cache is automatically cleared when:
- Resources are added, edited, or deleted via the admin panel
- You manually call `clearResourceCache()`

## Migration Strategy

### From Static to Dynamic Resources

If you currently have resources hardcoded in `constants.ts`:

**Step 1:** Initial sync
```
1. Go to Admin → Resources
2. Click "Sync from Questions"
3. Verify all resources were imported
```

**Step 2:** Update question rendering
```tsx
// Old approach (static)
const options = question.options.map(opt => ({
  ...opt,
  resources: opt.resources // Hardcoded in constants
}));

// New approach (dynamic)
<DynamicResources 
  categoryName={question.category}
  staticResources={option.resources} // Merge with Firestore
/>
```

**Step 3:** Optional cleanup
Once confirmed working, you can remove static resources from `constants.ts` to avoid duplication.

## Best Practices

1. **Use Descriptive Titles**: Make resource titles clear and searchable
2. **Categorize Correctly**: Ensure resources match the right assessment category
3. **Add Metadata**: Include difficulty, duration, and tags for better filtering
4. **Check for Duplicates**: Before adding, search to see if the resource exists
5. **Regular Audits**: Periodically review resources for broken links or outdated content

## Troubleshooting

### Resources Not Showing in Assessments

- Check that the category name matches exactly
- Verify resources exist in Firestore for that category
- Clear browser cache and reload
- Check browser console for errors

### Sync Failed

- Ensure categories exist in Firestore before syncing
- Check that category names in questions match Firestore categories
- Look for console warnings about missing categories

### Performance Issues

- Resources are cached for 5 minutes
- If you need immediate updates, the cache clears automatically on edit
- Consider adding pagination if you have 100+ resources per category

## Technical Details

### Database Structure

```
resources/
  {resourceId}/
    title: string
    url: string
    type: 'article' | 'video' | 'course' | 'docs' | 'github' | 'book' | 'roadmap'
    categoryId: string (FK to categories collection)
    description?: string
    tags?: string[]
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
    duration?: string
    author?: string
    createdAt: Timestamp
    updatedAt?: Timestamp
```

### Cache Strategy

- In-memory Map cache
- 5-minute TTL
- Cleared on write operations
- Per-category caching

## Support

For issues or questions:
1. Check this guide
2. Review console logs for errors
3. Verify Firestore rules allow read/write access
4. Contact the development team
