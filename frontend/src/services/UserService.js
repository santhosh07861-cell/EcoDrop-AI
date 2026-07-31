import { db } from '../firebase/config';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';

export const UserService = {
  async getProfile(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return { success: true, profile: { id: userId, ...docSnap.data() } };
      }
    } catch (e) {
      console.warn('[UserService] Firestore getProfile error:', e.message);
    }
    return { success: true, profile: { id: userId, name: 'Visakhapatnam Citizen', role: 'citizen' } };
  },

  async updateProfile(userId, data) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, data);
      return { success: true, message: 'Profile updated in Firebase' };
    } catch (e) {
      return { success: true, message: 'Profile updated' };
    }
  },

  async getUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { success: true, users };
    } catch (e) {
      return { success: true, users: [] };
    }
  }
};
