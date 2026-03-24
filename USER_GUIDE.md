# Developer Self-Assessment Application

A comprehensive platform for developers to assess their technical skills and for administrators to manage assessment templates, track team progress, and analyze skill development over time.

## Table of Contents
- [Overview](#overview)
- [For Developers (Users)](#for-developers-users)
- [For Administrators](#for-administrators)
- [Technical Setup](#technical-setup)
- [Key Features](#key-features)

---

## Overview

This application enables development teams to:
- **Self-assess** technical skills across multiple categories
- **Track progress** over time with versioned assessments
- **Receive notifications** when new questions are added to assessments
- **Compare team performance** and identify skill gaps
- **Manage roles** with admin-level access controls

**Tech Stack:** Next.js 16+, Firebase/Firestore, TypeScript, React 19, Tailwind CSS 4

---

## For Developers (Users)

### Getting Started

1. **Register/Login**
   - Navigate to `/register` to create an account
   - Use `/login` for existing accounts
   - All authenticated users can take assessments

2. **Taking Assessments**
   - View available assessments on `/assessments`
   - Click on an assessment card to start
   - **Select categories** to focus on specific skills, or leave all unselected for the full assessment
   - Answer questions by category - each category can be completed independently
   - Complete a category and click **"Save Progress"** to save your answers
   - Progress is saved per category - you can come back and complete remaining categories later
   - Once all categories are complete, click **"Submit Final Assessment"** to see your overall scores

3. **Understanding Notifications**
   - Orange badges (🔔) indicate new questions added to assessments you've already taken
   - Click "Answer X New Question(s)" button to view only the newly added questions
   - Complete new questions to update your assessment
   - Dismiss notifications once reviewed

4. **Viewing Results**
   - After submission, view detailed results including:
     - **Overall Score**: Average across all questions
     - **Category Scores**: Breakdown by skill category (e.g., Frontend, Backend)
     - **Score Level**: Rating like "Intermediate", "Advanced", etc.
   - Access past assessment results from the assessments list

5. **Retaking Assessments**
   - You can retake any assessment to update your scores
   - Previous responses are saved separately
   - Track your improvement over time

### Best Practices
- Be honest with self-assessments for accurate skill tracking
- Retake assessments every 3-6 months to track growth
- Focus on categories where you score lower for development goals
- Add notes or resources where available for context

---

## For Administrators

Access the admin panel at `/admin` (requires admin role).

### 1. Overview Dashboard (`/admin`)

**Purpose:** High-level view of all assessment activity

**Features:**
- Total assessments taken across the team
- Unique developer count
- Average team score
- Filter by:
  - Assessment template
  - Category
  - Status (completed/in-progress)
  - Search by developer name
- Export detailed reports (CSV and text formats)
- Sort by date or score

**Usage:**
```
1. Select filters to narrow down data
2. Review stats cards at the top
3. Export data for external analysis
4. Click "View Details" on any assessment for full breakdown
```

### 2. Assessments Management (`/admin/assessments`)

**Purpose:** Create and manage versioned assessment templates

**Features:**
- Create new assessment templates with name, description, version
- Add questions to templates from the global question bank
- Edit template metadata
- Manage template-specific questions
- Delete templates (with confirmation)

**Adding Questions to Templates:**
```
1. Click "Manage Questions" on any template
2. Click "+ Add Question to Assessment"
3. Select existing questions OR create new ones
4. Questions added trigger notifications to users who've taken this assessment
5. Users will see a badge indicating new questions
```

**Creating Questions:**
- Text input for question
- Category dropdown (synced with Categories tab)
- Resources section for learning materials
- Validation ensures all fields are complete

**Important:** When you add questions to an existing assessment that users have already taken, they receive notifications and can answer only the new questions.

### 3. Questions Management (`/admin/questions`)

**Purpose:** Manage the global question bank

**Features:**
- View all questions across categories
- Filter by category
- Search questions
- Create, edit, delete questions
- Bulk management

**Question Structure:**
- Question text (the actual question)
- Category (must match existing categories)
- Resources (optional learning materials with titles and URLs)

**Best Practices:**
- Keep questions clear and focused on one skill
- Assign accurate categories for better filtering
- Add resources to help developers improve
- Review existing questions before creating duplicates

### 4. Categories Management (`/admin/categories`)

**Purpose:** Define skill categories for organization

**Features:**
- Create categories (e.g., "Frontend", "Backend", "DevOps")
- Set display order
- Add descriptions
- Edit/delete categories

**Usage:**
```
1. Click "Add Category"
2. Enter name and description
3. Set order (lower numbers appear first)
4. Categories are immediately available in question/assessment dropdowns
```

**Important:** Categories used in existing questions cannot be deleted.

### 5. Score Levels Management (`/admin/score-levels`)

**Purpose:** Define score ranges and their meanings

**Features:**
- Create custom score levels (e.g., "Beginner: 0-20")
- Set min/max score ranges
- Assign colors for visual representation
- Define keys for programmatic access
- Seed default levels quickly

**Default Levels:**
- BEGINNER: 0-20 (Red)
- LOWER_INTERMEDIATE: 21-40 (Orange)
- INTERMEDIATE: 41-60 (Yellow)
- UPPER_INTERMEDIATE: 61-80 (Light Green)
- ADVANCED: 81-100 (Green)

**Usage:**
```
1. Click "Seed Defaults" for quick setup
2. OR create custom levels matching your team's needs
3. Adjust ranges to fit your scoring philosophy
4. Users see these levels on their assessment results
```

### 6. Team Comparison (`/admin/comparison`)

**Purpose:** Compare team members' performance side-by-side

**Features:**
- Filter by assessment template
- View all developers' scores in one table
- Compare category-by-category performance
- Identify skill gaps across the team
- Expand rows for detailed breakdowns

**Usage:**
```
1. Select an assessment template
2. Review the comparison table
3. Click on a row to expand category scores
4. Identify areas where team needs development
5. Plan training based on insights
```

### 7. Users Management (`/admin/users`)

**Purpose:** Manage user roles and admin access

**Features:**
- View all registered users
- Promote users to admin role
- Demote admins to regular users
- Cannot modify your own role (safety measure)

**Important:** 
- After changing your role, you must **log out and log back in** for changes to take effect
- Role changes are permanent - be careful with admin access
- At least one admin should always exist

---

## Key Features

### Notification System
Automatically notifies users when questions are added to assessments they've taken. Users see a blue notification banner with a button to "Answer X New Question(s)" that filters to show only the newly added questions, allowing them to update their assessment without retaking everything.

### Dynamic Categories
Categories are managed centrally and automatically populate dropdowns throughout the application, ensuring consistency.

### Flexible Score Levels
Customizable score ranges allow teams to define their own proficiency levels and adjust them over time.

### Role-Based Access
Simple but effective admin/user role system with protected routes and UI elements based on permissions.

### Progress Tracking
All assessments are versioned and saved, allowing historical comparison and growth tracking.

### Export Capabilities
Admins can export assessment data in CSV or text format for external analysis, reporting, or integration with other tools.

---

## Support & Troubleshooting

**Common Issues:**

1. **"Access Denied" on admin pages**
   - Verify your user has `role: 'admin'` in the `users` collection
   - Check you're logged in with the correct account
   - Log out and back in after role changes

2. **Notifications not appearing**
   - Ensure questions were added AFTER you completed the assessment
   - Check the `notifications` collection for your userId
   - Refresh the assessments page

3. **Score calculation errors**
   - Verify all questions have valid categories
   - Check score levels are properly configured
   - Ensure all responses are saved

4. **Cannot save questions**
   - Verify category exists in Categories tab
   - Check all required fields are filled
   - Review browser console for Firebase errors

**For Developers:**
- Check browser console for errors
- Verify Firebase configuration in `.env.local`
- Ensure Firestore rules and indexes are deployed
- Review `src/lib/` for utility functions and helpers

---

**Last Updated:** March 2026  
**Version:** 1.0.0
