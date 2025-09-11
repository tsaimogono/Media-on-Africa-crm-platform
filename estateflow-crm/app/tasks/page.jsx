// app/tasks/page.jsx
'use client';

import { useLeads } from '@/lib/useLeads';
import Link from 'next/link';

export default function TasksPage() {
// 🔒 Access Control: Only admin and agent can view tasks
  if (!['admin', 'agent'].includes(currentUser.role)) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-2">You don't have permission to view tasks.</p>
        <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2 inline-block">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  const { leads } = useLeads();

  const allTasks = leads
    .flatMap(lead =>
      lead.tasks.map(task => ({
        ...task,
        leadName: lead.name,
        leadId: lead.id,
      }))
    )
    .sort(a => (a.completed ? 1 : -1));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Tasks</h1>
        <Link href="/leads" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          ← Back to Leads
        </Link>
      </div>

      {allTasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allTasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <Link href={`/leads/${task.leadId}`} className="hover:underline">
                      {task.leadName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.due}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task.completed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {task.completed ? 'Done' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}