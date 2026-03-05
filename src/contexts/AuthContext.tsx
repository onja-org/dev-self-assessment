'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User } from '@/types';

interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role?: 'developer' | 'admin') => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', { firebaseUser: firebaseUser?.uid });
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Fetch user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          console.log('User doc exists:', userDoc.exists(), userDoc.data());
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as User);
          } else {
            console.error('User document not found in Firestore for uid:', firebaseUser.uid);
            setUserProfile(null);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, name: string, role: 'developer' | 'admin' = 'developer') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user profile in Firestore
    const userProfile: User = {
      uid: user.uid,
      name,
      email,
      role,
      createdAt: new Date() as any,
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    // If admin, also add to admins collection
    if (role === 'admin') {
      await setDoc(doc(db, 'admins', user.uid), {
        uid: user.uid,
        name,
        email,
      });
    }

    setUserProfile(userProfile);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if user profile exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create new user profile
      const newUserProfile: User = {
        uid: user.uid,
        name: user.displayName || 'User',
        email: user.email || '',
        role: 'developer',
        createdAt: new Date() as any,
      };

      await setDoc(doc(db, 'users', user.uid), newUserProfile);
      setUserProfile(newUserProfile);
      console.log('Created new user profile:', newUserProfile);
    } else {
      // User already exists, just set the profile
      setUserProfile(userDoc.data() as User);
      console.log('Loaded existing user profile:', userDoc.data());
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signIn, signUp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
