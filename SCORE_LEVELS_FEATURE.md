# Score Levels Management

## Overview

The Score Levels feature allows administrators to define and customize skill level ranges based on assessment scores. Instead of hardcoded levels, score levels are now stored in Firestore and can be managed through the admin panel.

## Features

✅ **Dynamic Configuration**: Define custom score ranges and labels  
✅ **Admin UI**: Full CRUD interface for managing score levels  
✅ **Flexible Ranges**: Support for any number of levels with custom min/max scores  
✅ **Color Coding**: Visual distinction with customizable colors  
✅ **Automatic Fallback**: Uses hardcoded defaults if no levels are defined in Firestore  

## Default Score Levels

The system comes with 4 default score levels:

| Level | Range | Color | Description |
|-------|-------|-------|-------------|
| **Beginner** | 0 - 3.9 | Red | Starting to learn and build foundational skills |
| **Junior** | 4 - 5.9 | Orange | Building foundations and learning core concepts |
| **Intermediate** | 6 - 7.9 | Yellow | Solid fundamentals with growing independence |
| **Upper Intermediate** | 8 - 10 | Green | Strong skills with deep technical knowledge |

## Setup

### Initial Setup

1. Ensure you have Firebase Admin SDK configured with `serviceAccountKey.json`
2. Run the setup script to initialize default score levels:

```bash
node setup-score-levels.js
```

This will create the default 4 score levels in your Firestore database.

### Manual Setup

If you prefer to set up score levels manually:

1. Navigate to `/admin/score-levels` in your admin panel
2. Click "Add Score Level"
3. Fill in the required fields:
   - **Label**: Display name (e.g., "Beginner", "Junior")
   - **Key**: Unique identifier (e.g., "BEGINNER", "JUNIOR")
   - **Min Score**: Minimum score for this level (0-10)
   - **Max Score**: Maximum score for this level (0-10)
   - **Color**: Tailwind color class for visual distinction
   - **Description**: Brief description of the skill level
   - **Order**: Display order (lower numbers appear first)

## Admin Interface

### Accessing Score Levels

Navigate to **Admin Panel → 🎯 Score Levels**

Or directly: `/admin/score-levels`

### Managing Score Levels

**Add a New Level:**
1. Click "➕ Add Score Level"
2. Fill in all required fields
3. Click "Create Level"

**Edit a Level:**
1. Click "Edit" next to the level you want to modify
2. Update the fields
3. Click "Save Changes"

**Delete a Level:**
1. Click "Delete" next to the level you want to remove
2. Confirm the deletion

### Best Practices

- **Score Ranges**: Ensure ranges cover 0-10 without gaps
- **Order**: Use consistent ordering (0, 1, 2, 3...)
- **Keys**: Use uppercase with underscores (e.g., `UPPER_INTERMEDIATE`)
- **Colors**: Choose distinct colors for easy visual identification

## Technical Implementation

### Type Definition

```typescript
export interface ScoreLevel {
  id: string;
  key: string; // e.g., 'BEGINNER', 'JUNIOR'
  min: number;
  max: number;
  label: string;
  color: string; // Tailwind class
  description: string;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Helper Functions

```typescript
// Fetch score levels from Firestore (with caching)
import { getScoreLevels, getSkillLevelForScore } from '@/lib/scoreLevels';

// Get all levels
const levels = await getScoreLevels();

// Get skill level for a specific score
const skillLevel = await getSkillLevelForScore(7.5);
// Returns: { min: 6, max: 7.9, label: 'Intermediate', color: 'text-yellow-600', ... }
```

### Fallback Behavior

If no score levels are defined in Firestore (or if there's an error), the system automatically falls back to the hardcoded levels defined in `/src/lib/constants.ts`.

### Caching

Score levels are cached after the first fetch to improve performance. The cache is cleared automatically when:
- The page is refreshed
- Score levels are updated through the admin interface

## Files

### Core Files

- `/src/app/admin/score-levels/page.tsx` - Admin UI for managing score levels
- `/src/lib/scoreLevels.ts` - Helper functions for fetching and using score levels
- `/src/lib/constants.ts` - Fallback hardcoded score levels
- `/src/types/index.ts` - ScoreLevel type definition
- `/setup-score-levels.js` - Initial setup script

### Integration Points

Score levels are used in:
- Assessment results pages
- Admin overview and comparison
- Score calculation and reporting
- User dashboards

## Migration Notes

### From Hardcoded to Dynamic

The previous implementation used 5 hardcoded levels:
- Junior Developer (0-3.9)
- Intermediate Developer (4-6.9)
- Advanced Beginner (7-7.9)
- Advanced Developer (8-8.9)
- Expert/Senior Developer (9-10)

The new system uses 4 customizable levels by default, but administrators can add more or modify existing levels as needed.

### Backward Compatibility

The system maintains backward compatibility by:
1. Keeping the `getSkillLevel()` function in constants.ts for synchronous usage
2. Providing `getSkillLevelForScore()` async function for dynamic fetching
3. Automatic fallback to hardcoded levels if Firestore is unavailable

## Future Enhancements

Potential improvements:
- [ ] Import/Export score levels configuration
- [ ] Level templates for different assessment types
- [ ] Historical tracking of level changes
- [ ] Bulk operations (duplicate, reset to defaults)
- [ ] Visual preview of level distribution

## Support

For issues or questions:
1. Check Firestore console for `scoreLevels` collection
2. Verify Firebase Admin SDK credentials
3. Check browser console for errors
4. Review server logs for Firestore connection issues
