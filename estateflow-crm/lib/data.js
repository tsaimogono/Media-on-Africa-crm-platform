export const leads = [
  {
    id: 'lead-1',
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
    phone: '(555) 123-4567',
    type: 'buyer',
    stage: 'contacted',
    propertyType: 'condo',
    budget: '500k-700k',
    location: 'Miami, FL',
    source: 'Zillow',
    assignedTo: 'Alex Morgan',
    createdAt: '2025-04-05',
    status: 'active',
    notes: [
      { id: 'n1', text: 'Interested in ocean views', author: 'Alex', date: '2025-04-05' }
    ],
    tasks: [
      { id: 't1', title: 'Follow up call', due: '2025-04-10', completed: false }
    ]
  },
  {
    id: 'lead-2',
    name: 'Mike Chen',
    email: 'mike@chen.io',
    phone: '(555) 987-6543',
    type: 'seller',
    stage: 'qualified',
    propertyType: 'single-family',
    budget: '900k',
    location: 'Austin, TX',
    source: 'Referral',
    assignedTo: 'Alex Morgan',
    createdAt: '2025-04-03',
    status: 'active',
    notes: [],
    tasks: []
  }
];