import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  DocumentData,
  onSnapshot,
  query
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Device = {
  id?: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance' | 'connected';
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

const devicesCollection = collection(db, 'devices');

export async function getDevices(): Promise<Device[]> {
  const querySnapshot = await getDocs(devicesCollection);
  return querySnapshot.docs.map((docSnap) => {
    const data = docSnap.data() as DocumentData;
    return {
      id: docSnap.id,
      ...data
    } as Device;
  });
}

export function listenToDevices(callback: (devices: Device[]) => void) {
  const q = query(devicesCollection);
  return onSnapshot(q, (querySnapshot) => {
    const deviceList: Device[] = querySnapshot.docs.map(docSnap => {
      const data = docSnap.data() as DocumentData;
      return {
        id: docSnap.id,
        ...data
      } as Device;
    });
    callback(deviceList);
  });
}

export async function addDevice(device: Omit<Device, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(devicesCollection, {
    ...device,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
}

export async function updateDevice(id: string, device: Partial<Device>): Promise<void> {
  const deviceRef = doc(db, 'devices', id);
  await updateDoc(deviceRef, {
    ...device,
    updatedAt: serverTimestamp()
  });
}

export async function deleteDevice(id: string): Promise<void> {
  const deviceRef = doc(db, 'devices', id);
  await deleteDoc(deviceRef);
}