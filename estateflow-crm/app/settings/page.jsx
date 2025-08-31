// app/settings/page.jsx
'use client';

import { currentUser } from '@/lib/auth';

export default function SettingsPage() {
  // Mock team members
  const team = [
    { id: '1', name: 'Alex Morgan', email: 'alex@estateflow.co', role: 'Agent', status: 'Active' },
    { id: '2', name: 'Thato Moyo', email: 'thato@estateflow.co', role: 'Buyer', status: 'Inactive' },
    { id: '3', name: 'Jabu Ndlovu', email: 'jabu@estateflow.co', role: 'Seller', status: 'Active' },
  ];

  // Access control
  if (currentUser.role !== 'admin') {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-2">You don't have permission to view settings.</p>
        <a href="/dashboard" className="text-indigo-600 hover:underline mt-2 inline-block">
          ← Back to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">Manage your team, preferences, and integrations.</p>
      </div>

      {/* Team Management */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Team Members</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {team.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {member.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {member.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
                  {member.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      member.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label className="ml-3 text-sm text-gray-700">
              Email alerts for new leads
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label className="ml-3 text-sm text-gray-700">
              SMS reminders for tasks
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label className="ml-3 text-sm text-gray-700">
              Weekly performance reports
            </label>
          </div>
        </div>
      </div>

      {/* Integrations (Mock) */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Integrations</h2>
        <p className="text-sm text-gray-600">
          Connect with Zillow, Gmail, Calendar, and more. (Coming soon)
        </p>
      </div>

      {/* Back Link */}
      <div className="mt-8">
        <a
          href="/dashboard"
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}