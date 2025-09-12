// app/agent/dashboard/page.jsx
'use client';

import { currentUser } from '@/lib/auth';
import { useLeads } from '@/lib/useLeads';
import Link from 'next/link';

export default function AgentDashboard() {
  // 🔒 Only admin and agent can view
  if (!['admin', 'agent'].includes(currentUser.role)) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-2">You don't have permission to view this dashboard.</p>
        <a href="/dashboard" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2 inline-block">
          ← Back to Dashboard
        </a>
      </div>
    );
  }

  const { leads } = useLeads();

  const myLeads = leads.filter(l => l.assignedTo === currentUser.name);
  const newLeads = myLeads.filter(l => l.stage === 'new').length;
  const contacted = myLeads.filter(l => l.stage === 'contacted').length;
  const tasks = myLeads.flatMap(l => l.tasks).filter(t => !t.completed).length;

  if (!['admin', 'agent'].includes(currentUser.role)) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <Link href="/dashboard" className="text-indigo-600 hover:underline mt-2 inline-block">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Agent Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">My Leads</h2>
          <p className="mt-1 text-3xl font-semibold">{myLeads.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">New Leads</h2>
          <p className="mt-1 text-3xl font-semibold">{newLeads}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">Tasks Due</h2>
          <p className="mt-1 text-3xl font-semibold">{tasks}</p>
        </div>
      </div>

      {/* Pipeline */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">My Pipeline</h2>
        <div className="flex gap-6 overflow-x-auto pb-2">
          {['new', 'contacted', 'qualified', 'converted'].map((stage) => (
            <div key={stage} className="flex-shrink-0 w-64">
              <h3 className="text-sm font-semibold text-gray-700 capitalize mb-3">
                {stage} ({myLeads.filter(l => l.stage === stage).length})
              </h3>
              <div className="space-y-2">
                {myLeads
                  .filter(l => l.stage === stage)
                  .map((lead) => (
                    <Link key={lead.id} href={`/leads/${lead.id}`}>
                      <div className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 cursor-pointer">
                        <p className="text-sm font-medium">{lead.name}</p>
                        <p className="text-xs text-gray-600">{lead.location}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Notes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Notes</h2>
        <ul className="space-y-3">
          {myLeads
            .flatMap(l => l.notes.map(n => ({ ...n, leadName: l.name, leadId: l.id })))
            .slice(-3)
            .reverse()
            .map((note) => (
              <li key={note.id} className="text-sm text-gray-800">
                <strong>{note.leadName}:</strong> {note.text}{' '}
                <span className="text-gray-500">({new Date(note.date).toLocaleDateString()})</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}