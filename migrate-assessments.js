/**
 * Migration Script: Convert Assessment Templates from questionIds to questions
 * 
 * This script migrates existing assessment templates from using questionIds (references)
 * to storing complete question objects directly in each template.
 * 
 * Run this once: node migrate-assessments.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrateAssessments() {
  try {
    console.log('🔄 Starting migration...\n');

    // Get all questions
    console.log('📝 Fetching questions...');
    const questionsSnapshot = await db.collection('questions').get();
    const questionsMap = new Map();
    
    questionsSnapshot.docs.forEach(doc => {
      questionsMap.set(doc.id, { id: doc.id, ...doc.data() });
    });
    
    console.log(`   Found ${questionsMap.size} questions\n`);

    // Get all assessment templates
    console.log('📋 Fetching assessment templates...');
    const templatesSnapshot = await db.collection('assessmentTemplates').get();
    
    console.log(`   Found ${templatesSnapshot.docs.length} templates\n`);

    // Migrate each template
    let migrated = 0;
    let skipped = 0;

    for (const templateDoc of templatesSnapshot.docs) {
      const template = templateDoc.data();
      
      // Check if already migrated
      if (template.questions && Array.isArray(template.questions)) {
        console.log(`   ⏭️  Skipping ${template.name} - already migrated`);
        skipped++;
        continue;
      }

      // Convert questionIds to questions
      const questionIds = template.questionIds || [];
      const questions = [];

      for (const qId of questionIds) {
        const question = questionsMap.get(qId);
        if (question) {
          questions.push(question);
        } else {
          console.warn(`   ⚠️  Question ${qId} not found for template ${template.name}`);
        }
      }

      // Update template
      await templateDoc.ref.update({
        questions: questions,
        // Keep questionIds for now for backward compatibility
        updatedAt: admin.firestore.Timestamp.now()
      });

      console.log(`   ✅ Migrated ${template.name} - ${questions.length} questions`);
      migrated++;
    }

    console.log('\n✨ Migration complete!');
    console.log(`   Migrated: ${migrated}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Total: ${templatesSnapshot.docs.length}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateAssessments();
