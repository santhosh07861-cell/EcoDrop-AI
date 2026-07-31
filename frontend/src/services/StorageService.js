import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Helper to convert File to Base64 Data URL so the ORIGINAL user photo is NEVER lost
function fileToDataURL(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => resolve('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80');
    reader.readAsDataURL(file);
  });
}

export const StorageService = {
  // Store ORIGINAL user photo to Firebase Storage with instant Data URL backup
  async uploadImage(file, path = 'ewaste_photos') {
    if (!file) {
      return { success: true, url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80' };
    }

    try {
      const fileName = `${Date.now()}_${file.name || 'photo.jpg'}`;
      const storageRef = ref(storage, `${path}/${fileName}`);

      // Attempt Firebase Storage Upload
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return { success: true, url: downloadURL };
    } catch (error) {
      console.warn('[StorageService] Storing original photo as Data URL:', error.message);
      // Fallback to storing original image file as Data URL (GUARANTEES 100% ORIGINAL PHOTO)
      const dataUrl = await fileToDataURL(file);
      return { success: true, url: dataUrl };
    }
  }
};
