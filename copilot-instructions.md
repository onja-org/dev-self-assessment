
# Developer Self-Assessment App – Copilot Implementation Requirements

## 1. Tech Stack

* **Frontend:** Next.js (React + TypeScript)
* **Backend / Database:** Firebase (Firestore for data storage, Firebase Auth for optional manager login)
* **State Management:** React Context or Redux (optional for larger state)
* **Storage:** Firestore collections for assessments, users (developers/managers)
* **Hosting:** Vercel (recommended for Next.js)

---

## 2. User Roles

| Role          | Access                                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| Developer     | Complete self-assessments, view past assessments, see results and growth roadmap                                |
| Manager/Admin | View all developer assessments, filter by date, category, or developer, view trends, download/export (optional) |

---

## 3. Authentication

* **Anonymous access** for developers (no login required)
* **Firebase Auth login** for managers/admins (email/password or Google SSO)
* Developers: stored by **anonymous UID**
* Admins: stored in **`admins` collection**

---

## 4. Firestore Data Model

**Collections & Documents**

### 4.1 `assessments` collection

* `id`: string (auto-generated)
* `developerId`: string (anonymous UID)
* `createdAt`: timestamp
* `responses`: object (questionId → answer object)
* `categoryScores`: object (category → numeric score 0–10)
* `overallScore`: number 0–10

**Answer Object:**

```ts
{
  value: string | number | string[],
  other?: string,
  followUp?: string,
  recommendations: string[],
  scoreWeight: number
}
```

### 4.2 `questions` collection (optional for dynamic content)

* `id`, `title`, `category`, `type`, `min/max`, `options` array
* Options: value, label, recommendations, scoreWeight, yearOneRecommendations

### 4.3 `admins` collection

* `uid`, `name`, `email`

---

## 5. Features

### 5.1 Developer Features

1. **Assessment Form**

   * 10 core questions
   * Question types: scale, multiple choice, checkbox, tech-stack
   * Immediate recommendations shown after answer selection
   * Optional follow-up questions for tech stack

2. **Results Page**

   * Overall score, category scores
   * 90-day action plans and 12-month roadmap
   * Graphical progress bars, expandable category sections

3. **Assessment History**

   * List of past assessments with date, overall score, trends
   * View details of past assessments

4. **Local Persistence**

   * Unsaved data auto-saved to Firestore / localStorage (optional offline support)

---

### 5.2 Admin/Manager Features

1. **Admin Dashboard**

   * List all developer assessments
   * Filter by developer, date, category, or score
   * Sort by overall score or date
   * View detailed results for each assessment
   * Visualize trends across developers (charts optional)

2. **Data Export** (Optional)

   * CSV / JSON export of assessments
   * Download individual developer assessments

---

## 6. Component/Pages Structure (Next.js)

```
/pages
  index.tsx             → Home / Dashboard
  /assessment
    [id].tsx            → Assessment form (question-by-question)
    result.tsx          → Results page
  /history
    index.tsx           → Assessment history for developer
  /admin
    index.tsx           → Manager dashboard
    /assessment/[id].tsx → Detailed view per developer assessment
/components
  QuestionCard.tsx
  RecommendationCard.tsx
  ProgressBar.tsx
  CategoryBreakdown.tsx
  TrendIndicator.tsx
  ActionPlanList.tsx
  AdminTable.tsx
  FilterBar.tsx
/utils
  scoreCalculator.ts
  firebaseClient.ts
  constants.ts
  recommendations.ts
```

---

## 7. Firebase Integration

* **Firestore Structure:**

  ```
  assessments (collection)
    |-- assessmentId (document)
          developerId
          createdAt
          responses
          categoryScores
          overallScore
  questions (collection) – optional
  admins (collection)
  ```
* **Security Rules:**

  * Developers can read/write only their own assessments
  * Admins can read all assessments

---

## 8. Scoring & Recommendations

* Each answer has a **scoreWeight (0–1)**
* Category score = weighted sum of answers in category
* Overall score = average of category scores (0–10)
* Recommendations:

  * Immediate (shown after answer selection)
  * 90-day action plan (calculated per category)
  * 12-month roadmap (quarterly goals)

---

## 9. GitHub Copilot Guidance

* Use **TypeScript interfaces** for `Assessment`, `Answer`, `Question`, `QuestionOption`
* Autocomplete repetitive structures (questions, options, recommendations)
* Implement **dynamic form rendering** for different question types
* Use **React Context** or hooks for tracking in-progress answers
* Leverage **Firebase queries** for admin filtering & sorting
* Generate charts or progress bars dynamically for results
* Use **Next.js API routes** if needed for server-side aggregation

---

## 10. Non-Functional Requirements

* **Responsive UI** (mobile-first)
* **Fast load times**, smooth interactions
* **Offline-safe** via localStorage until Firestore sync
* **Accessibility**: ARIA labels, semantic HTML
* **Security**: Firebase rules enforce proper access

