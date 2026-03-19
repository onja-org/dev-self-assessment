/**
 * Setup script to initialize Score Levels in Firestore
 * Run this once to populate the scoreLevels collection with default levels
 * 
 * NOTE: You can also seed default levels from the admin UI at /admin/score-levels
 *       by clicking the "Seed Defaults" button.
 * 
 * Usage: node setup-score-levels.js
 */

const admin = require('firebase-admin');

// Check if serviceAccountKey.json exists
try {
  const serviceAccount = require('./serviceAccountKey.json');
  
  // Initialize Firebase Admin
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
} catch (error) {
  console.error('❌ Error: Could not find serviceAccountKey.json');
  console.log('\n📝 To use this script:');
  console.log('1. Download your Firebase service account key from Firebase Console');
  console.log('2. Save it as serviceAccountKey.json in the project root');
  console.log('\nAlternatively, you can seed score levels from the admin UI:');
  console.log('👉 Navigate to /admin/score-levels and click "Seed Defaults"\n');
  process.exit(1);
}

const db = admin.firestore();

const DEFAULT_SCORE_LEVELS = [
  {
    key: 'BEGINNER',
    label: 'Beginner',
    min: 0,
    max: 3.9,
    color: 'text-red-600',
    description: 'Starting to learn and build foundational skills',
    order: 0,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    key: 'JUNIOR',
    label: 'Junior',
    min: 4,
    max: 5.9,
    color: 'text-orange-600',
    description: 'Building foundations and learning core concepts',
    order: 1,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    key: 'INTERMEDIATE',
    label: 'Intermediate',
    min: 6,
    max: 7.9,
    color: 'text-yellow-600',
    description: 'Solid fundamentals with growing independence',
    order: 2,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    key: 'UPPER_INTERMEDIATE',
    label: 'Upper Intermediate',
    min: 8,
    max: 10,
    color: 'text-green-600',
    description: 'Strong skills with deep technical knowledge',
    order: 3,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }
];

async function setupScoreLevels() {
  try {
    console.log('🚀 Starting Score Levels setup...\n');

    // Check if score levels already exist
    const existingLevels = await db.collection('scoreLevels').get();
    
    if (!existingLevels.empty) {
      console.log(`⚠️  Found ${existingLevels.size} existing score levels.`);
      console.log('Do you want to:');
      console.log('1. Skip setup (keep existing levels)');
      console.log('2. Delete existing and recreate');
      console.log('\nExiting to prevent accidental overwrites.');
      console.log('To recreate, manually delete the scoreLevels collection first.\n');
      process.exit(0);
    }

    // Create score levels
    console.log('📝 Creating default score levels...\n');
    
    const batch = db.batch();
    
    for (const level of DEFAULT_SCORE_LEVELS) {
      const docRef = db.collection('scoreLevels').doc();
      batch.set(docRef, level);
      console.log(`✅ Added: ${level.label} (${level.min}-${level.max})`);
    }

    await batch.commit();

    console.log('\n✨ Score Levels setup completed successfully!\n');
    console.log('Summary:');
    console.log(`- Created ${DEFAULT_SCORE_LEVELS.length} score levels`);
    console.log('- Levels are now available in the admin panel at /admin/score-levels');
    console.log('\nYou can now manage score levels through the admin interface.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up score levels:', error);
    process.exit(1);
  }
}

setupScoreLevels();
