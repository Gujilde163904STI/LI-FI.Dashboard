import { Device } from '@/services/devices';

interface DeviceTableProps {
  devices: Device[];
  onEdit: (device: Device) => void;
  onDelete: (id: string) => void;
}

export default function DeviceTable({ devices, onEdit, onDelete }: DeviceTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Last Active</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td className="py-2 px-4 border-b">{device.name}</td>
              <td className="py-2 px-4 border-b">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${device.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : device.status === 'connected'
                      ? 'bg-blue-100 text-blue-800'
                      : device.status === 'maintenance'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {device.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b">{device.type}</td>
              <td className="py-2 px-4 border-b">
                {device.updatedAt
                  ? (device.updatedAt instanceof Date
                    ? device.updatedAt.toLocaleString()
                    : device.updatedAt.toDate().toLocaleString())
                  : 'Never'}
              </td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  onClick={() => onEdit(device)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(device.id || '')}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}