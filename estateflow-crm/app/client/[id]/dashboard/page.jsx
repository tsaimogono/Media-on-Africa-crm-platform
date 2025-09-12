// app/client/[id]/dashboard/page.jsx
'use client';

import { currentUser } from '@/lib/auth';
import { useLeads } from '@/lib/useLeads';
import { useParams } from 'next/navigation';

export default function ClientDashboard() {

  const { id } = useParams(); // e.g., 'client-1'
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

  // Simulate: find leads associated with this client
  // In real app: link via client ID
  const clientLeads = leads.filter(lead => lead.assignedTo === 'Alex Morgan'); // Mock filter

  if (currentUser.role !== 'client') {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-2">Clients only.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Client Portal</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold">Welcome, {currentUser.name}</h2>
        <p className="text-gray-600 mt-2">
          This is your personal portal. View your leads, showings, and messages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-md font-semibold text-gray-800">Your Leads</h3>
          <p className="text-gray-600 mt-2">{clientLeads.length} active lead(s).</p>
          <button className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            View Details
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-md font-semibold text-gray-800">Upcoming Showings</h3>
          <p className="text-gray-600 mt-2">You have 1 showing scheduled this week.</p>
          <button className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            View Calendar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h3 className="text-md font-semibold text-gray-800">Recent Messages</h3>
        <div className="mt-4 space-y-3">
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm"><strong>Agent:</strong> Hi Sarah, I found a new condo that matches your criteria.</p>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}