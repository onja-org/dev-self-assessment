// Setup Admin Script
// This script creates an admin document in Firestore for testing

const admin = require('firebase-admin');
const readline = require('readline');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function setupAdmin() {
  // Get user email
  rl.question('Enter the email of the user to make admin: ', async (email) => {
    try {
      // Get user by email
      const userRecord = await admin.auth().getUserByEmail(email);
      const userId = userRecord.uid;

      console.log(`\nFound user: ${userRecord.email} (${userId})`);

      // Check if admin document already exists
      const adminDoc = await db.collection('admins').doc(userId).get();
      
      if (adminDoc.exists) {
        console.log('✓ Admin document already exists');
      } else {
        // Create admin document
        await db.collection('admins').doc(userId).set({
          email: userRecord.email,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log('✓ Admin document created');
      }

      // Check/update user profile
      const userDoc = await db.collection('users').doc(userId).get();
      
      if (userDoc.exists) {
        const userData = userDoc.data();
        if (userData.role !== 'admin') {
          await db.collection('users').doc(userId).update({
            role: 'admin'
          });
          console.log('✓ User profile updated with admin role');
        } else {
          console.log('✓ User profile already has admin role');
        }
      } else {
        console.log('⚠ Warning: User profile document not found. Please sign in first to create it.');
      }

      console.log('\n✅ Admin setup complete!');
      console.log('Please refresh your browser to see the changes.');
      
    } catch (error) {
      console.error('Error setting up admin:', error.message);
    }
    
    rl.close();
    process.exit(0);
  });
}

setupAdmin();
