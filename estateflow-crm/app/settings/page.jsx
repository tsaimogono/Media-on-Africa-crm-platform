// app/settings/page.jsx
'use client';

import { currentUser } from '@/lib/auth';
import { agents } from '@/lib/agents';

export default function SettingsPage() {
  // Access control
  if (currentUser.role !== 'admin') {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-2">You don't have permission to view settings.</p>
        <a href="/dashboard" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium inline-block mt-2">
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
        <p className="text-gray-600">Manage team, notifications, and integrations.</p>
      </div>

      {/* Team Management */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Team Members</h2>
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
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{agent.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">{agent.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{agent.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      agent.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {agent.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <input
              type="checkbox"
              defaultChecked
              className="mt-1 h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label className="ml-3 text-sm text-gray-700">
              <strong>Email alerts</strong> for new leads and tasks
            </label>
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              defaultChecked
              className="mt-1 h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label className="ml-3 text-sm text-gray-700">
              <strong>SMS reminders</strong> for upcoming showings and deadlines
            </label>
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label className="ml-3 text-sm text-gray-700">
              <strong>Weekly reports</strong> sent to your inbox
            </label>
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Integrations</h2>
        <p className="text-sm text-gray-600 mb-4">
          Connect your favorite tools. Coming soon.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Zillow', 'Gmail', 'Google Calendar', 'Slack'].map((app) => (
            <div
              key={app}
              className="border border-gray-200 rounded-lg p-4 text-center hover:shadow transition cursor-not-allowed opacity-70"
            >
              <div className="text-xl font-bold text-gray-500">{app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Back Link */}
      <div>
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