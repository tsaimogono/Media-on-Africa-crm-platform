// app/deals/page.jsx
'use client';

import { useLeads } from '@/lib/useLeads';
import Link from 'next/link';
import { useState } from 'react';

const stages = ['new', 'contacted', 'qualified', 'converted', 'lost'];
const propertyTypes = ['condo', 'single-family', 'townhouse', 'land', 'multi-family'];
const agents = ['Alex Morgan', 'Jordan Lee', 'Taylor Reed'];

export default function DealsPipeline() {
  const { leads: allLeads, updateLead } = useLeads();

  // Filters
  const [filters, setFilters] = useState({
    agent: '',
    propertyType: '',
    stage: '',
  });

  // Filtered leads
  const filteredLeads = allLeads.filter((lead) => {
    return (
      (filters.agent === '' || lead.assignedTo === filters.agent) &&
      (filters.propertyType === '' || lead.propertyType === filters.propertyType) &&
      (filters.stage === '' || lead.stage === filters.stage)
    );
  });

  // Group by stage
  const leadsByStage = stages.reduce((acc, stage) => {
    acc[stage] = filteredLeads.filter((lead) => lead.stage === stage);
    return acc;
  }, {});

  // Handle drag start
  const handleDragStart = (e, lead) => {
    e.dataTransfer.setData('lead', JSON.stringify(lead));
  };

  // Handle drop
  const handleDrop = (e, newStage) => {
    e.preventDefault();
    const draggedLead = JSON.parse(e.dataTransfer.getData('lead'));

    // Prevent drop if already in this stage
    if (draggedLead.stage === newStage) return;

    // Update lead stage
    const updatedLead = { ...draggedLead, stage: newStage };
    updateLead(updatedLead);
  };

  // Handle drag over (required for drop)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Sales Pipeline</h1>
        <Link href="/leads" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium self-start sm:self-auto">
          ← Back to Leads
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
          <select
            value={filters.stage}
            onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Stages</option>
            {stages.map((stage) => (
              <option key={stage} value={stage} className="capitalize">
                {stage}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Agent</label>
          <select
            value={filters.agent}
            onChange={(e) => setFilters({ ...filters, agent: e.target.value })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Agents</option>
            {agents.map((agent) => (
              <option key={agent} value={agent}>{agent}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <select
            value={filters.propertyType}
            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type} className="capitalize">{type}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => setFilters({ agent: '', propertyType: '', stage: '' })}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-4 min-h-[600px]">
        {stages.map((stage) => (
          <div
            key={stage}
            className="flex-shrink-0 w-80"
            onDrop={(e) => handleDrop(e, stage)}
            onDragOver={handleDragOver}
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-3 capitalize flex items-center">
              {stage}
              <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {leadsByStage[stage].length}
              </span>
            </h3>

            <div className="space-y-3 min-h-[500px] bg-gray-50 rounded-lg p-2">
              {leadsByStage[stage].length > 0 ? (
                leadsByStage[stage].map((lead) => (
                  <Link key={lead.id} href={`/leads/${lead.id}`}>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead)}
                      className="bg-white p-4 rounded-lg shadow border hover:shadow-md cursor-move transition relative group"
                    >
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100"></div>
                      <h4 className="font-medium text-gray-800 truncate">{lead.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{lead.type}</p>
                      <p className="text-xs text-gray-500 mt-1 truncate">{lead.location}</p>
                      <p className="text-xs text-indigo-600 mt-1">R{lead.budget}</p>
                      <p className="text-xs text-gray-400 mt-1">Assigned: {lead.assignedTo}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center text-gray-400 text-sm mt-6">
                  Drop leads here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}