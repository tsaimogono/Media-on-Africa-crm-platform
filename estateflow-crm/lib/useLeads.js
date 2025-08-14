// lib/useLeads.js
import { useState } from 'react';
import { leads as initialLeads } from './data';

export function useLeads() {
  const [leads, setLeads] = useState(initialLeads);

  const addLead = (newLead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLead = (updatedLead) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );
  };

  return { leads, addLead, updateLead };
}