import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Notification, UserAssessment } from '@/types';

/**
 * Creates notifications for users who have taken a specific assessment
 * when new questions are added to the template
 */
export async function createNotificationsForAssessmentUpdate(
  assessmentTemplateId: string,
  assessmentName: string,
  newQuestionCount: number
): Promise<{ success: boolean; notificationCount: number; error?: string }> {
  try {
    // Find all users who have taken this assessment (both completed and in-progress)
    const userAssessmentsQuery = query(
      collection(db, 'userAssessments'),
      where('assessmentTemplateId', '==', assessmentTemplateId)
    );
    
    const userAssessmentsSnapshot = await getDocs(userAssessmentsQuery);
    
    if (userAssessmentsSnapshot.empty) {
      return { success: true, notificationCount: 0 };
    }

    // Create a notification for each unique user
    const userNotifications = new Map<string, {
      userId: string;
      previousQuestionCount: number;
      status: 'completed' | 'in-progress';
    }>();

    userAssessmentsSnapshot.forEach((docSnap) => {
      const userAssessment = docSnap.data() as UserAssessment;
      
      // Get the question count - if not set, count existing responses
      let previousCount = userAssessment.questionCountAtCompletion;
      
      if (!previousCount && userAssessment.responses) {
        // For in-progress assessments without questionCountAtCompletion,
        // use the number of responses as baseline
        previousCount = Object.keys(userAssessment.responses).length;
      }
      
      if (previousCount && previousCount < newQuestionCount) {
        // Only add if we haven't already added this user or if this has an earlier count
        if (!userNotifications.has(userAssessment.userId) ||
            userNotifications.get(userAssessment.userId)!.previousQuestionCount > previousCount) {
          userNotifications.set(userAssessment.userId, {
            userId: userAssessment.userId,
            previousQuestionCount: previousCount,
            status: userAssessment.status,
          });
        }
      }
    });

    // Create notifications
    const notificationsCollection = collection(db, 'notifications');
    const notificationPromises: Promise<any>[] = [];

    userNotifications.forEach(({ userId, previousQuestionCount, status }) => {
      const questionsAdded = newQuestionCount - previousQuestionCount;
      const message = status === 'completed'
        ? `${questionsAdded} new question${questionsAdded > 1 ? 's have' : ' has'} been added to "${assessmentName}". You can now answer the new questions to update your assessment.`
        : `${questionsAdded} new question${questionsAdded > 1 ? 's have' : ' has'} been added to "${assessmentName}" while you were completing it.`;

      const notification: Omit<Notification, 'id'> = {
        userId,
        type: 'new_questions',
        assessmentTemplateId,
        assessmentName,
        message,
        questionsAdded,
        previousQuestionCount,
        currentQuestionCount: newQuestionCount,
        createdAt: Timestamp.now(),
        read: false,
        dismissed: false,
      };

      notificationPromises.push(addDoc(notificationsCollection, notification));
    });

    await Promise.all(notificationPromises);

    return {
      success: true,
      notificationCount: notificationPromises.length,
    };
  } catch (error) {
    console.error('Error creating notifications:', error);
    return {
      success: false,
      notificationCount: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Gets all notifications for a specific user
 */
export async function getUserNotifications(
  userId: string,
  unreadOnly: boolean = false
): Promise<Notification[]> {
  try {
    let notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    if (unreadOnly) {
      notificationsQuery = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        where('read', '==', false),
        orderBy('createdAt', 'desc')
      );
    }

    const snapshot = await getDocs(notificationsQuery);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Notification));
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}

/**
 * Gets unread notification count for a user
 */
export async function getUnreadNotificationCount(userId: string): Promise<number> {
  try {
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );

    const snapshot = await getDocs(notificationsQuery);
    return snapshot.size;
  } catch (error) {
    console.error('Error fetching unread notification count:', error);
    return 0;
  }
}

/**
 * Gets notifications for a specific assessment template and user
 */
export async function getNotificationsForAssessment(
  userId: string,
  assessmentTemplateId: string
): Promise<Notification[]> {
  try {
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('assessmentTemplateId', '==', assessmentTemplateId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(notificationsQuery);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Notification));
  } catch (error) {
    console.error('Error fetching assessment notifications:', error);
    return [];
  }
}

/**
 * Marks a notification as read
 */
export async function markNotificationAsRead(notificationId: string): Promise<boolean> {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      read: true,
    });
    return true;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
}

/**
 * Marks a notification as dismissed
 */
export async function dismissNotification(notificationId: string): Promise<boolean> {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      dismissed: true,
      read: true,
    });
    return true;
  } catch (error) {
    console.error('Error dismissing notification:', error);
    return false;
  }
}

/**
 * Marks all notifications for a user as read
 */
export async function markAllNotificationsAsRead(userId: string): Promise<boolean> {
  try {
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );

    const snapshot = await getDocs(notificationsQuery);
    
    const updatePromises = snapshot.docs.map((docSnap) =>
      updateDoc(doc(db, 'notifications', docSnap.id), { read: true })
    );

    await Promise.all(updatePromises);
    return true;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return false;
  }
}
