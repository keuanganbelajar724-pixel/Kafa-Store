import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  onSnapshot,
  writeBatch,
  query,
  orderBy,
  deleteDoc,
  addDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { LinkItem, StoreSettings, Testimonial, FreeWebTool, FaqItem } from '../types';
import {
  INITIAL_ITEMS,
  INITIAL_SETTINGS,
  INITIAL_TESTIMONIALS,
  INITIAL_FREE_TOOLS,
  INITIAL_FAQS
} from '../data/initialData';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get Firestore with named database ID if specified in config
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Seed initial data to Firestore if collection is empty
export async function seedInitialFirestoreData() {
  try {
    const productsSnap = await getDocs(collection(db, 'products'));
    if (productsSnap.empty) {
      console.log('Seeding initial products to Firestore...');
      const batch = writeBatch(db);
      INITIAL_ITEMS.forEach((item) => {
        const ref = doc(db, 'products', item.id);
        batch.set(ref, item);
      });
      await batch.commit();
    }

    const settingsSnap = await getDocs(collection(db, 'settings'));
    if (settingsSnap.empty) {
      console.log('Seeding initial store settings to Firestore...');
      await setDoc(doc(db, 'settings', 'global'), INITIAL_SETTINGS);
    }

    const testimonialsSnap = await getDocs(collection(db, 'testimonials'));
    if (testimonialsSnap.empty) {
      console.log('Seeding initial testimonials to Firestore...');
      const batch = writeBatch(db);
      INITIAL_TESTIMONIALS.forEach((testi) => {
        const ref = doc(db, 'testimonials', testi.id);
        batch.set(ref, testi);
      });
      await batch.commit();
    }

    const freeToolsSnap = await getDocs(collection(db, 'freeTools'));
    if (freeToolsSnap.empty) {
      console.log('Seeding initial free tools to Firestore...');
      const batch = writeBatch(db);
      INITIAL_FREE_TOOLS.forEach((tool) => {
        const ref = doc(db, 'freeTools', tool.id);
        batch.set(ref, tool);
      });
      await batch.commit();
    }

    const faqsSnap = await getDocs(collection(db, 'faqs'));
    if (faqsSnap.empty) {
      console.log('Seeding initial faqs to Firestore...');
      const batch = writeBatch(db);
      INITIAL_FAQS.forEach((faq) => {
        const ref = doc(db, 'faqs', faq.id);
        batch.set(ref, faq);
      });
      await batch.commit();
    }
  } catch (err) {
    console.warn('Firestore seeding warning (will use local state as fallback):', err);
  }
}

// Real-time listener for Products
export function subscribeProducts(callback: (items: LinkItem[]) => void) {
  const q = query(collection(db, 'products'));
  return onSnapshot(
    q,
    (snapshot) => {
      const items: LinkItem[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<LinkItem, 'id'>)
      }));
      // Sort by order or isPinned
      items.sort((a, b) => (a.order || 99) - (b.order || 99));
      callback(items);
    },
    (error) => {
      console.warn('Firestore products subscription error:', error);
    }
  );
}

// Real-time listener for Testimonials
export function subscribeTestimonials(callback: (testimonials: Testimonial[]) => void) {
  const q = query(collection(db, 'testimonials'));
  return onSnapshot(
    q,
    (snapshot) => {
      const items: Testimonial[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Testimonial, 'id'>)
      }));
      callback(items);
    },
    (error) => {
      console.warn('Firestore testimonials subscription error:', error);
    }
  );
}

// Real-time listener for FAQs
export function subscribeFaqs(callback: (faqs: FaqItem[]) => void) {
  const q = query(collection(db, 'faqs'));
  return onSnapshot(
    q,
    (snapshot) => {
      const items: FaqItem[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<FaqItem, 'id'>)
      }));
      callback(items);
    },
    (error) => {
      console.warn('Firestore faqs subscription error:', error);
    }
  );
}

// Save Testimonials to Firestore
export async function saveTestimonialsToFirestore(testimonials: Testimonial[]) {
  try {
    const existingSnap = await getDocs(collection(db, 'testimonials'));
    const batch = writeBatch(db);
    existingSnap.docs.forEach((docSnap) => batch.delete(docSnap.ref));
    testimonials.forEach((testi) => {
      const ref = doc(db, 'testimonials', testi.id);
      batch.set(ref, testi);
    });
    await batch.commit();
  } catch (err) {
    console.error('Failed to save testimonials to Firestore:', err);
  }
}

// Save FAQs to Firestore
export async function saveFaqsToFirestore(faqs: FaqItem[]) {
  try {
    const existingSnap = await getDocs(collection(db, 'faqs'));
    const batch = writeBatch(db);
    existingSnap.docs.forEach((docSnap) => batch.delete(docSnap.ref));
    faqs.forEach((faq) => {
      const ref = doc(db, 'faqs', faq.id);
      batch.set(ref, faq);
    });
    await batch.commit();
  } catch (err) {
    console.error('Failed to save faqs to Firestore:', err);
  }
}

// Real-time listener for Settings
export function subscribeSettings(callback: (settings: StoreSettings) => void) {
  return onSnapshot(
    doc(db, 'settings', 'global'),
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as StoreSettings);
      }
    },
    (error) => {
      console.warn('Firestore settings subscription error:', error);
    }
  );
}

// Save or Update Product
export async function saveProductToFirestore(item: LinkItem) {
  try {
    await setDoc(doc(db, 'products', item.id), item, { merge: true });
  } catch (err) {
    console.error('Failed to save product to Firestore:', err);
  }
}

// Delete Product
export async function deleteProductFromFirestore(id: string) {
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (err) {
    console.error('Failed to delete product from Firestore:', err);
  }
}

// Save Settings
export async function saveSettingsToFirestore(settings: StoreSettings) {
  try {
    await setDoc(doc(db, 'settings', 'global'), settings, { merge: true });
  } catch (err) {
    console.error('Failed to save settings to Firestore:', err);
  }
}

// Log Customer Order to Firestore
export async function logOrderToFirestore(orderData: any) {
  try {
    await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('Failed to log order to Firestore:', err);
  }
}
