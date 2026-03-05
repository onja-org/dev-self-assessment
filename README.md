# Developer Self-Assessment App

A comprehensive skill tracking and growth planning application for developers, built with Next.js, TypeScript, and Firebase.

## Features

### For Developers
- **Authentication**: Secure login/registration with email/password or Google SSO
- **Self-Assessment**: Complete a 10-question assessment covering:
  - Technical Skills
  - Problem Solving
  - Collaboration
  - Communication
  - Learning & Growth
- **Instant Feedback**: Get immediate recommendations after each answer
- **Detailed Results**: View overall and category scores with visual breakdowns
- **Action Plans**: Receive personalized 90-day and 12-month roadmaps
- **Progress Tracking**: View assessment history and track growth over time

### For Managers/Admins
- **Admin Dashboard**: View all developer assessments
- **Filtering & Sorting**: Search by name/email, sort by date or score
- **Detailed Views**: Access complete assessment details for any developer
- **Data Export**: Export assessment data to CSV format
- **Analytics**: View team-wide statistics and averages

## Tech Stack

- **Frontend**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Firestore + Authentication)
- **Hosting**: Vercel (recommended)

## Prerequisites

- Node.js 18+ and npm
- Firebase project (create at [firebase.google.com](https://firebase.google.com))

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
