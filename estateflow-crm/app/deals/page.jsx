// app/deals/page.jsx
'use client';

import { useLeads } from '@/lib/useLeads';
import Link from 'next/link';

const stages = ['new', 'contacted', 'qualified', 'converted', 'lost'];

export default function DealsPipeline() {
  const { leads } = useLeads();

  const leadsByStage = stages.reduce((acc, stage) => {
    acc[stage] = leads.filter(lead => lead.stage === stage);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sales Pipeline</h1>
        <Link href="/leads" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          ← Back to Leads
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div key={stage} className="flex-shrink-0 w-80">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 capitalize">
              {stage} ({leadsByStage[stage].length})
            </h3>
            <div className="space-y-3">
              {leadsByStage[stage].map((lead) => (
                <Link key={lead.id} href={`/leads/${lead.id}`}>
                  <div className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition cursor-pointer">
                    <h4 className="font-medium text-gray-800">{lead.name}</h4>
                    <p className="text-sm text-gray-600">{lead.type}</p>
                    <p className="text-xs text-gray-500 mt-1">{lead.location}</p>
                    <p className="text-xs text-indigo-600 mt-1">${lead.budget}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}