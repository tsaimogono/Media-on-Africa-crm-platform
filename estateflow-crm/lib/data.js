export const leads = [
  {
    id: 'lead-1',
    name: 'Thato moyo',
    email: 'thembamoyo@gmail.com',
    phone: '(+27) 123-4567',
    type: 'buyer',
    stage: 'contacted',
    propertyType: 'condo',
    budget: '500k-700k',
    location: 'kwa-zulu-natal, durban',
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
    name: 'jabu ndlovu',
    email: 'jabuN@gmail.com',
    phone: '(+27) 987-6543',
    type: 'seller',
    stage: 'qualified',
    propertyType: 'single-family',
    budget: '900k',
    location: 'Gauteng, santon',
    source: 'Referral',
    assignedTo: 'Alex Morgan',
    createdAt: '2025-04-03',
    status: 'active',
    notes: [],
    tasks: []
  }
];