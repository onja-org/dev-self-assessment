/**
 * Setup Script: Create First Assessment Template
 * 
 * This script creates an initial assessment template using all existing questions.
 * Run this once to bootstrap your versioned assessment system.
 * 
 * Usage:
 *   node setup-first-assessment.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // You'll need to download this from Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function setupFirstAssessment() {
  try {
    console.log('🚀 Starting assessment template setup...\n');

    // 1. Get all questions
    console.log('📝 Fetching existing questions...');
    const questionsSnapshot = await db.collection('questions').get();
    const questionIds = questionsSnapshot.docs.map(doc => doc.id);
    
    console.log(`   Found ${questionIds.length} questions\n`);

    if (questionIds.length === 0) {
      console.log('⚠️  No questions found in Firestore.');
      console.log('   Please add questions via the Admin Panel → Questions page first.\n');
      return;
    }

    // 2. Create assessment template
    const currentYear = new Date().getFullYear();
    const templateData = {
      name: `Developer Assessment ${currentYear}`,
      version: currentYear.toString(),
      description: `Comprehensive developer skills assessment for ${currentYear}`,
      questionIds: questionIds,
      isActive: true,
      createdBy: 'setup-script',
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now()
    };

    console.log('📋 Creating assessment template...');
    const templateRef = await db.collection('assessmentTemplates').add(templateData);
    
    console.log(`   ✅ Created: "${templateData.name}"`);
    console.log(`   Version: ${templateData.version}`);
    console.log(`   Questions: ${questionIds.length}`);
    console.log(`   Template ID: ${templateRef.id}\n`);

    // 3. Summary
    console.log('✨ Setup complete!\n');
    console.log('Next steps:');
    console.log('1. Deploy Firestore rules: firebase deploy --only firestore:rules');
    console.log('2. Deploy Firestore indexes: firebase deploy --only firestore:indexes');
    console.log('3. Log in as a developer to see the new assessment\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupFirstAssessment();
