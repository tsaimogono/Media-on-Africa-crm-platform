// app/admin/dashboard/page.jsx
'use client';

import { currentUser } from '@/lib/auth';
import { useLeads } from '@/lib/useLeads';
import { agents } from '@/lib/agents';
import Link from 'next/link';

export default function AdminDashboard() {
  const { leads } = useLeads();

  const totalLeads = leads.length;
  const contacted = leads.filter(l => l.stage === 'contacted').length;
  const qualified = leads.filter(l => l.stage === 'qualified').length;
  const closed = leads.filter(l => l.stage === 'converted').length;

  const pipelineValue = leads
    .filter(l => l.stage !== 'lost')
    .reduce((sum) => sum + Math.floor(Math.random() * 500000) + 300000, 0)
    .toLocaleString();

  if (currentUser.role !== 'admin') {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
        <Link href="/dashboard" className="text-indigo-600 hover:underline mt-2 inline-block">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">Total Leads</h2>
          <p className="mt-1 text-3xl font-semibold">{totalLeads}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">Contacted</h2>
          <p className="mt-1 text-3xl font-semibold">{contacted}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">Qualified</h2>
          <p className="mt-1 text-3xl font-semibold">{qualified}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">Closed Deals</h2>
          <p className="mt-1 text-3xl font-semibold">{closed}</p>
        </div>
      </div>

      {/* Pipeline Value */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold text-gray-800">Pipeline Value</h2>
        <p className="text-2xl mt-2">$ {pipelineValue}</p>
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Recent Leads</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.slice(0, 6).map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{lead.name}</td>
                <td className="px-6 py-4 text-sm capitalize">{lead.stage}</td>
                <td className="px-6 py-4 text-sm">{lead.assignedTo}</td>
                <td className="px-6 py-4 text-sm">{lead.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}