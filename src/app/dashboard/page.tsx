'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/providers/firebase-auth-provider';
import {
  addDevice,
  deleteDevice,
  listenToDevices,
  Device
} from '@/services/devices';
import SignOutButton from '@/components/SignOutButton';
import DeviceTable from '@/components/DeviceTable';
import AddDeviceModal from '@/components/AddDeviceModal';
import { withAuth } from '@/components/withAuth';

function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);
    const unsubscribe = listenToDevices((data: Device[]) => {
      setDevices(data);
      setError(null);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddDevice = async () => {
    try {
      await addDevice({
        name: `Device ${devices.length + 1}`,
        type: 'sensor',
        status: 'active'
      });
      const unsubscribe = listenToDevices((data: Device[]) => {
        setDevices(data);
      });
      return () => unsubscribe();
    } catch (err) {
      setError('Failed to add device');
    }
  };

  const handleEdit = async (id: string, updatedDevice: Partial<Device>) => {
    try {
      // TODO: Implement edit functionality
      console.log('Editing device:', id, updatedDevice);
    } catch (err) {
      setError('Failed to edit device');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDevice(id);
      const unsubscribe = listenToDevices((data: Device[]) => {
        setDevices(data);
      });
      return () => unsubscribe();
    } catch (err) {
      setError('Failed to delete device');
    }
  };

  if (authLoading) {
    return <div className="p-4">Loading authentication...</div>;
  }

  if (!user) {
    return <div className="p-4">Redirecting...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <SignOutButton />
      </div>
      <h1 className="text-2xl font-bold mb-4">Device Dashboard</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={handleAddDevice}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Device
        </button>
      </div>

      {isLoading ? (
        <div className="p-4">Loading devices...</div>
      ) : devices.length === 0 ? (
        <div className="p-4 bg-gray-100 rounded">No devices found</div>
      ) : (
        <>
          <AddDeviceModal onAdd={() => console.log('Device added')} />
          <DeviceTable
            devices={devices}
            onEdit={(device: Device) => device.id && handleEdit(device.id, device)}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}

export default withAuth(Dashboard);