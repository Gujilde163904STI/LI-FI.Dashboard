'use client';
import React, { useState } from 'react';
import { addDevice, Device } from '@/services/devices';

export default function AddDeviceModal({ onAdd }: { onAdd: () => void }) {
    const [form, setForm] = useState<Omit<Device, 'id' | 'createdAt' | 'updatedAt'>>({
        name: '',
        type: '',
        status: 'connected'
    });
    const [show, setShow] = useState(false);

    const handleSubmit = async () => {
        await addDevice(form);
        setShow(false);
        setForm({ name: '', type: '', status: 'connected' });
        onAdd();
    };

    return (
        <>
            <button
                onClick={() => setShow(true)}
                className="mb-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                + Add Device
            </button>

            {show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">Add New Device</h2>

                        <input
                            className="w-full mb-3 border px-3 py-2 rounded"
                            placeholder="Device Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <input
                            className="w-full mb-3 border px-3 py-2 rounded"
                            placeholder="Device Type"
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                        />
                        <select
                            title="Device Status"
                            className="w-full mb-3 border px-3 py-2 rounded"
                            value={form.status}
                            onChange={(e) => {
                                const value = e.target.value as 'active' | 'connected' | 'maintenance';
                                setForm({ ...form, status: value });
                            }}
                        >
                            <option value="connected">Connected</option>
                            <option value="active">Active</option>
                            <option value="maintenance">Maintenance</option>
                        </select>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShow(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}